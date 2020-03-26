<template>
    <div class="template1-c">
        <div class="template1">
            <div class="title">{{ data.title }}</div>
            <p class="ctx" v-for="(item, i) in data.content" :key="`template1${i}`">
                <img class="icon1" :src="'tlfa_icon_zysx1.png' | PUBLIC_PATH">
                {{ item }}
            </p>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            data: {
                type: Object
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/style/mixin.scss";
    .template1-c {
        width: 100%;
        // @include bg_color9();
        padding: .25rem /* 10/40 */;
        box-sizing: border-box;
        .template1 {
            padding: 0.55rem /* 22/40 */ 0.35rem /* 14/40 */;
            // @include border2(1px solid);
            box-sizing: border-box;
            .title {
                font-size: 0.8rem /* 32/40 */;
                line-height: 1.125rem /* 45/40 */;
                // @include font_color1();
                font-weight: bold;
                margin-bottom: .6rem /* 24/40 */;
            }
            .ctx {
                font-size: 0.7rem /* 28/40 */;
                // @include font_color5();
                line-height: 1.1rem /* 44/40 */;
                margin-top: 0.4rem /* 16/40 */;
                margin-left: 0.95rem /* 38/40 */;
                position: relative;
                .icon1 {
                    width: 0.45rem /* 18/40 */;
                    height: 0.45rem /* 18/40 */;
                    display: inline-block;
                    position: absolute;
                    top: 0.272rem;
                    left: -0.95rem;
                }
            }
        }
    }
</style>
