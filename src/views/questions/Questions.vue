<template>
	<div class="questions_warp">
		<div class="progress">
			<span>{{questIndex}}</span>
			<div class="progress_box">
				<div class="progress_content" :style="'width:'+progress()+'%'"></div>
			</div>
			<span class="quest_num">{{questCount}}</span>
		</div>
		<div class="questions_contents" v-for="(item,index) in qsList" :key="index" v-show="index==questIndex-1">
			<div class="question">{{item.questionContent}}</div>
			<ul class="answer single" >
				<!--  @touchmove.prevent-->
				<li  :class="{'active':userOptions.length&&userOptions[questIndex-1].optionCodes&&userOptions[questIndex-1].optionCodes.includes(`${index}`)}" v-for="(val,index) in item.options" :key="index" @click="checkedItem(index,item.questionCode,item.questionType,index,val.unique,item)">
					<div class="num">{{toggleNum(index)}}</div>
					<div :class="{'checkbox_botn':item.questionType==2?true:false}">
						<div>{{val.optionContent}}</div>
						<div >{{val.remark}}</div>
						<div  v-show="item.questionType==2?true:false" class="checked_btn"></div>
						
					</div>
				</li>
			</ul>
		</div>
		<div class="btn_wrap">
			<div class="upper" @click="before"  :class="{'visib':questIndex==1}">上一题</div>
			<div  :class="[{'next':nextUp},'unnext']" @click="next"  v-show="questIndex!=questCount">下一题</div>
			<div :class="[{'next':nextUp},'unnext']"  v-show="questIndex==questCount" @click="goto(nextUp)">完成测评</div>
		</div>
	</div>
</template>

