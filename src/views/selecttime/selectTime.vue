<template>
  <div class="cycle-wrap">
        <div class="title">开始日期</div>
        <div :class="{'today':jintian,'mingtian':mingtian}">
            <datetime-view  @on-change="changeValue" v-model="value1" :start-date="startDate" :end-date="'2060-12-31'" ref="datetime" :format="format"></datetime-view>
        </div>
        <div class="next checked"  @click="nextHandle">下一步 </div>
  </div>
</template>

<script>
import { DatetimeView } from 'vux'
  export default {
    name:'',
    props:[''],
    data () {
      return {
          startDate:`${new Date().getFullYear()}-${this.add0(
                new Date().getMonth() + 1
            )}-${this.add0(new Date().getDate())}`,
        selectVal:0,
        value1: `${new Date().getFullYear()}-${this.add0(
                new Date().getMonth() + 1
            )}-${this.add0(new Date().getDate())}`,
        format: 'YYYY-MM-DD',
        jintian:true,
        mingtian:false,
        selectDate:`${new Date().getFullYear()}-${this.add0(
                new Date().getMonth() + 1
            )}-${this.add0(new Date().getDate())}`
      };
    },

    components: {
        DatetimeView
    },
    mounted() {
    },

    methods: {
        selectHandle(val){
            this.selectVal = val;
        },
        nextHandle(){
            window.sessionStorage.setItem("selectDate",this.selectDate)
            this.$router.push({
                path:"selectday"
            })
        },
        changeValue(val) {
            this.selectDate = val;
            
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
  }

</script>
<style lang='scss'>
.cycle-wrap{
    .today{
        [data-role="year"] {
            .scroller-indicator:before {
                content: "今天";
                height: 34px;
                line-height: 34px;
                margin-left: 1rem;
                font-size: .95rem;
            }
        }
    }
    .mingtian{
        [data-role="year"] {
            .scroller-indicator:before {
                content: "明天";
                height: 34px;
                line-height: 34px;
                margin-left: 1rem;
                font-size: .95rem;
            }
        }
    }
    .scroller-indicator{
    background: #F2F2F2;
    z-index: -9 !important;
    }
    [data-role="year"] {
        .scroller-item{
            text-align: right ;
            padding-right: .4rem;
        }
        .scroller-item:after {
             content: "年";
        }

    }
    [data-role="month"] {
        .scroller-item{
            text-align: center ;
        } 
        .scroller-item:after {
             content: "月";
        }
    }
    [data-role="day"] {
        .scroller-item{
            text-align: left ;
            padding-left: 1rem;
        }
        .scroller-item:after {
             content: "日";
        }
    }
}
</style>
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
        margin-bottom:  4.5rem;
        width: 100%;
        text-align: center;
        background: #f2f2f2;
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
    p{
        width: 100%;
        text-align: center;
        font-size: .6rem;
        color: #606060;
        margin-bottom: 2rem;
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