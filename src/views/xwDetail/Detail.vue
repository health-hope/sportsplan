<template>
    <div class="detail" v-if="executeList && executeList.length">
        <div class="ctn">
            <ul>
                <li v-for="(item, i) in executeList" :key="`${i}`">
                    <!-- :key="`li${item.actionId}`" -->
                    <div class="title">
                        <div
                            class="left"
                        >{{ (Number(i) + 1) + (pageRequest.pageNum-1) * pageRequest.pageSize }}、{{ item.actionName }}</div>
                        <!-- <div class="right">{{ item.followSecond }}秒 / 间歇{{item.restSecond}}秒</div> -->
                         <div class="right" v-if="item.actionUnit=='TIMES'">{{ item.exerciseCount }}次 / 间歇{{item.restSecond}}秒</div>
                        <div class="right" v-else>{{ item.followSecond }}秒 / 间歇{{item.restSecond}}秒</div>
                    </div>
                    <div class="bto">
                        <x-img
                            class="gif"
                            :offset="-100"
                            :default-src="item.actionGifCoverUrl"
                            :src="item.actionGifUrl"
                        ></x-img>
                        <div class="content">
                            <div
                                class="ctnList"
                                v-for="(item1, i1) in item.explainTexts"
                                :key="`item1${i1}`"
                            >
                                <div class="circle"></div>
                                <div class="sub">{{ item1 }}</div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 分页 -->
        <div :class="!pageInfo.first?'page':'page page1'">
            <div class="upper" v-if="!pageInfo.first" @click="pageClick(pageInfo.lastPageNum)">上一页</div>
            <div v-if="!pageInfo.last" class="lower" @click="pageClick(pageInfo.nextPageNum)">下一页</div>
            <div v-if="pageInfo.last" class="lower" @click="overClick()">完成训练</div>
        </div>
    </div>
</template>
<script>
    import { mapState, mapMutations } from 'vuex'
    import { apiGetList, apiEnd } from '@/service/api/sportsPlan'
    import { XImg } from 'vux'
    import {formatSeconds} from '@/assets/js/timeTool'
    export default {
        data() {
            return {
                executeList: [],
                pageRequest: {
                    pageNum: 1,
                    pageSize: 5
                },
                pageInfo: {}
            }
        },
        components: {
            XImg
        },
        computed: {
            ...mapState(['code', 'userInfo', 'listObj', 'course', 'startTime']),
        },
        filters: {
            datefilter(val) {
                return `${Number(val.substr(4, 2))}月${Number(val.substr(6, 2))}日`
            }
        },
        created() {
            // userId, courseId, courseSeq, moduleId, moduleType
            this.getDetail()
        },
        methods: {
            ...mapMutations(['setConsumedKcal','setExecuteSecond']),
            async getDetail() {
                const data = await apiGetList(this.userInfo.userId, this.listObj.courseId, this.listObj.courseSeq, this.listObj.moduleId, this.listObj.moduleType, this.pageRequest)
                this.executeList = data.executeList
                this.pageInfo = data.pageInfo
                document.title = data.moduleName
            },
            listClick(val, val1) {
                if (val.lock == 1) {
                    const list = {
                        courseId: this.course,
                        courseSeq: val1,
                        moduleId: val.moduleId,
                        moduleType: val.moduleType,
                    }
                    this.setListObj(list)
                    this.$router.push('/detail')
                } else {
                    this.$toast('到当天才能解锁运动计划课程哦~')
                }
            },
            // 上一页 下一页
            pageClick(index) {
                this.pageRequest.pageNum = index
                this.getDetail()
                window.scrollTo(0, 0)
            },
            // 完成训练 recordDate, userId, courseId, courseSeq, moduleId, moduleType\
            async overClick() {
                // 用时
                let endTime = (new Date()).valueOf()
                let executeSecond = ((endTime - this.startTime) / 1000).toFixed(2)
                //测试数据
                // executeSecond=2800;
                const data = await apiEnd(this.listObj.recordDate, this.userInfo.userId, this.listObj.courseId, this.listObj.courseSeq, this.listObj.moduleId, this.listObj.moduleType, executeSecond)
                this.setConsumedKcal(data.consumedKcal)
                // console.log(endTime, this.startTime, executeSecond,formatSeconds(executeSecond))
                this.setExecuteSecond(formatSeconds(executeSecond));
                this.$router.replace('/end');
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/style/mixin.scss";
    .detail {
        min-height: 100%;
        padding: 0 0.8rem 0.8rem 0.8rem /* 184/40 */;
        box-sizing: border-box;
        .ctn {
            box-sizing: border-box;
            position: relative;
            padding-bottom: 4.6rem;
            li {
                margin-top: 2.2rem;
                box-sizing: border-box;
                .title {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 1.2rem;
                    align-items: center;
                    .left {
                        font-size: 1.05rem;
                        font-weight: bold;
                        width: 11rem;
                        color: #252525;
                        line-height: 1.6rem;
                        word-break: break-all;
                    }
                    .right {
                        font-size: 0.65rem /* 26/40 */;
                        line-height: 0.6rem;
                        @include font_color1();
                    }
                }
                .bto {
                    font-size: 0;
                    .gif {
                        width: 17.15rem;
                        height: 9.65rem;
                        border-radius: 0.2rem;
                    }
                    .content {
                        margin-top: 1.2rem;
                        box-sizing: border-box;
                        .ctnList {
                            line-height: 1.1rem /* 44/40 */;
                            position: relative;
                            display: flex;
                            .circle {
                                width: 0.3rem;
                                height: 0.3rem;
                                @include bg_button();
                                margin-right: 0.8rem;
                                border-radius: 50%;
                                margin-top: 0.375rem;
                            }
                            .sub {
                                width: 15.65rem;
                                font-size: 0.75rem /* 28/40 */;
                                color: #666;
                                line-height: 1.05rem;
                            }
                        }
                    }
                }
            }
        }
        .page {
            position: fixed;
            z-index: 222;
            width: 100%;
            left: 50%;
            bottom: 0.8rem;
            transform: translateX(-50%);
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            padding:0 .8rem;
            .upper {
                width: 5rem;
                height: 2.4rem;
                border-radius: 1.2rem;
                @include font_color1();
                @include border_color1();
                border: 0.05rem solid;
                font-size: 0.8rem;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 0.15rem 0.35rem 0 rgba(0, 0, 0, 0.05);
                background: #fff;
            }
            .lower {
                width: 5rem;
                height: 2.4rem;
                border-radius: 1.2rem;
                @include bg_color();
                font-size: 0.8rem;
                color: #fff;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
        .page1 {
            justify-content: flex-end;
        }
    }
</style>