<script>
//获取评测题
import {
	apiGetevaluationQuestions,
	apiSaveevaluationQuestions
} from '@/service/api'
import { Popup } from 'mint-ui';
import {  getStorage} from '@/assets/js/util.js'
import { mapState, mapMutations} from 'vuex'
export default {
		data(){
			return {
				
				popupTips:true, // 进入页面的提示弹框
				toggleModal:true,
				isCheckbox:true,// 当是true问答是多选
				qsList:[],//问题列表
				questCount:0,
				questIndex:1,
				userOptions:new Array(14).fill({
					optionCodes:[]
				}),//选中的问题放进数组，进行对应查找
				itemOptions:[],//每一项题的选择的选项
				onlyEd:false,//选中了唯一的相信
				// n:"",
				nextUp:false,//控制下一步按钮的颜色，如果是true代表可以提交
				quesBankId:"",//评测题的id
			}
		},
		components: {
			"mtPopup":Popup 
		},
        computed: {
            ...mapState(['code', 'userInfo', 'courseKind','buildId']),
        },
		methods:{
			 ...mapMutations(["setEvaluationId"]),
			progress(){
				return (this.questIndex/this.questCount)*100
			},
			goto(nextUp){
				//nextUp 已经选中，可以提交 生成报告。
				if(nextUp){

					// 重新拼装评测题的编码
					var arrend=[]
					var arrstart=[]
					this.qsList.some((item)=>{
						this.userOptions.some((val)=>{
							if(val.questionCode==item.questionCode){
								arrstart=[]
								val.optionCodes.some((it)=>{
									arrstart.push(item.options[it].optionCode)	
								})
								arrend.push({"questionCode":val.questionCode,optionCodes:arrstart,"questionClassify":item.questionClassify});
							}
						})
					})
					let user ={...getStorage('session', 'userInfo')}
					apiSaveevaluationQuestions(this.courseKind, {...getStorage('session', 'userInfo'),'birthday':user.birthday.replace(/-/g, '')}, this.userInfo.userId,this.buildId,arrend).then(res => {
						if (res.retCode == "SUCCESS") {
							window.sessionStorage.setItem("weekCount",res.weekCountOptions[0].weekCount)
							this.setEvaluationId(res.evaluationId);  
							window.sessionStorage.setItem("evaluationId",res.evaluationId)
							window.sessionStorage.setItem("weeklyExerciseFrequencies",JSON.stringify(res.weeklyExerciseFrequencies))
							if (res.weeklyExerciseFrequencies.length==1) {
								window.sessionStorage.setItem("cycle",res.weeklyExerciseFrequencies[0].weeklyExerciseDayCount)
								window.sessionStorage.setItem("chooseRule",res.weeklyExerciseFrequencies[0].chooseRule)
								this.$router.push({ path:"/selecttime"})
							}else{		
								this.$router.push({ path:"/cycle"})
							}	
						}
					})
				}
			},
			nextBtn(){
				//检验当前题有无选中，如果有，可下一步按钮蓝色。
				if(this.userOptions[this.questIndex-1].optionCodes&&this.userOptions[this.questIndex-1].optionCodes.length){
					this.nextUp=true
				}else{
					this.nextUp=false
				}
			},
			toggleNum(n){
				return ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"].map(item=>{
					return item+"."
				})[n];	
			},
			// 下一题
			next(){
				if(this.questIndex==this.questCount) return
			
				// this.userOptions[this.questIndex-1].optionCodes.length结果结合里有数据，可以提交
			
				if(this.userOptions[this.questIndex-1].optionCodes.length){
					this.userOptions[this.questIndex]={
						// questionCode,
						optionCodes:[]
					}
				// if( this.$store.getters.moduleCode=="HEALTH_FPFX"&&this.questIndex==6&&this.userOptions[5]&&this.userOptions[5].optionCodes.indexOf("1")!=-1){
				// 	this.questIndex=8;
				// }
					this.questIndex++;
					this.itemOptions=[];
				}
				this.$forceUpdate();
				this.nextBtn()
				
			},
			// 上一题
			before(){
				if(this.questIndex==1) return
				if(this.$store.getters.moduleCode=="HEALTH_FPFX"&&this.questIndex==9&&this.userOptions[5]&&this.userOptions[5].optionCodes.indexOf("1")!=-1){
					this.questIndex=7;
					
				}
				this.questIndex--;
				// this.userOptions.pop()
				// this.itemOptions=[]
				this.$forceUpdate();
				this.nextBtn()
			},
			//选择选项
			checkedItem(num,questionCode,questionType,index,unique,item){
				
				// 当传进来的是questionType是1表示单选， 当传进来的是questionType是2表示多选，
				// num 表示选择第几个选项
				// index表示选择第几个题
				// questionCode表示问题题号
				// unique 表示如果选次选，其他项目自动不选
				//item 代表选中这一对象，里面带着全部信息
				// userOptions=[{questionCode: "4", optionCodes: ["1"]},{questionCode: "2", optionCodes: ["1","2"]}]
			
				if(questionType==1){
					// 单选
					this.itemOptions.push(`${index}`)
					this.userOptions[this.questIndex-1]={
						questionCode,
						optionCodes:this.itemOptions
					}
					this.itemOptions=[]
				}
				if(questionType==2){
                   
					//多选里面最多只能有一个是unique: true，找到这个选项的位置
					var rel = item.options.filter((e,index)=>{
						if(e.unique=="true") {
							return  index
						}
					})
				if(rel!=""){
					if(this.userOptions[this.questIndex-1].optionCodes&&this.userOptions[this.questIndex-1].optionCodes.indexOf(`${rel[0].optionCode-1}`)!=-1){
							console.log(this.userOptions[this.questIndex-1].optionCodes,2);
						this.userOptions[this.questIndex-1].optionCodes=[];
						this.$forceUpdate();
					}
				}
					

					// 多选
					// 点击选项
					if(this.userOptions[this.questIndex-1].optionCodes.indexOf(`${index}`)!==-1){
						
						// 当之前选中
						// 删除之前选中的那项
						if(unique=="true"){
								// this.n=`${index}`
								this.onlyEd=!this.onlyEd;
								this.userOptions[this.questIndex-1].optionCodes=[];
								this.userOptions[this.questIndex-1].optionCodes.push(`${index}`)
						}
						this.userOptions[this.questIndex-1].optionCodes.splice(this.userOptions[this.questIndex-1].optionCodes.indexOf(`${index}`),1)
						this.$forceUpdate()
					}else{
						
						// this.itemOptions.splice(this.itemOptions.indexOf(this.n),1 )
						// 当之前没选中
							this.userOptions[this.questIndex-1].optionCodes.push(`${index}`)
							this.userOptions[this.questIndex-1]={
								questionCode,
								optionCodes:this.userOptions[this.questIndex-1].optionCodes,
							}
						if(unique=="true"){
								this.onlyEd=!this.onlyEd;
								this.userOptions[this.questIndex-1].optionCodes=[];
								this.userOptions[this.questIndex-1].optionCodes.push(`${index}`)
						}else{
							this.onlyEd=!this.onlyEd;
						}
					}
				}
				this.$forceUpdate();
				this.nextBtn();
			}
		},
		created(){
   			let user ={...getStorage('session', 'userInfo')}
			apiGetevaluationQuestions(this.courseKind, {...getStorage('session', 'userInfo'),'birthday':user.birthday.replace(/-/g, '')}, this.userInfo.userId,this.buildId).then(res => {
                if (res.retCode == "SUCCESS") {
					this.qsList = res.quesOptions;
					this.questCount=res.quesOptions.length;
					this.quesBankId=res.quesBankId;
                }
			})
		}
	};
