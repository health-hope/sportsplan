<template>
    <div class="cell">
        <div class="left">{{ leftVal }}</div>
        <div class="right">
            <span class="text">{{ rightVal }}</span>
            <img :src="'icon_right.png' | PUBLIC_PATH">
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    },
    props: {
        leftVal: {
            type: String,
            default: ''
        },
        rightVal: {
            type: String,
            default: '请选择'
        },
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
.cell {
    display: flex;
    min-height: 1.2rem /* 48/40 */;
    justify-content: space-between;
    & + .cell {
        margin-top: 1.3rem /* 52/40 */;
    }
    .left {
        font-size: .8rem /* 32/40 */;
        // @include font_color4();
        text-align: left;
        line-height: 1.2rem /* 48/40 */;
        margin-right: .6rem /* 28/40 */;
    }   
    .right {
        font-size: 0;
        flex: 1;
        padding-right: .85rem /* 34/40 */;
        box-sizing: border-box;
        position: relative;
        text-align: right;
        .text {
            font-size: .8rem /* 32/40 */;
            // @include font_color5();
            line-height: 1.2rem /* 48/40 */;
            word-break: break-all;
        }
        img {
            width: .335rem /* 13.4/40 */;
            margin-left: .5rem /* 20/40 */;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            margin-top: -.05rem;
        }
    }
}
</style>

