<template>
    <div class="end">
        <div class="ctn">
            <img class="icon" src="../../assets/images/img_ydjh_end_hz.png" />
            <div class="tit">恭喜完成本次训练</div>
            <div class="bto">
                <!-- <div class="box">
                    <div class="bto1">{{ executeSecond }}</div>
                    <div class="bto2">时长</div>
                </div> -->
                <div class="box">
                    <div class="bto1">{{ consumedKcal }}</div>
                    <div class="bto2">消耗/大卡</div>
                </div>
            </div>
        </div>
        <div class="button" @click="over">结束训练</div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        data() {
            return {}
        },
        computed: {
            ...mapState(['consumedKcal', 'executeSecond']),
        },
        methods: {
            over() {
                this.$router.replace('/plan')
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/style/mixin.scss";
    .end {
        min-height: 100%;
        box-sizing: border-box;
        background: rgb(247, 247, 247);
        display: flex;
        flex-direction: column;
        align-items: center;
        .ctn {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 15.55rem;
            height: 19.15rem;
            background: url("../../assets/images/bg_ydjh_end.png") no-repeat center;
            background-size: 100% 100%;
            margin-top: 1.6rem;
            .icon {
                width: 8.15rem;
                height: 9.65rem;
            }
            .tit {
                font-size: 0.8rem /* 32/40 */;
                color: #606060;
                text-align: center;
                line-height: 1.125rem /* 45/40 */;
                margin-bottom: 1.75rem /* 70/40 */;
                margin-top: 1.1rem;
            }
            .bto {
                display: flex;
                align-items: center;
                justify-content: center;
                .box {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .bto1 {
                    font-size: 1.4rem /* 56/40 */;
                    color: #252525;
                    line-height: 1.2rem /* 48/40 */;
                    font-weight: bold;
                }
                .bto2 {
                    font-size: 0.6rem /* 24/40 */;
                    line-height: 0.825rem /* 33/40 */;
                    color: #929292;
                    margin-top: 0.675rem;
                }
            }
        }
        .button {
            margin: 1.6rem auto 0 auto;
            width: 15.55rem;
            height: 2.4rem;
            border-radius: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
            font-weight: bold;
            @include font_color1();
            @include bg_button1();
        }
    }
</style>
