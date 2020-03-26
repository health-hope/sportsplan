<template>
    <div id="app" v-cloak>
        <keep-alive>
            <router-view v-if="$route.meta.cache"></router-view>
        </keep-alive>
        <transition name="fade" mode="out-in">
            <router-view v-if="!$route.meta.cache"></router-view>
        </transition>
    </div>
</template>
<script>
    import '@/assets/style/mint-ui.css'
    import { getUrlParam } from '@/assets/js/util.js'
    import { mapState, mapMutations } from 'vuex'
    import { env } from '@/service/env'
    export default {
        data() {
            return {
                onLine: navigator.onLine,
            }
        },
        computed: {
            ...mapState(['code'])
        },
        created() {
            let code = getUrlParam('code')
            let userId = getUrlParam('user-id')
            if (code) {
                this.setCode(code);
                // this.setCourse('5d7f3e1dc3b6a1395e9fa050');
            } else {
                this.$toast('类型编码不能为空！')
            }
            if (userId) {
                this.setUserId(userId)
            } else {
                this.$toast('用户ID不能为空！')
            }
        },
        mounted() {
            //主题色配置
            //blue==1
            window.document.documentElement.setAttribute('data-theme', env.theme)
            window.addEventListener('offline', this.updateOnlineStatus);
        },
        methods: {
            ...mapMutations(['setCode', 'setUserId','setCourse','setCheck']),
            updateOnlineStatus(e) {
                const { type } = e;
                this.onLine = type === 'online';
                if (this.onLine !== 'online') {
                    this.$toast('网络好像有点问题，请检查后重试！')
                }
            }
        },
        beforeDestroy() {
            window.removeEventListener('offline', this.updateOnlineStatus);
        }
    }
</script>
<style lang="less">
    //  1px 解决方案
    @import "~vux/src/styles/1px.less";
    html,
    body,
    #app {
        width: 100%;
        height: 100%;
    }
</style>
