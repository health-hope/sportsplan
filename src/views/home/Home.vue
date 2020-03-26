<template>
    <div v-if="show" class="home">
      <img src="../../assets/images/bg_home_pic.png" alt="" class="banner">
      <div class="title-pos">
          <div>{{name.replace(/运动计划/,'')}}</div>
          <div>运动计划</div>
      </div>
        <div class="cotent-wrap" v-if="homeData.contentIntroduce">
            <div class="cotent-title info">内容介绍</div>
            <div class="cotent-font">{{homeData.contentIntroduce}}</div>
       </div>
        <div class="cotent-wrap"  v-if="homeData.references">
            <div class="cotent-title risk">参考文献</div>
            <ul class="cotent-font-ul">
                <li v-for="(item,index) in homeData.references" :key="index">{{item}}</li>
            </ul>
        </div>
        <div class="logo-wrap">
            <img class="logo-icon" src="../../assets/images/sy_logo_jkyy.png"  >
            <p>北京健康有益科技有限公司提供技术服务</p>
        </div>
        <div class="btn-wrap-both">
        </div>
        <div class="btn-wrap">
            <div class="btn" @click="start">{{nextText}}</div>
        </div>
    </div>
</template>
<script>
    import { mapState, mapMutations} from 'vuex'
    import { getUrlParam ,setStorage } from '@/assets/js/util.js'
    import { apiHomeData } from '@/service/api'
    import LayBg from '@/components/common/LayBg';
    export default {
        data() {
            return {
                homeData: {},
                show: false,
                name:"",
                apiHomeData:{},
                nextText:"定制计划",
            }
        },
        components: {
            LayBg
        },
        computed: {
            ...mapState(['code', 'userInfo', 'courseKind']),
        },
        async created() {
            this.setCheck('no')
            // 先判断有没有计划在执行
            await this.getBrief()
        },
        methods: {
            ...mapMutations(['setCourse', 'setCheck',"setbuildId","setGender"]),
            async getBrief() {
                const data = await apiHomeData(this.code, this.courseKind, this.userInfo.userId) 
                this.apiHomeData = data;
                this.name = data.courseName;
                document.title = this.name;
                // requiredUserInfoFields
                
                if (data.requiredUserInfoFields.indexOf('gender')==-1) {
                    this.setGender(false)
                }

                window.sessionStorage.setItem('riskEvaluation',JSON.stringify(data.riskEvaluation))
                //{"birthday":"19900101","gender":"2","height":"160","weight":"55.0"}
                if (data.userInfo) {
                    setStorage("session", "userInfo", data.userInfo);
                }
                this.setbuildId(data.buildId)
                this.homeData = data;
                this.$nextTick(() => {
                    this.show = true
                })
                if(data.userCourseStatus == 1) {
                    // 用户有计划
                    this.nextText = "进入运动计划"
                }
            },
            start() {
                if(this.apiHomeData.userCourseStatus == 1) {
                    // 用户有计划
                    this.setCourse(this.apiHomeData.latestCourseInfo.courseId)
                    this.$router.replace('/plan')
                }else{
                    this.$router.push('/sportsassessment')
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/style/mixin.scss";
    .home {
        width: 100%;
        min-height: 100%;
        // padding: 16.7rem 0.75rem 0;
        box-sizing: border-box;
        background-size: 100% auto;
        background-repeat: no-repeat;
        background: #f2f2f2;
        .title-pos{
            width: 100%;  
            font-size: 2rem;
            @include font_color();
            font-weight: 600;
            position: absolute;
            top: 1.7rem;
            padding-left: 2rem;
            box-sizing: border-box;
        }
        .cotent-wrap{
            padding:  0 1.8rem;
            font-size: .7rem;
            color: #666666;
            .cotent-title{
                font-size: 1rem;
                color: #333333;
                margin-bottom: .5rem;
                font-weight: bold;
            }
            .info{
                margin-top:.8rem;
            }
            .risk{
                margin-top:2.05rem;
            }
            .cotent-font-ul{
                  font-size: .6rem;
            }
        }
        .logo-wrap{
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: .55rem;
            color: #999;
            margin-top:1.5rem;
            margin-bottom: 3.45rem;
            .logo-icon{
                margin-bottom:.4rem;
                width: 3.2rem;
                background-size: cover;
            }
        }
        .btn-wrap-both{
            width: 100%;
            height: 1px;
        }
        .btn-wrap{
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2.7rem;
            background: #FFFFFF;
            box-shadow: 0 -4px 10px 0 rgba(0,0,0,0.05);
            display: flex;
            justify-content: center;
            align-items: center;
            .btn{
                width: 17.6rem;
                height: 2.2rem; 
                display: flex;
                justify-content: center;
                align-items: center;
                background: #4566EA;
                font-size: .8rem;
                color: #FFFFFF;
                border-radius: 1.1rem;
            }
        }
        .banner{
            width: 100%;
            height: 16rem;
            // background: red;
            display: inline-block;
        }
        .ctn {
            @include bg_color();
          
            border-radius: 0.2rem;
            // padding: 1.35rem 1.05rem 0.3rem;
            box-sizing: border-box;
            position: relative;
            .ctn-top {
                margin-bottom: 1.15rem;
                .title {
                    position: relative;
                    height: 1.4rem;
                    display: flex;
                    align-items: center;
                    margin-bottom: 0.7rem;
                    .mon {
                        font-size: 0.85rem;
                        @include font_color1();
                        font-weight: bold;
                    }
                }
                .content {
                    position: relative;
                    .item {
                        margin-bottom: 0.5rem;
                    }
                    .img {
                        width: 1.2rem;
                        height: 1.2rem;
                        position: absolute;
                        left: 0;
                        right: 0;
                        img {
                            width: 100%;
                            height: 100%;
                            display: inline-block;
                            border-radius: 50%;
                        }
                    }
                    .text {
                        font-size: 0.75rem;
                        @include font_color1();
                        line-height: 1.2rem;
                        margin-left: 1.65rem;
                    }
                }
            }
        }
        .logo {
            margin-bottom: 0.5rem;
            margin-top: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
                width: 4.3rem;
                height: auto;
            }
        }
        .reference-box {
            margin-top: 1.1rem;
            padding: 0.9rem 1.05rem;
            @include bg_color1();
            border-radius: 0.2rem;
            position: relative;
            .reference-con {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                .title {
                    font-size: 0.7rem;
                    @include font_color();
                    font-weight: bold;
                }
                .reference-list {
                    margin-top: 0.4rem;
                    .item {
                        display: flex;
                        justify-content: center;
                        font-size: 0.6rem;
                        @include font_color();
                        line-height: 0.825rem;
                        text-align: center;
                    }
                }
            }
        }
        .remark {
            opacity: 0.6;
            font-size: 0.55rem;
            line-height: 0.55rem;
            @include font_color();
            text-align: center;
            padding-bottom: 4.55rem /* 182/40 */;
            box-sizing: border-box;
        }
        .button {
            width: 15.5rem;
            height: 2.5rem;
            border-radius: 1.25rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
            @include font_color1();
            position: fixed;
            bottom: 1rem /* 40/40 */;
            left: 50%;
            transform: translateX(-50%);
            background-position: center center;
            @include bg_color();
            background-repeat: no-repeat;
            background-size: 15rem 2rem;
            font-weight: bold;
        }
    }
</style>
