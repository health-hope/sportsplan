import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import { getUrlParam } from '@/assets/js/util.js'

Vue.use(Router)
const router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    },
    routes
})
router.beforeEach((to, from, next) => {
    if (navigator.onLine) {
        let code = getUrlParam('code')
        let name = to.name
        document.title = to.meta.title;

        // console.log(code, name, 99999)
        // if (code == '1') {
        //     switch (name) {
        //         case "home":
        //             // document.title = "糖尿病健身运动计划"
        //             break;
        //         default:

        //             break
        //     }
        // } else if (code == '2') {
        //     switch (name) {
        //         case "home":
        //             document.title = "高血压健身运动计划"
        //             break;
        //         default:
        //             document.title = to.meta.title
        //             break
        //     }
        // } else if (code == '3') {
        //     switch (name) {
        //         case "home":
        //         case "step1":
        //         case "step2":
        //         case "step3":
        //             document.title = "中医肺系证候运动计划"
        //             break;
        //         default:
        //             document.title = to.meta.title
        //             break
        //     }
        // } else if (code == '4') {
        //     switch (name) {
        //         case "home":
        //         case "step1":
        //         case "step2":
        //         case "step3":
        //             document.title = "中医脾系证候运动计划"
        //             break;
        //         default:
        //             document.title = to.meta.title
        //             break
        //     }
        // } else if (code == '5') {
        //     switch (name) {
        //         case "home":
        //         case "step1":
        //         case "step2":
        //         case "step3":
        //             document.title = "中医胃系证候运动计划"
        //             break;
        //         default:
        //             document.title = to.meta.title
        //             break
        //     }
        // } else if (code == '6') {
        //     switch (name) {
        //         case "home":
        //         case "step1":
        //         case "step2":
        //         case "step3":
        //             document.title = "中医肾系证候运动计划"
        //             break;
        //         default:
        //             document.title = to.meta.title
        //             break
        //     }
        // } else if (code == '7') {
        //     switch (name) {
        //         case "home":
        //         case "step1":
        //         case "step2":
        //         case "step3":
        //             document.title = "中医小肠系证候运动计划"
        //             break;
        //         default:
        //             document.title = to.meta.title
        //             break
        //     }
        // } else if (code == '8') {
        //     switch (name) {
        //         case "home":
        //         case "step1":
        //         case "step2":
        //         case "step3":
        //             document.title = "中医大肠系证候运动计划"
        //             break;
        //         default:
        //             document.title = to.meta.title
        //             break
        //     }
        // } else if (code == '9') {
        //     switch (name) {
        //         case "home":
        //         case "step1":
        //         case "step2":
        //         case "step3":
        //             document.title = "中医胆系证候运动计划"
        //             break;
        //         default:
        //             document.title = to.meta.title
        //             break
        //     }
        // }
        // document.title = to.meta.title
        next()
    } else {
        Vue.prototype.$toast('网络好像有点问题，请检查后重试！')
        next(false)
    }
})
export default router