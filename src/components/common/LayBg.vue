<template>
    <div class="lay-bg">
        <div class="bg1" :style="{backgroundImage: `url(${bg1})`}  | PUBLIC_PATH"></div>
        <div class="bg2" :style="{backgroundImage: `url(${bg2})`}  | PUBLIC_PATH"></div>
        <div class="bg3" :style="{backgroundImage: `url(${bg3})`}  | PUBLIC_PATH"></div>
        <div class="bg4" :style="{backgroundImage: `url(${bg4})`}  | PUBLIC_PATH"></div>
    </div>
</template>

<script>
    export default {
        props: {
            bg1: {
                type: String,
                default: 'sy_bg_zuoshang.png'
            },
            bg2: {
                type: String,
                default: 'sy_bg_youshang.png'
            },
            bg3: {
                type: String,
                default: 'sy_bg_zuoxia.png'
            },
            bg4: {
                type: String,
                default: 'sy_bg_youxia.png'
            },
        }
    }
</script>

<style lang="scss" scoped>
.lay-bg{
    width: 100%;
    height: 100%;
    &> div{
        position: absolute;
        width: .475rem;
        height: .475rem;
    }
    .bg1{
        top: .25rem;
        left: .25rem;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .bg2{
        top: .25rem;
        right: .25rem;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .bg3{
        bottom: .25rem;
        left: .25rem;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .bg4{
        bottom: .25rem;
        right: .25rem;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
}
</style>