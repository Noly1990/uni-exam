<template>
	<view class="timer-box">
		
		<view class="date-time">
			{{dateString}}
		</view>
		<view class="count-time">
			{{minute}}:{{second}}
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				minute: 0,
				second: 0,
				dateString: "2018年9月20日 星期四",
				remainSeconds: 3000, //剩余时间  3000
				intervalFlag: null,
			}
		},
		props: {
			time: Number
		},
		beforeMount() {
			this.beginToCount(this.time)
			this.setDateString()
		},
		methods: {
			stopCount() {
				clearInterval(this.intervalFlag)
			},
			beginToCount(seconds) {
				this.stopCount()
				this.remainSeconds = seconds;
				this.convertSecondsDisplay()
				this.intervalFlag = setInterval(() => {
					this.remainSeconds--
					if (this.remainSeconds <= 0) {
						this.stopCount()
						alert('时间到')
					}
					this.convertSecondsDisplay()
				}, 1000)
			},
			convertSecondsDisplay() {
				let second = this.remainSeconds % 60;
				if (second < 10) {
					this.second = `0${second}`;
				} else {
					this.second = second.toString()
				}
				this.minute = Math.floor(this.remainSeconds / 60)
			},
			setDateString() {
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				let week = date.getDay();
				let weekString;
				switch (week) {
					case 0:
						weekString = "天";
						break;
					case 1:
						weekString = "一";
						break;
					case 2:
						weekString = "二";
						break;
					case 3:
						weekString = "三";
						break;
					case 4:
						weekString = "四";
						break;
					case 5:
						weekString = "五";
						break;
					case 6:
						weekString = "六";
						break;
					default:
						break;
				}
				this.dateString = `${year}年${month}月${day}日 星期${weekString}`
			}
		},
		beforeDestroy() {
			this.stopCount()
		}
	}
</script>

<style>
	.timer-box {
		margin: 20upx;
		padding-left: 20upx;
		padding-right: 20upx;
	}
	.date-time {
		float: left;
		
	}
	.count-time {
		float: right;
		color: red;
		font-weight: bold;
	}
</style>
