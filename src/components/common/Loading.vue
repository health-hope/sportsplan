<template>
    <div class="container" v-show="showLoading">
        <div class="loading" id="loading">
            <div class="loading_box">
                <img src="../../assets/images/loading.gif" alt />
            </div>
            <!-- <div class="text">加载中...</div> -->
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showLoading: false,
            }
        }, methods: {
            show() {
                this.showLoading = true;
            }, hide() {
                this.showLoading = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/assets/style/mixin.scss";
    .container {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 100000000000000;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0,0,0,.6);
        // @include bg_color10();
        // @include box_shodow1(0 .3rem 1rem 0);
    }
    .loading {
        width: 5.75rem /* 230/40 */;
        height: 5.75rem /* 230/40 */;
        // @include bg_color11();
        border-radius: 0.3rem /* 12/40 */;
        border-radius: 0.3rem /* 12/40 */;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .loading_box {
            img {
                width: 3.5rem /* 140/40 */;
                height: 3.5rem;
            }
        }
        .text {
            font-size: 0.7rem /* 28/40 */;
            // @include font_color4();
            text-align: center;
            margin-top: 0.3rem /* 12/40 */;
            font-weight: bold;
        }
    }
</style>
