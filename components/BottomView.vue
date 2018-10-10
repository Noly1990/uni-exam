<template>
	<view class="bottom-view-box" :class="{'view-open':isOpen}">
		<view @click="headerClick()" class="bottom-view-header">
			<text class="bottom-view-header-right-text">{{doneCount}}/{{count}}</text>
			<view class="bottom-view-header-right">
				<image class="bottom-view-header-right-icon" src="../../static/img/toge.png" mode="aspectFit"></image>
			</view>
		</view>
		<view class="bottom-view-content">
			<scroll-view scroll-y class="scroll-box" @scrolltolower="reachLower">
				<view class="item-box">
					<view @click="indexClick(item)" :class="indexClassMap[item+1]" v-for="item in count" class="scroll-item default-item"
					 :key="item">
						{{item+1}}
					</view>
				</view>
			</scroll-view>
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
				isOpen: false,
				indexClassMap: {}
			}
		},
		computed:{
			...mapState(['doneCount'])
		},
		props: {
			count: Number,
			scene:String,
		},
		beforeMount() {
		},
		methods: {
			wrongWithImg(err){
				console.log(err)
			},
			headerClick() {

				this.isOpen = !this.isOpen
			},
			reachLower() {
				console.log('触底反弹');
				this.$emit('reach-bottom', {
					count: this.count
				})
			},
			indexClick(index) {
				console.log(index)
				this.$emit('index-click', {
					index: index
				})
			},
			markIndexDone(index) {
				this.indexClassMap[index] = 'done-item'
				this.$forceUpdate()
			},
			markIndexRight(index) {
				this.indexClassMap[index] = 'right-item'
				this.$forceUpdate()
			},
			markIndexWrong(index) {
				this.indexClassMap[index] = 'wrong-item'
				this.$forceUpdate()
			},
		},

		beforeDestroy() {
			console.log('bottom-view destroyed')

		},
		onShow() {
			console.log('bottom-view-show')
		},
		onHide() {
			console.log('bottom-view-show')
		},
		onLoad() {
			console.log('bottom-view-load')
			QCBus.$on('mark-done', (data) => {
				this.markIndexDone(data.index)
			})
			QCBus.$on('mark-right', (data) => {
				this.markIndexRight(data.index);
			})
			QCBus.$on('mark-wrong', (data) => {
				this.markIndexWrong(data.index)
			})
		},
		onUnload() {
			console.log('bottom-view-unload')

		}
	}
</script>

<style scoped>
	.bottom-view-box {
		width: 750upx;
		height: 600upx;
		position: fixed;
		bottom: -510upx;
		transition: bottom 0.3s;
		z-index: 10;
		background-color: #EEE;
	}

	.bottom-view-header {
		width: 750upx;
		height: 90upx;
		background-color: #E4E4E4;
		border-top: 1px solid #CCC;
		border-bottom: 1px solid #CCC;
	}
	.bottom-view-header-right {
		float: right;
		width: 90upx;
		height: 90upx;
	}
	.bottom-view-header-right-icon {
		width: 60upx;
		height: 60upx;
		padding: 15upx;
	}
	.bottom-view-header-right-text {
		text-align: center;
		display: block;
		float: right;
		width: 120upx;
		line-height: 90upx;
		font-size: 24px;
	}
	.bottom-view-content {
		margin: 0 25upx;
	}

	.view-open {
		bottom: 0upx;
	}

	.scroll-item {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
		text-align: center;
		line-height: 100upx;
		float: left;
	}

	.default-item {
		background-color: #DDDDDD;
	}

	.done-item {
		background-color: #70D7FF;
	}

	.right-item {
		background-color: #71FF73;
	}

	.wrong-item {
		background-color: #FF5959;
	}

	.scroll-box {
		height: 510upx;
	}
</style>
