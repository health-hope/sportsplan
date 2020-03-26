<template>
    <div class="basicinfo_warp">
        
        <div
            @click="clickNextBtn"
            class="next tap_events"
            :class="nextBtnState?'activeed tap_events':'tap_events'"
        >下一步</div>
        <div class="basicinfo_content">
            <template  v-if="showGender">
                <div class="sex_font">性别</div>
                <div class="select_sex">
                    <div :class="sex=='2'?'active tap_events':'tap_events'" @click="sex='2'">
                        <i></i>
                        <span>女</span>
                    </div>
                    <div :class="sex=='1'?'active tap_events':'tap_events'" @click="sex='1'">
                        <i></i>
                        <span>男</span>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="sex_font"></div>
                <div class="select_sex"></div>
            </template>
            <div>
                <p class="title title_text">出生日期</p>
                <div class="con">
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
                    <div class="select_box tap_events" @click="openPicker">
                        <span class="select_font">{{birthday}}</span>
                        <i :class="xzData?'sanjiao':'sanjiao_active'"></i>
                    </div>
                </div>
            </div>
            <div>
                <p class="title title_text">身高</p>
                <div class="con">
                    <div class="select_box tap_events" @click="popupHegitShow">
                        <span class="select_font">{{ckHeight}}厘米</span>
                        <i :class="xzHeight?'sanjiao':'sanjiao_active'"></i>
                    </div>
                </div>
            </div>
            <div>
                <p class="title title_text">体重</p>
                <div class="con">
                    <div class="select_box tap_events" @click="popupWeightShow">
                        <span class="select_font">{{ckWeight}}公斤</span>
                        <i :class="xzWeight?'sanjiao':'sanjiao_active'"></i>
                    </div>
                </div>
            </div>
        </div>
        <mt-popup v-model="popupHegit" position="bottom" :closeOnClickModal="false">
            <div>
                <div class="btn_top" ref="buttonWrap">
                    <div class="left tap_events" @click="closeHeight">取消</div>
                    <div class="right tap_events" @click="selectHeigt">确定</div>
                </div>
                <div class="height_box" ref="pickerHeight">
                    <mt-picker
                        :slots="heightSlots"
                        @change="onValuesChange"
                        :visibleItemCount="visibleItemNum"
                        class="height_top"
                    />
                    <div class="height_font">厘米</div>
                </div>
            </div>
        </mt-popup>
        <!-- 体重 -->
        <mt-popup v-model="popupWeight" position="bottom" :closeOnClickModal="false">
            <div>
                <div class="btn_top">
                    <div class="left tap_events" @click="closeWeight">取消</div>
                    <div class="right tap_events" @click="selectWeight">确定</div>
                </div>
                <div class="height_box">
                    <mt-picker
                        :slots="weightSlots"
                        @change="onWeightChange"
                        :visibleItemCount="visibleItemNum"
                        class="height_top"
                    />
                    <div class="height_font">公斤</div>
                </div>
            </div>
        </mt-popup>
    </div>
</template>

