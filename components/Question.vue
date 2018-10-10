<template>
	<view class="question-box">
		<view class="question-title">
			<!-- <text class="title-index">第{{questionObj.qindex}}题：</text> -->
			<text>{{questionObj.qtitle}}</text>
		</view>
		<view class="answer-box">
			<view :class="item.className" @click="clickOption(item.index)" class="answer-item" v-for="item in optionArr" :key="item.index">
				<view v-if="item.show">
					{{item.face}}:{{item.title}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import QCBus from '../utils/QCbus.js'
	export default {
		data() {
			return {
				questionObj:{
					qindex:1,
					qid:2,
					qtitle:''
				},
				optionArr: [{
						index:1,
						face: 'A',
						show: false,
						title: '答案A',
						className:''
					},
					{	
						index:2,
						face: 'B',
						show: false,
						title: '答案B',
						className:''
					},
					{	
						index:3,
						face: 'C',
						show: false,
						title: '答案C',
						className:''
					},
					{
						index:4,
						face: 'D',
						show: false,
						title: '答案D',
						className:''
					},
				]
			}
		},
		props: {
			qid:String,
			index:Number,
			scene:String
		},
		beforeMount(){
			this.getQuestion(this.qid)
		},
		watch:{
			qid:function(n,o){
				if (n!==o) {
					this.getQuestion(n)
				}
			},
			index:function(n,o){
				if (n!==o) {
					this.questionObj.qindex = n
				}
			},
		},
		methods:{
			...mapMutations(['addDoneCount']),
			getQuestion(qid){
				this.resetMark()
				if (this.$exam.checkIfCached(qid)) {
					console.log('命中缓存')
					let questionObj = this.$exam.getQuestion(qid);
					this.receiveQuestion(questionObj);
					return
				}
				console.log(qid)
				switch (this.scene){
					case 'practice':
						break;
					case 'mock':
						break;
					case 'exam':
						break;
					default:
						break;
				}
				uni.request({
					method:"GET",
					url:this.$baseUrl+'/api/exercise/getQuestionById',
					data:{
						questionId:qid
					},
					success:(data)=>{
						if (data.data.status == 200) {
							let questionObj = data.data.data;
							this.receiveQuestion(questionObj);
							this.cacheNextQuestion()
							
						} else {
							
						}
					},
					fail:function(err){
						console.log(err)
					}
				})
				
			},
			cacheNextQuestion(){
				let nextId = this.$exam.getQuestionIdByIndex(this.index+1);
				console.log(`next Id is ${nextId}`)
				uni.request({
					method:"GET",
					url:this.$baseUrl+'/api/exercise/getQuestionById',
					data:{
						questionId:nextId
					},
					success:(data)=>{
						if (data.data.status == 200) {
							let questionObj = data.data.data;
							this.$exam.cacheQuestion(questionObj);
							
						} else {
							
						}
					},
					fail:function(err){
						console.log(err)
					}
				})
			},
			receiveQuestion(questionObj){
				let qid = questionObj.questionId;
				this.questionObj.qtitle = questionObj.questionTitle;
				this.$exam.cacheQuestion(questionObj);
				
				if (questionObj.optionA) {
					this.optionArr[0].show = true;
					this.optionArr[0].title = questionObj.optionA
					this.optionArr[0].className = ''
				}
				if (questionObj.optionB) {
					this.optionArr[1].show = true;
					this.optionArr[1].title = questionObj.optionB
					this.optionArr[1].className = ''
				}
				if (questionObj.optionC) {
					this.optionArr[2].show = true;
					this.optionArr[2].title = questionObj.optionC
					this.optionArr[2].className = ''
				}
				if (questionObj.optionD) {
					this.optionArr[3].show = true;
					this.optionArr[3].title = questionObj.optionD
					this.optionArr[3].className = ''
				}
				if (this.$exam.checkAnswer(qid)) {
					let answer = this.$exam.answerMap[qid]
					switch (answer.answerType) {
						case 'done':
							this.markDone(answer.selection)
							break;
						case 'right':
							this.markRight(answer.rightIndex)
							break;
						case 'wrong':
						this.markRight(answer.rightIndex)
						this.markWrong(answer.wrongIndex)
							break;
						default:
						console.log('sth wrong')
							break;
					}
				}
			},
			clickOption(index){
				this.resetMark()
				console.info(index)
				if (!this.$exam.checkAnswer(this.qid)) {
					this.addDoneCount()
				}
				switch (this.scene){
					case 'practice':
					uni.request({
						method:"GET",
						url:this.$baseUrl+'/api/exercise/checkAnswer',
						data:{
							questionId:this.qid,
							userOption:index
						},
						success:(res)=>{
							if (res.data.status == 200) {
								let result = res.data.data;
								if (result.result > 0) {
									console.log('right')
									this.markRight(index)
									this.$exam.markRight(this.qid,index)
									setTimeout(()=>{
										this.$emit('right-next')
									},1000)
									
									
								} else {
									console.log('wrong')
									
									this.markRight(result.rightAnswer)
									this.markWrong(index)
									this.$exam.markWrong(this.qid,result.rightAnswer,index)
								}
							}
						}
					})
						break;
					case 'mock':
					
						break;
					case 'exam':
					
						break;
					default:
						break;
				}
			},
			resetMark(){
				this.optionArr.forEach(item=>{
					item.className = ''
				})
			},
			markRight(index){
				this.optionArr[index-1].className = 'answer-green'
				QCBus.$emit('mark-right',{
					index:this.index
				})
			},
			markWrong(index){
				this.optionArr[index-1].className = 'answer-red'
				QCBus.$emit('mark-wrong',{
					index:this.index
				})
			},
			markDone(index){
				this.optionArr[index-1].className = 'answer-blue'
				QCBus.$emit('mark-done',{
					index:this.index
				})
			}
		}
	}
</script>

<style>
	.question-box {
		width: 90%;
		margin: 0 auto;
		padding: 20upx;
		margin-bottom: 120upx;
	}
	.question-title {
		min-height: 100upx;
	}
	.title-index {
		font-weight: bold;
	}

	
	.answer-item {
		font-size: 22 px;
		background-color: #EEE;
		padding: 20upx;
		margin: 20upx;
		border-radius: 15upx;
	}
	.answer-blue {
		background-color: #70D7FF;
	}
	.answer-green {
		background-color: #71FF73;
	}
	.answer-red {
		background-color: #FF5959;
	}
</style>
