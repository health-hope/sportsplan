<template>
    <div class="calendar no-copy" ref="scrollView" @touchmove.stop>
        <div class="calendar-c">
            <ul class="planDate">
                <li v-for="(item, i) in nursePlanList" :key="`A${i}`" v-if="nursePlanList.length>0">
                    <div class="date">{{item.week | weekFilter }}</div>
                    <div
                        @click="planDateClick(i)"
                        :class="item.check?'weekDate select':'weekDate'"
                        :style="{'color':item.rest?'#C4C4C4':' #333333'}"
                    >{{ item.day}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import { mapState, mapMutations } from 'vuex'
    export default {
        data() {
            return {
            }
        },
        props: {
            nursePlanList: {
                type: Array
            }
        },
        computed: {
            ...mapState(['check', 'scrollLeft']),
        },
        filters: {
            weekFilter(val) {
                switch (parseInt(val)) {
                    case 1:
                        return '一'
                        break;
                    case 2:
                        return '二'
                        break;
                    case 3:
                        return '三'
                        break;
                    case 4:
                        return '四'
                        break;
                    case 5:
                        return '五'
                        break;
                    case 6:
                        return '六'
                        break;
                    case 7:
                        return '日'
                        break;
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                // console.log("check=="+this.check);
                if (this.nursePlanList.length > 0) {
                    if (this.check == 'no') {
                        // 取日历今天的状态
                        this.nursePlanList.some((item, i) => {
                            if (item.today) this.setCheck(i)
                        })
                        if (this.check == 'no') this.setCheck('no')//this.setCheck(0)
                        let clientWidth = document.documentElement.clientWidth
                        let scrollLeft = (clientWidth / (750 / 90) * this.check)
                        this.$refs.scrollView.scrollLeft = scrollLeft
                        this.$emit('planDateClick', this.check)
                        return
                    } else if (this.check >= 0) {
                        // 取记录的日期状态 和滚动位置
                        this.$refs.scrollView.scrollLeft = this.scrollLeft
                        this.$emit('planDateClick', this.check)
                        return
                    }
                }
            })
        },
        beforeDestroy() {
            // 记住横向滚动的距离
            this.setScrollLeft(this.$refs.scrollView.scrollLeft)
        },
        methods: {
            ...mapMutations(['setCheck', 'setScrollLeft']),
            planDateClick(val) {
                this.setCheck(val)
                this.setScrollLeft(this.$refs.scrollView.scrollLeft)
                this.$emit('planDateClick', val)
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/style/mixin.scss";
    .calendar {
        width: 100%;
        overflow-x: auto;
        // padding: 0 1.05rem;
        box-sizing: border-box;
        &::-webkit-scrollbar {
            display: none;
        }
        .calendar-c {
            .planDate {
                display: flex;
                justify-content: space-between;
                white-space: nowrap;
                li {
                    width: 1.6rem /* 64/40 */;
                    height: 2.875rem /* 115/40 */;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                    flex-basis: 1.6rem /* 64/40 */;
                    flex-shrink: 0;
                    & + li {
                        margin-left: 0.65rem /* 26/40 */;
                    }
                    &:last-child {
                        padding-right: 1.05rem;
                    }
                    .date {
                        height: 0.9rem /* 34/40 */;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 0.6rem;
                        color: #999999;
                        line-height: 0;
                    }
                    .date1 {
                    }
                    .weekDate {
                        width: 1.5rem /* 64/40 */;
                        height: 1.5rem /* 64/40 */;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 0.8rem /* 34/40 */;
                        color: #b9b9b9;
                        line-height: 0;
                        // font-weight: bold;
                    }
                }
                .select {
                    color: #fff !important;
                    @include bg_color();
                    font-weight: bold;
                }
            }
        }
        .imgLeft,
        .imgRight {
            width: 1.05rem /* 42/40 */;
            height: 2.875rem /* 115/40 */;
        }
        .imgLeft {
            position: absolute;
            left: -0.1rem;
            top: 1.4rem /* 56/40 */;
            z-index: 222;
        }
        .imgRight {
            position: absolute;
            right: -0.1rem;
            top: 1.4rem /* 56/40 */;
            z-index: 222;
        }
    }
</style>

