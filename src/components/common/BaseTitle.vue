<template>
    <div class="baseTitle">
        <img :src="img | PUBLIC_PATH">
        <span>{{ title }}</span>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        img: {
            type: String,
            default: ''
        }
    }
}
</script>
<style lang="scss" scoped>
.baseTitle {
    width: 100%;
    height: 1.2rem /* 48/40 */;
    display: flex;
    align-items: center;
    margin-bottom: .6rem /* 24/40 */;
    img {
        width: .755rem /* 30/40 */;
        height: .755rem /* 30/40 */;
        margin-right: .5rem /* 20/40 */;
        margin-top: -.15rem;
    }
    span {
        font-size: .85rem /* 34/40 */;
        color: #333333;
        font-weight: bold;
        line-height: 0;
    }
}
</style>