<script>
    import { mapState} from 'vuex'
    import { getUrlParam ,setStorage, getStorage} from '@/assets/js/util.js'
    import { DatetimePicker, Picker, Popup } from "mint-ui";
    import axios from 'axios';
    import { env } from '@/service/env'
    export default {
        data() {
            return {
                sex: "2",
                nextBtnState: true,
                xzData: true,
                xzHeight: true,
                xzWeight: true,
                userInfo: {
                    gender: "",
                    birthday: "",
                    height: "",
                    weight: ""
                },
                startDate: new Date(1900, 1, 1),
                endDate: new Date(
                    new Date().getFullYear() - 18,
                    new Date().getMonth(),
                    new Date().getDate()
                ),
                value: "1999",
                visibleItemNum: 7, // 统一所以picker组件列表可见行数
                pickerVisible: "1990-01-01", //日期选择器默认显示选中日期
                birthday: "1990-01-01", //出生年月
                heightSlots: [
                    {
                        defaultIndex: 0,
                        flex: true,
                        values: [],
                        className: "height_item",
                        textAlign: "right",
                        getSlotValue: "",
                        setSlotValue: "",
                        picker: ""
                    }
                ],
                weightSlots: [
                    {
                        defaultIndex: 0,
                        flex: true,
                        values: [],
                        className: "height_item",
                        textAlign: "right",
                        getSlotValue: "",
                        setSlotValue: "",
                        picker: ""
                    }
                ],
                popupHegit: false, //身高弹框显隐
                height: "", // 滑动完成选中身高的数值
                ckHeight: 160, // 点击确定完成选中身高的数值

                popupWeight: false, //体重弹框显隐
                weight: "", // 滑动完成选中身高的数值
                ckWeight: 55.0 // 点击确定完成选中身高的数值
            };
        },
        components: {
            mtDatetimePicker: DatetimePicker,
            mtPicker: Picker,
            mtPopup: Popup
        },
        mounted() {
            this.heightSlots[0].values = this.createdArr(120, 200);
            this.weightSlots[0].values = this.createdArr(300, 1500);
            this.weightSlots[0].values = this.weightSlots[0].values.map(item => {
                return (item / 10).toFixed(1);
            });
            // 回显数据
            let userInfo = getStorage("session", "userInfo");
            if (userInfo) {
                if(userInfo.birthday.indexOf("-") != -1){
                    this.pickerVisible = userInfo.birthday;
                }else{
                    this.pickerVisible = userInfo.birthday.slice(0,4)+'-'+userInfo.birthday.slice(4,6)+'-'+userInfo.birthday.slice(6,8);
                }
                
                
                this.birthday = this.pickerVisible || this.birthday;
                this.sex = userInfo.gender || 2;
                this.ckHeight = userInfo.height || this.ckHeight;
                this.ckWeight = userInfo.weight || this.ckWeight;
                this.heightSlots[0].defaultIndex = Number(
                    this.heightSlots[0].values.findIndex(
                        item => item == this.ckHeight
                    )
                );
                this.weightSlots[0].defaultIndex = Number(
                    this.weightSlots[0].values.findIndex(
                        item => item == this.ckWeight
                    )
                );
            } else {
                this.heightSlots[0].defaultIndex = 40;
                this.weightSlots[0].defaultIndex = 250;
            }
        },
        computed: {
            ...mapState(['code','showGender']),
        },
        methods: {
            close(){
                // 关闭浏览器
                //  window.history.go(-100)
            },
            closeHeight() {
                this.removeEventBody();
                this.popupHegit = false;
                this.xzHeight = !this.xzHeight;
            },
            closeWeight() {
                this.removeEventBody();
                this.popupWeight = false;
                this.xzWeight = !this.xzWeight;
            },
            popupHegitShow() {
                this.addEventBody();
                this.popupHegit = true;
                this.xzHeight = !this.xzHeight;
            },
            popupWeightShow() {
                this.addEventBody();
                this.popupWeight = true;
                this.xzWeight = !this.xzWeight;
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
                this.xzData = !this.xzData;
                this.$refs.picker.open();

                this.dateVal = new Date();
            },
            handleCancel() {
                this.xzData = !this.xzData;
                this.removeEventBody();
            },
            handleConfirm(value) {
                this.removeEventBody();
                document
                    .getElementsByTagName("body")[0]
                    .removeEventListener("touchmove", this.handler, {
                        passive: false
                    }); //打开默认事件
                // 日期格式：'1990-01-01'
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
                this.birthday = dateValue;
                this.xzData = !this.xzData;
            },

            onValuesChange(picker) {
                this.height = picker.getValues()[0];
            },
            onWeightChange(picker) {
                this.weight = picker.getValues()[0];
            },
            // 创建数组段
            createdArr(start, end) {
                var arr = [];
                for (var i = start - 1; i < end; i++) {
                    arr[i] = i + 1;
                }
                arr = arr.filter(item => {
                    return typeof item == "number";
                });
                return arr;
            },
            selectHeigt() {
                this.removeEventBody();
                this.ckHeight = this.height;
                this.popupHegit = false;
                this.xzHeight = !this.xzHeight;
            },
            selectWeight() {
                this.removeEventBody();
                this.ckWeight = this.weight;
                this.popupWeight = false;
                this.xzWeight = !this.xzWeight;
            },

            /**
             * 点击下一步
             */
            clickNextBtn() {
                this.userInfo.height = `${this.ckHeight}`;
                this.userInfo.weight = `${this.ckWeight}`;
                this.userInfo.birthday = this.birthday;
                this.userInfo.gender = this.sex;
                // this.userInfo.userName = "";
                this.userInfo.userId = this.$userId; //this.$userId 挂在了vue实例上，所以从中获取
                setStorage("session", "userInfo", this.userInfo);
                this.$router.push({
                    path: "/questions",
                    query: {
                        userId: this.$userId
                    }
                });
            }
        },
        beforeRouteLeave(to,from,next){
            this.removeEventBody();
            next()
        }
    };
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
    .picker-selected{
        font-weight: bold !important;
    }


    