</script>

<style lang="scss" scope>
.questions_warp{
	width: 100%;
	height: 100%;
	background:#f2f2f2;
	.pass{
		width: 100%;
		height: 2.2rem;
		background: #E9EEF9;
		padding: 0 .8rem;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		top: 0;
		.pass_text{
			font-size: .7rem;
			color: #4C65E2;
		}
		.pass_jt{
			width: .8rem;
			height: .8rem;
			// background: url('../../assets/evaluation/jt.png') no-repeat;
			// background-size: 100% 100%;
		}
	}
	.progress{
		position: fixed;
		// top:2.2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		box-sizing: border-box;
		color: #406BDD;
		font-size: .7rem;
		padding: .8rem .8rem .6rem;
		// background: #f2f2f2;
		.progress_box{
			width: 14.7rem;
			height: .25rem;
			background: #fff;
			box-shadow:0 6px 14px 0 rgba(0,0,0,0.05);
			border-radius: .125rem;
			position: relative;

			.progress_content{
				position:absolute;
				left: 0;
				top: 0;
				height: 100%;
				background: #406BDD;
				border-radius: .125rem;
			}
		}
		.quest_num{
			color: #ccc;
		}
	}
	.questions_contents{
		overflow-x: hidden;
		overflow-y: scroll;
		width: 17.15rem;
		background: #FFFFFF;
		box-shadow: 0 4px 32px 0 rgba(0,0,0,0.05);
		border-radius: .3rem;
		margin: 0 auto;
		padding: 1.3rem .9rem 2rem;
		box-sizing: border-box;
		position: fixed;
		top:2.2rem;
		left: .8rem;
		bottom: 3.8rem;
		.question{
			font-size: 1.1rem;
			color: #252525;
			margin-bottom: 1.5rem;
			font-weight: 700;
		}
		.single{
			font-size: .75rem;
			color: #606060;
			.num{
				height: 1rem;
				line-height: 1rem;
				width: 1rem;
			}
			li{
				display: flex;
				align-items: flex-start;
				margin-bottom: .2rem;
				padding: .4rem;
				border-radius: .1rem;
				.checkbox_botn{
					flex: 1;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				.checked_btn{
					width: .8rem;
					min-width: .8rem;
					margin-left: .4rem;
					height: .8rem;
					// background: url('../../assets/evaluation/bg_unchecked.png') no-repeat;
					// background-size: 100% 100%;
				}
			}
			div{
				vertical-align: top;
				font-size: .75rem;
			}
			.active{
				background: rgba(69,102,234,0.1);
				color: #406BDD;
				.checked_btn{
					width: .8rem;
					min-width: .8rem;
					margin-left: .4rem;
					height: .8rem;
					// background: url('../../assets/evaluation/bg_checked.png') no-repeat;
					// background-size: 100% 100%;
				}
			}
		}
	}
	.btn_wrap{
		width: 17.15rem;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		position: fixed;
		bottom: .6rem;
		left: .8rem;
		div{
			width: 5rem;
			line-height: 2.4rem;
			font-size: .8rem;
			text-align: center;
			background:  #4566EA;
			border-radius: 1.2rem;
		}
		.upper{
			background: #FFFFFF;
			box-shadow: 0 6px 14px 0 rgba(0,0,0,0.05);
			border-radius: 1.2rem;
			color: #606060;
		}
		.unnext{
			background:#EDEDED;
			color: #ccc;
			box-shadow: 0 -2px 4px 0 rgba(236,236,236,0.50);
			border-radius: 1.2rem;
		}
		.next{
			background: #4566EA;
			color: #fff
		}

		.visib{
			visibility:hidden;
		}
	}
	// 提示框样式
	.mint-popup{
	width: 15rem;
	height: auto;
	background: #fff;
	border-radius: .3rem;
	}
	.popup_font{
		width: 12.95rem;
		margin: 2rem auto 1.5rem;
		font-size: .8rem;
		color: #333333;
		text-align: center;
		font-weight: bold;
	}
	.popup_btn{
		width: 11.95rem;
		height: 1.7rem;
		line-height: 1.7rem;
		text-align: center;
		background: #406BDD;
		color: #fff;
		border-radius: .8rem;
		margin:0 auto 1.5rem;
		font-size: .8rem;
	}
}
</style>