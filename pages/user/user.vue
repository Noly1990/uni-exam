<template>
	<view class="content">
		<view class="user-info">
			<view class="user-info-item">
				姓名：{{realName}}（{{userNum}}）
				<image v-if="sex>0" class="sex-img" src="../../static/img/male.png" mode="widthFix"></image>
				<image v-else class="sex-img" src="../../static/img/female.png" mode="widthFix"></image>
			</view>
			<view class="user-info-item">
				院系：{{deptMap[academyId]}}/{{deptMap[gradeId]}}/{{deptMap[classId]}}
			</view>
		</view>
		<view class="user-score">
			<scroll-view scroll-y class="score-scroll-box">
				<view v-for="item in recordsArr" :key="item.reportId" class="score-item-box">
					<view class="time-text">
						{{item.time}}-{{item.status}}
					</view>
					<view class="score-text">
						分数:{{item.score}}
					</view>
					<view :class="item.result>0?'base-text pass-text':'base-text fail-text'">
						{{item.result>0?'通过':"未通过"}}
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="btn-row">
			<button type="warn" @tap="bindLogin" size="mini">登录</button>
		</view>
	</view>
</template>

<script>
	import {
		secondsToDateString
	} from '../../utils/dateTools.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		data() {
			return {
				recordsArr: [],
				resultMap: {},
				deptMap: {}
			}
		},

		beforeMount() {
			this.getExamResult()
			this.turnToMap(this.deptArr)
		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'sex', 'deptArr','realName','userNum','academyId','gradeId','classId'])
		},
		methods: {
			...mapMutations(['logout']),
			bindLogin() {
				uni.navigateTo({
					url: '../login/login',
				});
			},
			bindLogout() {
				this.logout();
				/**
				 * 如果需要强制登录跳转回登录页面
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../login/login',
					});
				}
			},
			turnToMap(deptArr) {
				this.deptMap = {};
				deptArr.forEach(item => {
					this.deptMap[item.deptId] = item.deptName;
				});
			},
			getExamResult() {
				uni.request({
					method: "GET",
					url: this.$baseUrl + '/api/manage/queryMyAllReports',
					success: (res) => {
						if (res.data.status == 200) {
							console.log("个人成绩", res.data.status);
							let resultArr = res.data.data;
							this.formatExamResult(resultArr);
							this.rowData = resultArr;
						}
					}
				})
			},
			formatExamResult(resultArr) {
				this.recordsArr = [];
				resultArr.forEach(item => {
					let temp = {};
					temp.score = item.userScore;
					temp.result = item.resultState;
					temp.time = secondsToDateString(item.startTime);
					temp.status = item.examState > 0 ? "已结束" : "考试中";
					temp.reportId = item.reportId;
					this.resultMap[item.reportId] = item;
					this.recordsArr.push(temp);
				});
			},
		},

	}
</script>

<style scoped>
	.content {
		background-color: #DEDEDE;
	}

	.score-scroll-box {
		height: 600upx;
		background-color: #EEEEEE;
	}



	.user-info {
		display: flex;
		flex-direction: column;
	}

	.user-info-item:first-of-type {
		margin-top: 10upx;
	}

	.user-info-item {
		height: 90upx;
		background-color: #FAFAFA;
		margin-bottom: 10upx;
		line-height: 90upx;
		padding-left: 40upx;
		font-size: 26px;
	}

	.sex-img {
		display: block;
		height: 50upx;
		width: 50upx;
		padding: 20upx;
		float: right;
	}

	.score-item-box {
		margin: 20upx;
		font-size: 24px;
		padding: 10upx 15upx;
		background-color: #FFFFFF;
		border-radius: 10upx;

	}

	.base-text {
		position: relative;
		top: -30upx;
		font-weight: bold;
		float: right;
	}

	.pass-text {
		color: #71FF73;

	}

	.fail-text {
		color: #FF5959;
	}

	.time-text {
		color: #C8C7CC;
	}
</style>
