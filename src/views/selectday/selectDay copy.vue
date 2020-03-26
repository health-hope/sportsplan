<template>
  <div class="cycle-wrap">
        <div class="title">选择运动时间</div>
            <p>每周运动{{cycle}}次，须选择{{cycle}}个运动日</p>
            <ul>
                <li v-for="(item,index) in checkDate" :key="index"
                @click="checked(index,item.disable)"
                :class="{'active':item.chcked,'disable':item.disable}"
                >{{item.text}}</li>
            </ul>
            <p>运动计划创建后，运动日不可更改</p>
        <div class="next"  @click="nextHandle(next)" :class="{'checked':next}">创建我的运动计划</div>
  </div>
</template>

<script>
import { mapState, mapMutations} from 'vuex'
import { apiSaveCreateSportsPlan } from '@/service/api'
import { DatetimeView } from 'vux'
  export default {
    name:'',
    props:[''],
    data () {
      return {
        cycle:"",
        selectVal:0,
        value1: `${new Date().getFullYear()}-${this.add0(
                new Date().getMonth() + 1
            )}-${this.add0(new Date().getDate())}`,
        format: 'YYYY-MM-DD',
        jintian:true,
        mingtian:false,
        checkDate:[
            {"text":"一",
            "chcked":false,
            "disable":false,
            "day":1},
            {"text":"二",
            "chcked":false,
            "disable":false,
            "day":2},
            {"text":"三",
            "chcked":false,
            "disable":false,
            "day":3},
            {"text":"四",
            "chcked":false,
            "disable":false,
            "day":4},
            {"text":"五",
            "chcked":false,
            "disable":false,
            "day":5},
            {"text":"六",
            "chcked":false,
            "disable":false,
            "day":6},
            {"text":"日",
            "chcked":false,
            "disable":false,
            "day":7},
        ],
        checkedArrLength:0,//选中的数组长度
        next : false ,//可以点击下一步
        weeklyExerciseDays:[]
      };
    },

    components: {
        DatetimeView
    },
    computed: {
        ...mapState(['code', 'userInfo', 'courseKind','evaluationId']),
    },
    beforeMount() {},

    mounted() {
        let cycle = parseInt(window.sessionStorage.getItem('cycle')) 
        this.cycle = cycle;
    },








    methods: {
        ...mapMutations(["setCheck","setCourse"]),
        // disabled 是ture 不可点击  可点击
        checked(index , disable){  
            // chooseRule  1	无规则 ,2	运动日期不可连续.
            let chooseRule = window.sessionStorage.getItem('chooseRule');
            //  cycle 运动天数
            let cycle = parseInt(window.sessionStorage.getItem('cycle'));
            
            
            if (!disable) {
                if(chooseRule==1&&this.checkedArrLength+1<= cycle){
                    this.checkDate[index].chcked=!this.checkDate[index].chcked;
                }
                if(chooseRule==1&&this.checkedArrLength+1> cycle){
                    if(this.checkDate[index].chcked){
                        this.checkDate[index].chcked=!this.checkDate[index].chcked;
                    } 
                }

                if (chooseRule==2&&this.checkedArrLength+1<= cycle){
                    this.checkDate[index].chcked=!this.checkDate[index].chcked;
                    console.log(this.checkDate,"this.checkDate");
                    
                    if (!this.checkDate[index].chcked) {
                        // 当前选项已点击
                        // this.toggleColor(false,index);
                            if (index==0) {
                                this.checkDate[6].disable=false;
                                this.checkDate[index+1].disable=false;
                            } else if(index==6) {
                                this.checkDate[0].disable=false;
                                this.checkDate[index-1].disable=false;
                            }else{
                                // if (this.checkDate[index+2].chcked==false) {
                                    this.checkDate[index+1].disable=false;
                                // }
                                // if (this.checkDate[index-2].chcked==false) {
                                    this.checkDate[index-1].disable=false;
                                // } 
                            }  
                    }else{
                        // this.toggleColor(true,index);   
                          // 当前选项未点击
                        console.log(index,"index","dan");

                        if (index==0) {
                            this.checkDate[6].disable=true;
                            this.checkDate[index+1].disable=true;
                        } else if(index==6) {
                            this.checkDate[0].disable=true;
                            this.checkDate[index-1].disable=true;
                        }else{
                            this.checkDate[index-1].disable=true;
                            this.checkDate[index+1].disable=true;
                        }  
                        
                    }
                }


                if(chooseRule==2&&this.checkedArrLength+1> cycle){
                    console.log(this.checkDate,"this.checkDate");
                    console.log(index,"index");
                    if(this.checkDate[index].chcked){
                        this.checkDate[index].chcked=!this.checkDate[index].chcked;
                        // if (this.checkDate[index+2].chcked==false) {
                            this.checkDate[index+1].disable=false;
                        // }
                        // if (this.checkDate[index-2].chcked==false) {
                            this.checkDate[index-1].disable=false;
                        // } 
                    } 
                }
            }
        },
        // toggleColor(state,index){
        //     console.log(index,"index");
            
        //     if (index==0) {
        //         this.checkDate[6].disable=state;
        //         this.checkDate[index+1].disable=state;
        //     } else if(index==6) {
        //         this.checkDate[0].disable=state;
        //         this.checkDate[index-1].disable=state;
        //     }else{
        //         this.checkDate[index-1].disable=state;
        //         this.checkDate[index+1].disable=state;
        //     }  
        // },


        selectHandle(val){
            this.selectVal = val;
        },
        nextHandle(next){
            let beginDate = window.sessionStorage.getItem('selectDate').replace(/-/g,"");
            let weekCount = window.sessionStorage.getItem("weekCount");
            let evaluationId = window.sessionStorage.getItem("evaluationId")
            let advance = this.$route.query?true:false;
            if(next){
                apiSaveCreateSportsPlan(this.code, this.userInfo.userId, evaluationId,beginDate,this.weeklyExerciseDays ,weekCount,advance).then(res=>{
                    this.setCheck('no');
                    this.setCourse(res.courseId)
                    this.$router.replace('/plan')
                })
            }
        },
        changeValue(val) {
            if(val!=this.getDateStr(0)&&val!=this.getDateStr(1)){   
                this.jintian=false;
                this.mingtian=false;
            }else{
                if(val==this.getDateStr(0)){
                    
                    this.jintian=true;
                }
                if(val==this.getDateStr(1)){
                    this.mingtian=true;
                }
            }
             this.$refs.datetime.render()
        },
        add0(v) {
            if (v <= 9) {
                return "0" + v;
            } else {
                return v;
            }
        },
        //  前天： getDateStr(-2);
        //  昨天： getDateStr(-1);
        //  今天： getDateStr(0);
        //  明天： getDateStr(1);
        //  后天： getDateStr(2);
        getDateStr(AddDayCount) {
            var dd = new Date();
            dd.setDate(dd.getDate() + AddDayCount);   //获取AddDayCount天后的日期
            var year = dd.getFullYear();
            var mon = this.add0(dd.getMonth()+1);     //获取当前月份的日期
            var day = this.add0(dd.getDate());
            return year + "-" + mon + "-" + day;
        }
    },

    watch: {
    'checkDate' : {
        handler:function(n) {   //特别注意，不能用箭头函数，箭头函数，this指向全局
            let checkedArr = n.filter(item=>{
                return item.chcked == true
            })
            this.checkedArrLength = checkedArr.length;
            let cycle = parseInt(window.sessionStorage.getItem('cycle')) 
            if (this.checkedArrLength == cycle) {
                this.next = true;
            }else{
                this.next = false;
            }
            this.weeklyExerciseDays = checkedArr.map(item=>{
                return item.day
            })
        },
        deep: true    //深度监听
    }

  }
  }
