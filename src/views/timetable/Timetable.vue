<template>
    <div class="timeTable" v-if="dayPlans.length">
        <div class="ctn">
            <ul>
                <li v-for="(item, i) in dayPlans" :key="`li${i}`">
                    <template v-if="!item.rest">
                        <div
                            class="tit"
                            v-for="(item1, i1) in item.moduleList"
                            :key="`module${i1}`"
                            @click="listClick(item1, item.courseSeq)"
                        >
                            <div class="tit1">
                                <span>{{ item.recordDate | datefilter}}星期{{ item.weekDay | weekFilter}}</span>
                            </div>
                            <div class="tit2">
                                <div class="tit2-1">
                                    <img
                                        v-if="!item1.finish"
                                        src="../../assets/images/icon_ydjh_xz_n.png"
                                    />
                                    <img v-else src="../../assets/images/icon_ydjh_xz_y.png" />
                                    <div class="w380">{{ item1.moduleName }}</div>
                                </div>
                                <div class="tit2-2" v-if="!item.rest">{{ item1.videoMinute }}分钟</div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="tit">
                            <div class="tit1">
                                <span>{{ item.recordDate | datefilter}}星期{{ item.weekDay | weekFilter}}</span>
                            </div>
                            <div class="tit2">
                                <div class="tit2-1">
                                    <div class="img"></div>
                                    <div>休息日</div>
                                </div>
                            </div>
                        </div>
                    </template>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import { mapState, mapMutations } from 'vuex'
    import { apiGetPlanList } from '@/service/api/sportsPlan'
    import { TimeTool } from '@/assets/js/timeTool';
    export default {
        data() {
            return {
                dayPlans: [],
            }
        },
        computed: {
            ...mapState(['code', 'userInfo', 'course']),
        },
        filters: {
            datefilter(val) {
                return `${Number(val.substr(4, 2))}月${Number(val.substr(6, 2))}日`
            },
            weekFilter(val) {
                switch (val) {
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
        created() {
            this.getPlan()
        },
        methods: {
            ...mapMutations(['setListObj', 'setStartTime']),
            async getPlan() {
                const data = await apiGetPlanList(this.userInfo.userId, this.course)
                const timeTools = new TimeTool();
                let today = timeTools.parseTime("yyyy-mm-dd").replace(/-/g, "");
                data.dailyPlans.forEach(item => {
                    item.moduleList.forEach(item1 => {
                        if (item.recordDate <= today) {
                            item1.lock = false;
                        } else {
                            item1.lock = true;
                        }
                    })
                })
                this.dayPlans = data.dailyPlans
            },
            listClick(val, val1) {
                if (!val.lock) {
                    const list = {
                        courseId: this.course,
                        courseSeq: val1,
                        moduleId: val.moduleId,
                        moduleType: val.moduleType,
                    }
                    this.setListObj(list)
                    // 记录起始时间
                    this.setStartTime((new Date()).valueOf())
                    this.$router.push('/detail')
                } else {
                    this.$toast('到当天才能解锁运动计划课程哦~')
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/style/mixin.scss";
    .timeTable {
        min-height: 100%;
        // padding: 0 0.8rem 1rem 0.8rem;
        box-sizing: border-box;
        background: rgb(247, 247, 247);
        .ctn {
            box-sizing: border-box;
            position: relative;
            ul {
                li {
                    background: #ffffff;
                }
                .tit {
                    box-sizing: border-box;
                    margin-bottom: 0.3rem;
                    .tit1 {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 0.7rem /* 28/40 */;
                        color: #929292;
                        height: 3rem /* 40/40 */;
                        border-bottom: 0.0125rem solid #e2e2e2;
                        span:last-child {
                            color: #252525;
                            margin: 0 0.8rem;
                        }
                    }
                    .tit2 {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        height: 3rem;
                        margin: 0 0.8rem;
                        .tit2-1 {
                            font-size: 0.8rem /* 32/40 */;
                            color: #252525;
                            display: flex;
                            align-items: center;
                            img {
                                width: 0.9rem;
                                height: 0.9rem;
                                margin-left: 0.05rem;
                                margin-right: 0.45rem;
                            }
                            .img {
                                width: 0.9rem;
                                height: 0.9rem;
                                margin-left: 0.05rem;
                                margin-right: 0.45rem;
                            }
                            .w380 {
                                width: 9.5rem /* 380/40 */;
                                word-break: break-all;
                            }
                        }
                        .tit2-2 {
                            font-size: 0.6rem;
                            @include font_color1();
                        }
                    }
                }
            }
        }
    }
</style>