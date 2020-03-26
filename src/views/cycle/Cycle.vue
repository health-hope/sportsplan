<template>
  <div class="cycle-wrap">
        <div class="title">运动时长及频次</div>
        <div v-for="(item , i) in weeklyExerciseFrequencies" :key="i">
            <div class="btn" :class="selectVal==item.weeklyExerciseDayCount?'active':''" @click="selectHandle(item.weeklyExerciseDayCount,item.chooseRule)">{{item.weeklyExerciseDayCount}}次/周</div>
            <p v-if="item.remark">{{item.remark}}</p>
        </div>

        <!-- <div class="btn" :class="selectVal==6?'active':''" @click="selectHandle(6)">6次/周</div>
        <p>根据您的测评结果推荐此项</p> -->
        <div class="next" :class="selectVal!=0?'checked':''"  @click="nextHandle">下一步 </div>
  </div>
</template>

<script>

  export default {
    name:'',
    props:[''],
    data () {
      return {
          selectVal:6,
          weeklyExerciseFrequencies:{}
      };
    },
    created(){
        let chooseRule = JSON.parse(window.sessionStorage.getItem("weeklyExerciseFrequencies"));
        if (chooseRule.length==1) {					
            this.$router.push({ path:"/selecttime"})
        }
    },
    mounted() {
        // 推荐的默认选中，而且在第一个显示。
        let oldArr = JSON.parse(window.sessionStorage.getItem("weeklyExerciseFrequencies"));
        let newArr = [];
        oldArr.forEach(item  => {
            if (item.recommend) {
                newArr[0]=item;
                this.selectVal = item.weeklyExerciseDayCount;
                window.sessionStorage.setItem("chooseRule",item.chooseRule);
            }else{
                newArr[1]=item;
            }
        });
        this.weeklyExerciseFrequencies = newArr;

    },

    methods: {
        selectHandle(val,chooseRule){
            this.selectVal = val;
            window.sessionStorage.setItem("chooseRule",chooseRule);
        },
        nextHandle(){
            window.sessionStorage.setItem('cycle',this.selectVal)
            if(this.selectVal != 0){
                this.$router.push({
                  path:"selecttime"
                })
            }
        }
    },

    watch: {}

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