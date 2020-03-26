<template>
    <div class="conditioning" v-if="showView">
        <div v-if="showData">
            <div class="plan-c">
                <!-- 运动计划信息 -->
                <SportTitle :tempData="tempData" />
                <div class="programme">
                    <div class="p_ctn">
                        <!-- 日历 -->
                        <Calendar
                            :nursePlanList="dayPlans"
                            @planDateClick="planDateClick"
                            v-if="dayPlans.length>0"
                        />
                        <!-- 课程详情 -->
                        <ul class="detail">
                            <template v-if="showBegin">
                                <div v-if="!rest">
                                    <li
                                        :style="{ backgroundImage: `url(${item.moduleImageUrl})` }"
                                        class="dayPlans tap_events"
                                        @click="cardDetail(item,i)"
                                        v-for="(item, i) in moduleList"
                                        :key="`date${i}`"
                                    >
                                        <div>
                                            <div
                                                class="tis1"
                                            >{{ item.moduleName }} {{ item.videoMinute }}分钟</div>
                                            <div class="tis2">{{ item.moduleIntro }}</div>
                                        </div>
                                        <div v-if="item.lock" class="tis4">未解锁</div>
                                        <div
                                            v-else
                                            :class="item.finish?'tis4 tis4-f':'tis4'"
                                        >{{ item.finish?'已完成':'待完成' }}</div>
                                    </li>
                                </div>
                                <!-- 今日休息 -->
                                <div v-else>
                                    <li class="xiuxi-c">
                                        <img
                                            class="imgXX"
                                            src="../../assets/images/icon_ydjh_xx.png"
                                        />
                                        <div class="xiuxi">今日休息</div>
                                    </li>
                                </div>
                            </template>
                            <!-- 选择开始日期 -->
                            <template v-else>
                                <li class="changedate">
                                    <div class="date">{{beginDate | datefilter}}开始</div>
                                    <img
                                        class="edit"
                                        src="../../assets/images/bt_ydjh_timechange.png"
                                        @click="openPicker"
                                    />
                                </li>
                                <li>
                                    <div>
                                        <mt-datetime-picker
                                            :closeOnClickModal="false"
                                            :start-date="startDate"
                                            :end-date="endDate"
                                            v-model="pickerVisible"
                                            ref="picker"
                                            type="date"
                                            year-format="{value} 年"
                                            month-format="{value} 月"
                                            date-format="{value} 日"
                                            @cancel="handleCancel"
                                            @confirm="handleConfirm"
                                            :visibleItemCount="visibleItemNum"
                                        ></mt-datetime-picker>
                                    </div>
                                </li>
                            </template>
                        </ul>
                        <!-- 查看课程表 -->
                        <div class="class-list">
                            <div class="seeBtn">
                                <div class="seeBtn_b" @click="seeBtnClick">查看课程表</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 注意事项 -->
            <div class="ctn4">
                <div class="list3-bto">
                    <div class="list3-bto-c" v-if="showBegin">
                        <div class="list3-bto-tit">注意事项</div>
                        <div class="ctx" v-for="(item, i) in attentions" :key="`attentions${i}`">
                            <div class="circle"></div>
                            <span>{{ item }}</span>
                        </div>
                    </div>
                    <div class="list3-bto-c1 list3-bto-c" v-else>
                        <div class="list3-bto-tit marb">{{prompt.title}}</div>
                        <div
                            class="ctx mart"
                            v-for="(item, i) in prompt.contents"
                            :key="`attentions${i}`"
                        >
                            <div class="num">{{i+1}}.</div>
                            <span>{{ item }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 退出计划 -->
            <div @click="changePlan" class="plan_btn">退出计划</div>
        </div>
        <!-- 已完成运动计划弹窗 -->
        <div class="mask" v-if="showFinish">
            <div class="box">
                <div class="tit">{{tipObj.title}}</div>
                <div class="sub">{{tipObj.content}}</div>
                <div class="btn1" v-if="tipObj.newEval" @click="goNext('1')">制定计划，并重新测评</div>
                <div class="btn2" v-if="tipObj.noEval" @click="goNext('2')">制定计划，不再测评</div>
                <div class="btn1" v-if="tipObj.next" @click="goNext('3')">开启下一阶段</div>
                <div class="btn3" v-if="tipObj.giveup" @click="goNext('4')">放弃制定计划</div>
            </div>
        </div>
        <!-- 退出当前计划 -->
        <div class="mask" v-if="showQuit">
            <div class="box2">
                <div class="tit">退出当前计划</div>
                <div class="sub">确定重新制定运动计划吗？</div>
                <div class="btn">
                    <div class="btn1" @click="handlePlan(1)">取消</div>
                    <div class="btn2" @click="handlePlan(2)">确定</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Calendar from '@/components/common/Calendar.vue'
    import SportTitle from "@/components/common/SportTitle.vue"
    import { Countup } from 'vux'
    import { mapState, mapMutations } from 'vuex'
    import { apiGetPlan, apiSetPlan, apiEditDate } from '@/service/api/sportsPlan'
    import { TimeTool } from '@/assets/js/timeTool';
    import { DatetimePicker } from "mint-ui";
    export default {
        data() {
            return {
                showView: false,
                showData: false,
                dateVal: '',
                recordDate: '',//点击日期，默认当天
                beginDate: '',//开始日期
                tempData: {},//运动计划详情
                moduleList: [],//运动数据
                courseSeq: '',//运动计划第几天/节
                attentions: [],//注意事项
                rest: false,//是否休息
                showFinish: false,//结束提示
                tipObj: {},//结束提示对象
                showQuit: false,//退出提示
                showBegin: true,
                startDate: new Date(),
                endDate: new Date(
                    new Date().getFullYear() + 100,
                    new Date().getMonth(),
                    new Date().getDate()
                ),
                value: "1999",
                visibleItemNum: 5, // 统一所以picker组件列表可见行数
                pickerVisible: "", //日期选择器默认显示选中日期
                courseFinishPage: {},
                prompt: {},//温馨提示
            }
        },
        components: {
            Calendar,
            SportTitle,
            Countup,
            mtDatetimePicker: DatetimePicker,
        },
        filters: {
            datefilter(val) {
                return `${Number(val.substr(4, 2))}月${Number(val.substr(6, 2))}日`
            },
        },
        computed: {
            ...mapState(['code', 'userInfo', 'course', 'dayPlans', 'check']),
        },
        mounted() {
            const timeTools = new TimeTool();
            let recordDate = timeTools.parseTime("yyyy-mm-dd").replace(/-/g, "");
            this.recordDate = recordDate;
            //处理返回
            if (window.history && window.history.pushState) {
                // 往历史记录里面添加一条新的当前页面的url
                history.pushState(null, null, document.URL);
                // 给 popstate 绑定一个方法 监听页面刷新
                window.addEventListener('popstate', this.backChange, false);//false阻止默认事件
            }
        },
        destroyed() {
            window.removeEventListener('popstate', this.backChange, false);//false阻止默认事件
        },
        created() {
            this.getPlan();
        },
        methods: {
            ...mapMutations(['setListObj', 'setStartTime', 'setDayPlans', 'setCheck']),
            /**
            *监听返回
             */
            backChange() {
                this.$router.push('/');
            },
            async getPlan(type) {
                const timeTools = new TimeTool();
                let today = timeTools.parseTime("yyyy-mm-dd").replace(/-/g, "");
                if (this.dateVal + '' != '' && this.dateVal + '' != 'no') {
                    // this.recordDate = this.dayPlans[parseInt(this.dateVal)].fullDate;
                    let date = new TimeTool(this.beginDate);
                    // console.log("111="+this.dateVal);
                    this.recordDate = (this.dateVal != 0) ? date.addDate(date.parseTime("yyyy-mm-dd"),
                        this.dateVal).replace(/-/g, "") : this.beginDate;//运动计划结束日期
                    // console.log("recordDate===" + this.recordDate);
                } else {
                    this.recordDate = this.beginDate;
                }
                const data = await apiGetPlan(this.userInfo.userId, this.course, this.recordDate);
                const that = this;
                //运动计划执行页
                if (data.pageType == '1') {
                    let beginDate=data.courseIndexPage.beginDate.substring(4,6)+'月'+data.courseIndexPage.beginDate.substring(6,9)+'号'
                    this.tempData = {
                        courseName: data.courseIndexPage.courseName,
                        currentCourseSeq: data.courseIndexPage.currentCourseSeq,
                        exerciseMinute: data.courseIndexPage.exerciseMinute,
                        beginDate:beginDate
                    }
                    this.rest = data.courseIndexPage.rest;
                    this.recordDate = data.courseIndexPage.recordDate;//当前时间
                    this.beginDate = data.courseIndexPage.beginDate;
                    let time = new TimeTool(this.beginDate);
                    this.pickerVisible = time.parseTime("yyyy-mm-dd");
                    if (data.courseIndexPage.courseSeq != 0 && data.courseIndexPage.currentCourseSeq != 0) {
                        this.showBegin = true;
                    } else {
                        //运动计划还没有开始，修改日期，范围
                        //开始日期:当天日期
                        //结束日期：

                        this.showBegin = false;
                        this.prompt = data.courseIndexPage.prompt;
                        // let todayTool = new TimeTool();
                        // let today = todayTool.parseTime("yyyy-mm-dd");
                        // this.startDate = new Date(today);
                    }
                    let lock;
                    if (this.recordDate <= today) {
                        lock = false;
                    } else {
                        lock = true;
                    }
                    // console.log("lock==" + lock, this.recordDate, today);
                    data.courseIndexPage.moduleList.forEach(item => {
                        item.lock = lock;
                    })
                    this.moduleList = data.courseIndexPage.moduleList;
                    this.courseSeq = data.courseIndexPage.courseSeq;
                    this.attentions = data.courseIndexPage.attentions;
                    const timeTools = new TimeTool(data.courseIndexPage.beginDate);
                    let endDate = timeTools.addDate(timeTools.parseTime("yyyy-mm-dd"),
                        data.courseIndexPage.courseDayCount - 1);//运动计划结束日期
                    let dayPlans = timeTools.getRangeDate(timeTools.parseTime("yyyy-mm-dd"), endDate);
                    let weeklyExerciseDays = data.courseIndexPage.weeklyExerciseDays;
                    const index = '';
                    dayPlans.forEach((item, index) => {
                        //处理今天
                        if (type != '2') {
                            // console.log("dateVal==" + this.dateVal);
                            if (item.fullDate == today && (this.dateVal == index || this.dateVal == 'no')) {
                                item.check = true;
                            } else {
                                if (item.fullDate != today && this.dateVal == index) {
                                    item.check = true;
                                } else {
                                    item.check = false;
                                }
                            }
                        } else {
                            if (this.dateVal && this.dateVal == index) {
                                item.check = true;
                            } else {
                                if (item.fullDate == today && (this.dateVal == 'no' || (this.dateVal == 0 && index == 0))) {
                                    item.check = true;
                                } else {
                                    item.check = false;
                                    if (this.dateVal == 0 && index == 0) {
                                        item.check = true;
                                    }
                                }
                            }
                        }
                        //处理是否休息
                        if (weeklyExerciseDays.indexOf(parseInt(item.week)) > -1) {
                            item.rest = false;
                        } else {
                            item.rest = true;
                        }
                        item.day = parseInt(item.day);
                    })

                    this.dayPlans = dayPlans;
                    if (dayPlans) {
                        this.setDayPlans(dayPlans);
                    }
                    this.showData = true;
                }
                //运动计划结束页
                if (data.pageType == '2') {
                    //判断继续模式
                    let newEval, noEval, giveup, next;
                    if (data.courseFinishPage.continuous == '1') {
                        newEval = true;
                        noEval = false;
                        giveup = true;
                        next = false;
                    } else if (data.courseFinishPage.continuous == '2') {
                        newEval = true;
                        noEval = true;
                        giveup = true;
                        next = false;
                    } else if (data.courseFinishPage.continuous == '3') {
                        newEval = false;
                        noEval = false;
                        giveup = true;
                        next = true;
                    } else {
                        newEval = false;
                        noEval = false;
                        giveup = true;
                        next = false;
                    }
                    this.tipObj = {
                        title: data.courseFinishPage.title,
                        content: data.courseFinishPage.content,
                        newEval: newEval,
                        noEval: noEval,
                        giveup: giveup,
                        next: next
                    }
                    this.showFinish = true;
                    this.courseFinishPage = data.courseFinishPage;
                    this.showData = false;
                }
                if (data.pageType == '3') {
                    // 跳转首页
                    this.$router.push('/home')
                }
                this.showView = true;
            },
            // 点击日期
            planDateClick(val) {
                this.dateVal = val;
                this.setCheck(val);
                this.getPlan('2');
            },
            // 退出计划
            async changePlan() {
                this.showQuit = true;
            },
            //退出计划 操作
            handlePlan(type) {
                this.showQuit = false;
                if (type == 2) {
                    const data = apiSetPlan(this.userInfo.userId, this.course, '2');
                    this.$router.push('/');
                }
            },
            // 点击课程
            cardDetail(val, index) {
                if (!this.moduleList[index].lock) {
                    const list = {
                        courseId: this.course,
                        courseSeq: this.courseSeq,
                        moduleId: val.moduleId,
                        moduleType: val.moduleType,
                        recordDate: this.recordDate
                    }
                    this.setListObj(list);
                    // 记录起始时间
                    this.setStartTime((new Date()).valueOf());
                    this.$router.push('/detail')
                } else {
                    this.$toast('到当天才能解锁运动计划课程哦~')
                }

            },
            // 查看课表
            seeBtnClick() {
                this.$router.push('/timetable')
            },
            handler(e) {
                e.preventDefault();
            },
            removeEventBody() {
                // 取消阻止body滑动
                document
                    .getElementsByTagName("body")[0]
                    .removeEventListener("touchmove", this.handler, {
                        passive: false
                    }); //打开默认事件
            },
            addEventBody() {
                // 阻止body滑动
                document
                    .getElementsByTagName("body")[0]
                    .addEventListener("touchmove", this.handler, {
                        passive: false
                    }); //阻止默认事件
            },
            openPicker() {
                this.addEventBody();
                this.$refs.picker.open();
                // console.log(this.startDate);
            },
            handleCancel() {
                this.removeEventBody();
            },
            handleConfirm(value) {
                this.removeEventBody();
                document
                    .getElementsByTagName("body")[0]
                    .removeEventListener("touchmove", this.handler, {
                        passive: false
                    });
                function checkTime(i) {
                    if (i < 10) {
                        i = "0" + i;
                    }
                    return i;
                }
                let date = new Date(value);
                let dateValue =
                    date.getFullYear() +
                    "-" +
                    checkTime(date.getMonth() + 1) +
                    "-" +
                    checkTime(date.getDate());
                dateValue = dateValue.replace(/-/g, "");
                this.beginDate = dateValue;
                // console.log(this.startDate);
                //修改开始时间
                this.editBeginDate(dateValue);
            },
            /**
             * 修改开始时间
             */
            async editBeginDate(date) {
                const res = await apiEditDate(this.course, date);
                if (res.retCode == 'SUCCESS') {
                    //修改成功过后，初始化数据
                    this.getPlan();
                }
            },
            /**
             * 运动计划结束后，跳转
             */
            goNext(type) {
                //退出计划
                const data = apiSetPlan(this.userInfo.userId, this.course, '2');
                if (type == '1') {//制定计划，并重新测评
                    window.sessionStorage.setItem("riskEvaluation", JSON.stringify(this.courseFinishPage.riskEvaluation));
                    this.$router.push('/sportsassessment');
                }
                if (type == '2') {//制定计划，不再测评
                    window.sessionStorage.setItem("weeklyExerciseFrequencies", JSON.stringify(this.courseFinishPage.weeklyExerciseFrequencies));
                    window.sessionStorage.setItem("evaluationId", this.courseFinishPage.evaluationId);
                    this.$router.push('/cycle');
                }
                if (type == '3') {//开启下一阶段
                    window.sessionStorage.setItem("evaluationId", this.courseFinishPage.evaluationId);
                    this.$router.replace({
                        path: '/selecttime',
                        query: {
                            advance: true
                        }
                    });
                }
                if (type == '4') {//放弃制定计划
                    this.$router.replace('/');
                }
            },
            pushHistory() {
                let state = {
                    title: '',
                    url: ''
                }
                window.history.pushState(state, state.title, state.url)
            }
        }
    }
</script>
<style lang="scss">
    .mint-datetime {
        background: #ffffff;
        box-shadow: 0 0.1rem 0.4rem 0 rgba(0, 0, 0, 0.03);
    }
    .mint-datetime .picker-toolbar {
        width: 18.75rem;
        height: 2.475rem;
        background: #ffffff;
        font-size: 0.75rem;
        font-weight: bold;
        padding: 0 1rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ededed;
    }

    .mint-datetime .mint-datetime-action {
        width: auto;
        font-size: 0.75rem !important;
    }

    .mint-datetime .mint-datetime-action {
        color: #4566ea;
    }

    .mint-datetime .mint-datetime-cancel {
        color: #929292;
    }
    .mint-datetime .picker-items {
        padding: 1.55rem 0;
    }
    .mint-datetime .picker-item {
        text-align: center;
        font-size: 0.85rem;
        color: #cccccc;
        line-height: 1.625rem;
    }
    .mint-datetime .picker-selected {
        font-size: 0.95rem;
        color: #252525;
        font-weight: bold;
    }
</style>
<style lang="scss" scoped>
    @import "@/assets/style/mixin.scss";
    .conditioning {
        min-height: 100%;
        padding: 0.5rem 0.8rem 1.6rem 0.8rem /* 40/40 */;
        box-sizing: border-box;
        background: #fff;

        .plan-c {
            border-radius: 0.2rem;
            overflow: hidden;
            .programme {
                .p_ctn {
                    padding: 0.8rem 0.7rem 0 0.7rem;
                    background: #fff;
                    box-sizing: border-box;
                    position: relative;
                    .p_top {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 1.4rem /* 56/40 */;
                        padding: 0 1.05rem;
                        box-sizing: border-box;
                    }
                    .detail {
                        margin: 2rem -1.5rem 0 -1.5rem; /* 56/40 */
                        padding: 0 0.8rem;
                        box-sizing: border-box;
                        li + li {
                            margin-top: 0.5rem /* 20/40 */;
                        }
                        .dayPlans {
                            width: 100%;
                            height: 7.45rem;
                            border-radius: 0.2rem;
                            background-size: 100% 100%;
                            padding: 1rem 0.7rem 0.7rem 0.7rem /* 32/40 */;
                            box-sizing: border-box;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            position: relative;
                            overflow: hidden;
                            &::before {
                                content: "";
                                position: absolute;
                                width: 100%;
                                height: 100%;
                                left: 0;
                                top: 0;
                                border-radius: 0.1rem /* 4/40 */;
                                background-color: rgba(0, 0, 0, 0.4);
                            }
                            .tis1 {
                                font-size: 0.85rem /* 34/40 */;
                                line-height: 0.95rem;
                                color: #ffffff;
                                font-weight: bold;
                                z-index: 222;
                                position: relative;
                            }
                            .tis2 {
                                font-size: 0.55rem;
                                line-height: 0.75rem;
                                color: #fff;
                                margin-top: 0.3rem;
                                z-index: 222;
                                position: relative;
                            }

                            .tis4 {
                                width: 2.1rem;
                                height: 0.8rem;
                                background: rgba(255, 255, 255, 0.1);
                                border-radius: 0.55rem /* 22/40 */;
                                font-size: 0.5rem /* 20/40 */;
                                color: rgba(255, 255, 255, 0.8);
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                z-index: 222;
                                position: relative;
                                font-weight: bold;
                                // line-height: 0.8rem;
                            }
                            .tis4-f {
                                color: #fff;
                                @include bg_button();
                            }
                        }
                        .xiuxi-c {
                            margin-top: 3.5rem;
                            margin-bottom: 2.475rem;
                            box-sizing: border-box;
                            display: flex;
                            align-items: center;
                            flex-direction: column;
                            .imgXX {
                                width: 3.5rem;
                                height: 3.5rem /* 250/40 */;
                                margin: 0 auto 0.4rem auto;
                            }
                            .xiuxi {
                                font-size: 0.7rem /* 28/40 */;
                                line-height: 1rem /* 40/40 */;
                                color: #929292;
                                text-align: center;
                            }
                        }
                        .changedate {
                            margin: 5.45rem auto 4.4rem auto;
                            box-sizing: border-box;
                            display: flex;
                            align-items: center;
                            justify-content: center;

                            .date {
                                font-size: 0.75rem;
                                color: #252525;
                                margin-right: 0.6rem;
                                line-height: 1.05rem;
                                font-weight: bold;
                            }
                            .edit {
                                width: 0.975rem;
                                height: 0.85rem;
                            }
                        }
                        .datetime {
                        }
                    }
                    .class-list {
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                        margin-top: 1.2rem;
                        .seeBtn {
                            position: relative;
                            width: 9.9rem;
                            height: 2.45rem;
                            font-size: 0.9rem /* 36/40 */;
                            font-weight: bold;
                            border: 0.05rem solid;
                            @include border_color1();
                            @include font_color1();
                            border-radius: 1.225rem;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            box-sizing: border-box;
                        }
                    }
                }
            }
        }
        .ctn4 {
            overflow: hidden;
            position: relative;
            background: #fff;
            box-sizing: border-box;
            margin-top: 1.6rem;
            .list3-bto {
                width: 100%;
                box-sizing: border-box;
                .list3-bto-c1 {
                    background: #eceffc;
                    border-radius: 0.3rem;
                    padding: 0.9rem 0.8rem 0.75rem 0.8rem;
                }
                .list3-bto-c {
                    box-sizing: border-box;
                    .list3-bto-tit {
                        font-size: 0.8rem /* 32/40 */;
                        line-height: 1.05rem;
                        font-weight: bold;
                        color: #252525;
                        margin-bottom: 0.15rem;
                    }
                    .marb {
                        margin-bottom: 1rem;
                    }
                    .mart {
                        margin-top: 0.6rem !important;
                    }
                    .al {
                        align-items: center;
                    }
                    .ctx {
                        margin-top: 0.3rem;
                        position: relative;
                        display: flex;
                        align-items: flex-start;
                        .num {
                            font-size: 0.7rem;
                            color: #666666;
                            margin-top: 0.1rem;
                        }
                        .circle {
                            width: 0.3rem;
                            height: 0.3rem;
                            @include bg_button();
                            border-radius: 50%;
                            margin-right: 0.3rem;
                            margin-top: 0.4rem;
                        }
                        span {
                            font-size: 0.7rem;
                            color: #606060;
                            line-height: 1.1rem;
                            display: inline-block;
                            width: 16.25rem;
                        }
                    }
                }
            }
        }
        .plan_btn {
            width: 9.9rem;
            height: 2.45rem;
            margin: 1.6rem auto 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 1.225rem;
            font-size: 0.9rem;
            @include font_color3();
            @include border_color();
            border: 0.05rem solid;
            font-weight: bold;
        }
        .mask {
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            background: rgba(37, 37, 37, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            .box {
                width: 14.55rem;
                background: #ffffff;
                border-radius: 0.425rem;
                padding: 1.5rem 1.5rem 0.9rem 1.5rem;
                .tit {
                    font-size: 0.9rem;
                    color: #252525;
                    line-height: 1.25rem;
                    font-weight: bold;
                }
                .sub {
                    margin-top: 0.6rem;
                    font-size: 0.7rem;
                    color: #999999;
                    line-height: 1.05rem;
                }
                .btn1 {
                    width: 14.55rem;
                    height: 2.2rem;
                    border-radius: 1.1rem;
                    font-size: 0.8rem;
                    color: #ffffff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-weight: bold;
                    @include bg_color();
                    margin-top: 0.9rem;
                }
                .btn2 {
                    width: 14.55rem;
                    height: 2.2rem;
                    border-radius: 1.1rem;
                    font-size: 0.8rem;
                    @include font_color1();
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 0.05rem solid;
                    @include border_color1();
                    margin-top: 0.9rem;
                }
                .btn3 {
                    width: 14.55rem;
                    height: 1rem;
                    border-radius: 1.1rem;
                    font-size: 0.7rem;
                    @include font_color1();
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 0.9rem;
                }
            }
            .box2 {
                width: 14.55rem;
                height: 8.3rem;
                padding: 1.2rem 1.5rem 1rem 1.5rem;
                background: #ffffff;
                border-radius: 0.425rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                .tit {
                    font-size: 0.9rem;
                    color: #252525;
                    line-height: 0.9rem;
                    font-weight: bold;
                }
                .sub {
                    align-self: flex-start;
                    margin-top: 2.125rem;
                    font-size: 0.9rem;
                    color: #252525;
                    line-height: 1.35rem;
                }
                .btn {
                    margin-top: 2rem;
                    display: flex;
                    align-items: center;
                    .btn1 {
                        width: 6rem;
                        height: 1.7rem;
                        line-height: 1.7rem;
                        text-align: center;
                        font-size: 0.8rem;
                        color: #8f8f8f;
                        font-weight: bold;
                        background: #f7f7f7;
                        border-radius: 0.85rem;
                    }
                    .btn2 {
                        margin-left: 2.55rem;
                        width: 6rem;
                        height: 1.7rem;
                        line-height: 1.7rem;
                        text-align: center;
                        font-size: 0.8rem;
                        color: #fff;
                        font-weight: bold;
                        @include bg_color();
                        border-radius: 0.85rem;
                    }
                }
            }
        }
    }
</style>