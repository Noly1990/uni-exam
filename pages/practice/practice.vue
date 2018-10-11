<template>
	<view class="practice-box">
		<Ques @right-next="rightNext" scene="practice" :qid="recentQid" :index="recentIndex" />
		<view @click="previousOne()" class="controller-left">
			<image class="left-img" src="../../static/img/left.png" mode="aspectFit"></image>
		</view>
		<view @click="nextOne()" class="controller-right">
			<image class="right-img" src="../../static/img/right.png" mode="aspectFit"></image>
		</view>
		<Bview @reach-bottom="loadMore" @index-click="bottomIndexClick" :count="quesCount" />
	</view>
</template>

<script>
	import Ques from '../../components/Question.vue'
	import QCbus from '../../utils/QCbus.js'
	import Bview from '../../components/BottomView.vue'
	export default {
		data() {
			return {
				page: 1,
				recentIndex: 1,
				questionArr: [],
				quesCount: 0,
				moreLock:false,
				totalQues:0
			}
		},
		computed: {
			recentQid() {
				return this.questionArr[this.recentIndex-1]
			}
		},
		beforeMount() {
			uni.showLoading({
				title: '试题加载中',
				mask:true
			});
			let startTime = new Date().getTime()
			this.getQuestionByPage().then(res => {
				if (res) {
					let data = res;
					let total = data.count;
					// 在控制器中设置所有题目的总和
					console.log(total)
					this.$exam.totalQues = total;
					this.totalQues = total;
					this.maxPage = Math.ceil(total / 100);
					let quesArr = data.questionList;
					this.formatQuesArr(quesArr)
					uni.hideLoading();
					let endTime = new Date().getTime()
					let deffer = endTime- startTime
					console.log(deffer)
				}
			})
		},
		components: {
			Ques,
			Bview
		},
		methods: {
			rightNext(){
				this.nextOne()
			},
			loadMore() {
				this.page++;
				if (this.page > this.maxPage) {
					if (!this.moreLock) {
						uni.showToast({
							title: '没有更多的题目',
							duration: 2000
						});
						this.moreLock = true
					}
					
					
				} else {
					uni.showLoading({
						title: '加载更多试题'
					});
					this.getQuestionByPage().then(res => {
						if (res) {
							console.log('获取更多试题')
							// 在控制器中设置所有题目的总和
							let quesArr = res.questionList;
							this.formatQuesArr(quesArr)
							uni.hideLoading();
						}
					})
				}
			},
			bottomIndexClick(data) {
				console.log('bottom-click', data.index)
				this.recentIndex = data.index
			},
			formatQuesArr(quesArr) {
				let newQuesArr = [];
				// 强制按question_id排序
				quesArr.sort((a, b) => {
					return a.question_id - b.question_id;
				});
				quesArr.forEach(item => {
					newQuesArr.push(item.question_id);
					this.$exam.setUserOptionForPrac(item.question_id, item.user_option);
					if (item.user_option > 0) {
						setTimeout(() => {
							QCbus.$emit("answer-done-id", {
								qid: item.question_id
							});
						}, 0);
					}

				});

				this.questionArr = this.questionArr.concat(newQuesArr);
				this.quesCount = this.questionArr.length
				this.$exam.appendMoreIntoArr(newQuesArr);
			},
			getQuestionByPage() {
				return new Promise((resolve, reject) => {
					uni.request({
						method: "GET",
						url: this.$baseUrl + '/api/exercise/getQuestionsByPage',
						data: {
							page: this.page,
							row: 100
						},
						success: (res) => {
							if (res.data.status == 200) {
								resolve(res.data.data)
							} else {
								reject(false)
							}
						},
						fail: (err) => {
							reject(false)
						}
					})
				})

			},
			previousOne() {
				console.log('点击上一题')
				if (this.recentIndex > 1) {
					this.recentIndex--
				} else {
					uni.showToast({
						title:'第一题',
						duration:2000
					})
				}
			},
			nextOne() {
				console.log('点击下一题')
				if (this.recentIndex > this.questionArr.length-5 && this.recentIndex < this.questionArr.length) {
					if (this.questionArr.length === this.totalQues) {
						this.recentIndex ++
					} else {
						this.loadMore()
					}
				} else if (this.recentIndex < this.questionArr.length) {
					this.recentIndex++
				} else {
					uni.showToast({
						title:'已经是最后一题',
						duration:2000
					})
				}
			}
		}
	}
</script>

<style scoped>
	.practice-box {
		position: relative;
		width: 100%;
	}

	.controller-left {
		position: fixed;
		left: 10upx;
		top: 65%;
		width: 100upx;
		height: 100upx;
		background-color: #DDD;
		border-radius: 50%;
	}

	.controller-right {
		position: fixed;
		right: 10upx;
		top: 65%;
		width: 100upx;
		height: 100upx;
		background-color: #DDD;
		border-radius: 50%;
	}
	.left-img {
		width: 100upx;
		height: 100upx;
	}
	.right-img {
		width: 100upx;
		height: 100upx;
	}
</style>