</style>
<style lang="scss" scoped>
    .basicinfo_warp {
        width: 100%;
        height: 100%;
        padding: 0.8rem;
        box-sizing: border-box;
        background:#f2f2f2;
        .next {
            width: 16.25rem;
            left: 1.25rem;
            height: 2.4rem;
            line-height: 2.4rem;
            margin: 0 auto;
            position: fixed;
            bottom: 0.8rem;
            background: #ededed;
            border-radius: 50px;
            font-size: 0.8rem;
            color: #cccccc;
            text-align: center;
        }

        .activeed {
            background: #4566ea;
            color: #ffffff;
        }
        .basicinfo_content {
            width: 17.15rem;
            width: 16.25rem;
            // height: 23rem;
            border-radius: 0.4rem;
            background: #ffffff;
            border-radius: 0.375rem;
            text-align: center;
            padding-bottom: 1.85rem;
            position: fixed;
            bottom: 4rem;
            top: 0.8rem;
            left: 1.25rem;
            .value_box {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .sanjiao_active {
                width: 0.4rem;
                height: 0.4rem;
                 background: url("../../assets/images/icon_xinxi_xl.png") no-repeat;
                background-size: 100% 100%;
                display: inline-block;
                margin-left: 0.5rem;
                transform: rotate(0deg);
                transition: transform 0.4s;
            }
            .sanjiao {
                width: 0.4rem;
                height: 0.4rem;
                 background: url("../../assets/images/icon_xinxi_xl.png") no-repeat;
                background-size: 100% 100%;
                display: inline-block;
                margin-left: 0.5rem;
                transform: rotate(0deg);
                transition: transform 0.4s;
            }
            .title_text {
                font-size: 0.8rem;
                color: #606060;
                padding: 1.85rem 0 0.4rem;
            }

            .select_text {
                font-size: 1.2rem;
                color: #252525;
            }

            .sex_font {
                padding: 2rem 0 1.4rem;
                font-size: 0.8rem;
                color: #606060;
                text-align: center;
            }

            .select_sex {
                display: flex;
                width: 100%;
                padding: 0 5rem;
                justify-content: space-between;
                align-items: center;
                box-sizing: border-box;

                div {
                    display: flex;
                    align-items: center;
                    color: #929292;
                    font-size: 1.2rem;
                    line-height: 1.2rem;
                    i {
                        width: 0.85rem;
                        height: 0.85rem;
                        border-radius: 50%;
                        background: url("../../assets/images/icon_baseinf_select_n.png")
                            no-repeat;
                        background-size: 100% 100%;
                        margin-right: 0.5rem;
                    }
                }

                .active {
                    color: #252525;

                    i {
                        background: url("../../assets/images/icon_baseinf_select_y.png")
                            no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }

            .select_box {
                display: flex;
                align-items: center;
                justify-content: center;

                .select_font {
                    font-size: 1.2rem;
                    color: #252525;
                    font-weight: 700;
                }
            }
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
        font-weight: bold !important;
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
