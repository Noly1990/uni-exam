<template>
	<view class="content">
		<view class="select-box">
			<view @click="gotoPractice()" class="select-item">
				<image class="item-img" src="../../static/img/qq.png" mode="widthFix"></image><br>
				顺序练习
			</view>
			<view @click="gotoMock()" class="select-item">
				<image class="item-img" src="../../static/img/qq.png" mode="widthFix"></image><br>
				模拟考试
			</view>
			<view @click="gotoFormal()" class="select-item">
				<image class="item-img" src="../../static/img/qq.png" mode="widthFix"></image><br>
				正式考试
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		beforeMount() {
			console.log('main-mouted')
			this.getDept()
		},
		methods: {
			...mapMutations(['saveDeptArr']),
			getDept() {
				uni.request({
					method: "GET",
					url: this.$baseUrl + '/api/manage/getDeptNodes',
					success: (res) => {
						if (res.data.status == 200) {
							console.log('获取部门信息成功')
							this.saveDeptArr(res.data.data)
						}
					}
				})
			},
			gotoPractice() {
				uni.navigateTo({
					url: '../practice/practice'
				})
			},
			gotoMock() {
				uni.navigateTo({
					url: '../mock/mock'
				})
			},
			gotoFormal() {
				uni.navigateTo({
					url: '../formal/formal'
				})
			},
		},
		onLoad() {

		}
	}
</script>

<style scoped>
	.content {
		background-color: #DEDEDE;
	}

	.hello {
		display: flex;
		flex: 1;
		flex-direction: column;
	}

	.title {
		color: #8f8f94;
		margin-top: 50px;
	}

	.ul {
		font-size: 30px;
		color: #8f8f94;
		margin-top: 50px;
	}

	.ul>view {
		line-height: 50px;
	}

	.select-box {
		display: flex;
		text-align: center;
		flex-direction: column;
	}

	.select-item {
		height: 230upx;
		background-color: white;
		border-radius: 10upx;
		margin: 20upx 100upx;
		padding-top: 15upx;
	}

	.item-img {
		width: 120upx;
	}
</style>