</script>
<style lang='scss' scoped>
.cycle-wrap{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #f2f2f2;
    .title{
        font-size: 1.2rem;
        color: #252525;
        margin-top: 2.5rem;
        margin-bottom:  .5rem;
        width: 100%;
        text-align: center;
        font-weight: bold;
    }
    .btn{
        width: 13.4rem;
        height: 2.45rem;
        border-radius: 2.5rem;
        border-radius: 2.5rem;
        margin: 2rem auto .3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.05rem;
        background: #FFFFFF ;
        color: #4566EA;
    }
    .active{
        color: #FFFFFF;
        background: #4566EA;
    } 
    .disable{
        color:#CCCCCC;
        background: #EDEDED;
    }
    p{
        width: 100%;
        text-align: center;
        font-size: .6rem;
        color: #606060;
    }
    ul{
        width: 13.4rem;
        margin: 2.3rem auto 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        li{
            width: 2.45rem;
            height: 2.45rem;
            background: #fff;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 1.2rem;
            margin-bottom: 1rem;
            color: #4566EA;
        }
        li:nth-child(4),li:nth-child(5),li:nth-child(6),li:nth-child(7){
            margin-right: 0;  
        }
        li:nth-child(6){
            margin: 0 1.2rem 1rem;
        }
    }
    .next{
        width: 17.15rem;
        height: 2.4rem;
        background: #EDEDED;
        border-radius: 1.25rem;
        border-radius: 1.25rem;
        font-size: .8rem;
        color: #CCCCCC;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        bottom: .8rem;
        left: 50%;
        transform: translateX(-50%);
    }
    .checked{
        background: #4566EA;
        color: #FFFFFF;
    }
}
</style>