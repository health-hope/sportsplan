<template>
    <div class="basicinfo_warp">
        <div class="next-wrap">
        <div
            @click="goback"
            class="next tap_events yes"
        >有，退出制定计划</div>
                <div
            @click="clickNextBtn"
            class="next tap_events activeed"
        >没有，继续制定计划</div>
        </div>

        <div class="basicinfo_content"  >
           <div class="tit">{{riskEvaluation.title}}</div>
           <div class="text" v-for="(item,index) in riskEvaluation.content" :key="index">{{index+1}}、{{item.replace(/；/,"").replace(/。/,"")}}。</div>
        </div>
        <div class="basicinfo_content_both" ></div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                "riskEvaluation":{},
                contentWrapH:0,
            }
        },
       mounted(){
            this.riskEvaluation = JSON.parse(window.sessionStorage.getItem("riskEvaluation"));
                
        },
        methods:{
            clickNextBtn() {
                this.$router.push('/basicinfo')
            },
            goback(){             
                this.$router.push('/')
            }
        }
    }
</script>

<style>
    .mint-datetime .picker-toolbar {
        width: 18.75rem;
        height: 2.25rem;
        background: #ffffff;
        font-size: 0.75rem;
        padding: 0 1rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .mint-datetime-action {
        width: auto;
        font-size: 0.75rem !important;
    }

    .mint-datetime-action {
        color: #4566ea;
    }

    .mint-datetime-cancel {
        color: #929292;
    }
    .picker-item {
        text-align: center;
    }
</style>
<style lang="scss" scoped>
    .basicinfo_warp {
        width: 100%;
        height: 100%;
        padding: 0.8rem;
        box-sizing: border-box;
        background:#f2f2f2;
        .next-wrap{
            width: 17.15rem;
            height: 2.2rem;
            display: flex;
            justify-content: space-between;
            position: fixed;
            bottom: 0.8rem;
        }
        .next {
            left: 1.25rem;
            height: 2.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #ededed;
            border-radius: 50px;
            font-size: 0.8rem;
            color: #cccccc;
            text-align: center;
            width: 8.2rem;
        }

        .activeed {
            background: #4566ea;
            color: #ffffff;
        }
        .yes{
            background: #FFFFFF;
            box-shadow: 0 6px 14px 0 rgba(0,0,0,0.05);
            color: #4566EA ;
        }
        .basicinfo_content {
            overflow-y: auto;
            width: 17.15rem;
            border-radius: 0.4rem 0.4rem 0 0;
            background: #ffffff;
            // text-align: center;
            padding: 1.075rem .8rem  0;
            box-sizing: border-box;
            position: fixed;
            bottom: 5.85rem;
            top: 0.8rem;
            left: .8rem;
            .tit{
                font-size: .9rem;
                color: #4566EA;
                margin-bottom: .8rem;
                font-weight: bold;
            }
            .text{
                font-size:.7rem;
                color: #606060;
                line-height: 1.1rem;
                margin-bottom: .3rem
            }
        }
        .basicinfo_content_both{
            border-radius: 0 0 0.4rem 0.4rem;
            width: 17.15rem;
            height: 1.85rem;
            position: fixed;
            bottom: 4.2rem;
            left: .8rem;
            background: #ffffff;
        }
    }

    // 身高
    .height_box {
        position: relative;
    }

    .height_top {
        width: 18.75rem;
        background: #fff;
        position: relative;
    }

    .height_font {
        position: absolute;
        left: 50%;
        top: 50%;
        color: #252525;
        width: 2.4rem;
        height: 0.6rem;
        margin: -0.4rem 0 0 1.4rem;
        font-size: 0.6rem;
    }

    .btn_top {
        position: relative;
        z-index: 999999999;
        width: 100%;
        height: 2.25rem;
        background: #ffffff;
        font-size: 0.75rem;
        padding: 0 1.25rem;
        box-sizing: border-box;
        border-bottom: 1px solid #eaeaea;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left {
            color: #929292;
        }

        .right {
            color: #4566ea;
        }
    }
</style>
