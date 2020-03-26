<template>
    <div v-if="tempData.courseName" class="soprtTitle">
        <div class="siyuan">{{ tempData.courseName }}</div>
        <div class="sub" v-if="tempData.currentCourseSeq!=0">第{{ tempData.currentCourseSeq }}天</div>
        <div class="sub" v-else>{{ tempData.beginDate }}开始</div>
        <!-- <div class="time">
            <img src="@/assets/images/icon_ydjh_sc.png" />
            <div class="min">累计运动{{tempData.exerciseMinute}}分钟</div>
        </div> -->
    </div>
</template>

<script>
    export default {
        props: {
            tempData: {
                type: Object,
                default: {},
            }
        },
        data() {
            return {
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/assets/style/mixin.scss";
    .soprtTitle {
        border-radius: 0.2rem;
        height: 7.2rem /* 273/40 */;
        background: url("../../assets/images/icon_ydjh_pic.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
        padding: 1.25rem 0 0.7rem 0.95rem;
        box-sizing: border-box;
        .siyuan {
            font-size: 1.2rem;
            line-height: 1.675rem;
            color: #ffffff;
            font-weight: bold;
        }
        .sub {
            font-size: 0.65rem;
            line-height: 0.925rem;
            color: #fff;
            margin: 0.1rem;
        }
        .sub1 {
            opacity: 0.6;
            font-size: 0.7rem /* 28/40 */;
            line-height: 1rem;
            // @include font_color1();
            position: relative;
            padding-left: 1.1rem /* 44/40 */;
            box-sizing: border-box;
            img {
                width: 0.9rem /* 36/40 */;
                height: 0.9rem /* 36/40 */;
                line-height: 1rem;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
            }
        }
        .time {
            display: flex;
            align-items: center;
            margin-top: 1.55rem;
            img {
                width: 0.6rem;
                height: 0.675rem;
                margin-right:.25rem;
            }
            .min {
                opacity: 0.7;
                font-size: 0.7rem;
                color: #ffffff;
            }
        }
    }
</style>