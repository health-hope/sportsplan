import axios from 'axios';
import Vue from 'vue';
import { getRandomNum, isEmpty, getUrlParam } from "@/assets/js/util";
import { TimeTool } from "@/assets/js/timeTool";
import doSign from "@/assets/js/doSign";
import { env } from '@/service/env';
let token = getUrlParam('token')
/**
 * 请求数据封装
 * @param url 请求地址
 * @param type 请求类型
 * @param params 请求参数
 */
//添加请求拦截器
axios.interceptors.request.use(config => {
    if (token) {
        config.headers['token'] = token
    }
    return config;
});
export default async(url = "", params = {}, options = {}) => {
    let defaultOptions = {
        baseUrl: env.BASEURL, //基础url
        loading: true, //是否显示Loading
        method: "post", //请求方法
        needSign: true, //是否需要签名 
        dataPath: "resData", //返回数据所在路径(相对于response.data)
        enterSilence: false, //是否不再输出入参日志
        outputSilence: false, //是否不再输出出参日志
    }
    Object.assign(defaultOptions, options);
    if (defaultOptions.loading) {
        Vue.prototype.$loading.show();
    }
    /**
     *  需要加签 ，提供两种形式，1.通过signUrl加签，通过私钥加签
     */
    if (defaultOptions.needSign) {
        let { signUrl,privateKey } = window.config;
        //如果 signUrl非空，优先使用signUrl
        if (token) {
            const nonceStr = getRandomNum();//随机字符串
            const timeTools = new TimeTool();
            const timestamp = timeTools.parseTime("yyyy-mm-dd-hh-mm-ss");
            let {
                appId,
                version
            } = window.config;
            // 优先采用token模式
            params = {
                reqData: params,
                appId,
                version,
                timestamp,
                nonceStr
            }
        } else if (!isEmpty(signUrl)) {
            await axios.get(signUrl, {}).then(res => {
                if (res.status === 200) {
                    let data = res.data;
                    params = {
                        reqData: params,
                        appId: data.appId,
                        version: data.version,
                        timestamp: data.timestamp,
                        nonceStr: data.nonceStr
                    }
                }
            })
        } else if(!isEmpty(privateKey)) {
            const nonceStr = getRandomNum(); //随机字符串
            const timeTools = new TimeTool();
            const timestamp = timeTools.parseTime("yyyy-mm-dd-hh-mm-ss");
            let {
                appId,
                version,
                privateKey,
            } = window.config;
            if (privateKey) {
                privateKey = `-----BEGIN PRIVATE KEY-----${privateKey}-----END PRIVATE KEY-----`;
            }
            const signStr = `appId=${appId}&nonceStr=${nonceStr}&timestamp=${timestamp}&version=${version}`;
            const sign = doSign(signStr, privateKey);
            params = {
                reqData: params,
                appId,
                version,
                timestamp,
                sign,
                nonceStr,
            }
        } else {
            Vue.prototype.$toast('请检查签名或配置token')
        }
    }
    let code = getUrlParam('code')
    let courseKind = code;
    // switch (code) {
    //     case "1":
    //         courseKind = "37"
    //         break;
    //     case "2":
    //         courseKind = "38"
    //         break;
    //     case "3":
    //         courseKind = "39"
    //         break;
    //     case "4":
    //         courseKind = "40"
    //         break;
    //     case "5":
    //         courseKind = "41"
    //         break;
    //     case "6":
    //         courseKind = "42"
    //         break;
    //     case "7":
    //         courseKind = "43"
    //         break;
    //     case "8":
    //         courseKind = "44"
    //         break;
    //     case "9":
    //         courseKind = "45"
    //         break;
    //     default:
    //         break;
    // }
    let response = await axios({
        url: defaultOptions.baseUrl + url + "?courseKind=" + courseKind,
        method: defaultOptions.method,
        data: JSON.stringify(params),
        headers: {
            'Content-Type': "application/json",
        },
        xhrFields: { withCredentials: true },
        dataType: "json"
    }).catch(err => {
        if (defaultOptions.loading) {
            Vue.prototype.$loading.hide();
        }
        Vue.prototype.$toast('请求失败，请稍后再试！')
        throw Error(err.message);
    });
    if (response.status == 200) {
        let data = defaultOptions.dataPath ? response.data[defaultOptions.dataPath] : response.data;
        try {
            data = JSON.parse(data)
        } catch (err) {
            console.log(err)
        }
        if (defaultOptions.loading) {
            Vue.prototype.$loading.hide();
        }
        if (data.retCode === 'SUCCESS') {
            return data;
        } else {
            let errMsg = data.retInfo
            Vue.prototype.$toast(errMsg)
            Vue.prototype.$loading.hide();
            throw Error(JSON.stringify(data));
        }
    } else {
        Vue.prototype.$toast('请求失败，请稍后再试！')
        if (defaultOptions.loading) {
            Vue.prototype.$loading.hide();
        }
        throw Error(response.status);
    }
}