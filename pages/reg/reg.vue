<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">学号：</text>
				<input type="text" v-model="stuId" placeholder="请输入学号">
			</view>
			<view class="input-row border">
				<text class="title">姓名：</text>
				<input type="text" v-model="realName" placeholder="请输入姓名">
			</view>
			<view class="input-row border">
				<text class="title">密码：</text>
				<input type="text" password="true" v-model="password" placeholder="请输入密码">
			</view>
			<view class="input-row border">
				<text class="title">性别：</text>
				<radio-group class="radio-group" @change="radioChange">
					<label class="radio" v-for="item in items" :key="item">
						<radio :value="item.name" :checked="item.checked" />{{item.value}}
					</label>
				</radio-group>
			</view>
			<view class="input-row border">
			<view class="title">日期：</view>
			<view>
				{{year}}年{{month}}月{{day}}日
			</view>
			</view>
		</view>
		<view>
			
			<picker-view class="picker-view" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
				<picker-view-column>
					<view class="picker-item" v-for="item in years" :key="item">{{item}}年</view>
				</picker-view-column>
				<picker-view-column>
					<view class="picker-item" v-for="item in months" :key="item">{{item}}月</view>
				</picker-view-column>
				<picker-view-column>
					<view class="picker-item" v-for="item in days" :key="item">{{item}}日</view>
				</picker-view-column>
			</picker-view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="register">注册</button>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';

	export default {
		onLoad:function(){
			setTimeout(() => {
				this.visible = true
			}, 0)
		},
		data() {
			const date = new Date()
            const years = []
            const year = date.getFullYear()
            const months = []
            const month = date.getMonth() + 1
            const days = []
            const day = date.getDate()

            for (let i = 1990; i <= date.getFullYear(); i++) {
                years.push(i)
            }

            for (let i = 1; i <= 12; i++) {
                months.push(i)
            }

            for (let i = 1; i <= 31; i++) {
                days.push(i)
            }
			return {
				title: 'picker-view',
                years,
                year,
                months,
                month,
                days,
                day,
                value: [9999, month - 1, day - 1],
                visible: false,
                indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
				
				stuId:'',
				account: '',
				password: '',
				email: '',
				realName:'',
				items: [
					{
						name: 'male',
						value: '男'
					},
					{
						name: 'female',
						value: '女',
						checked: 'true'
					},
				]
			}
		},
		methods: {
			bindChange: function (e) {
                const val = e.detail.value
                this.year = this.years[val[0]]
                this.month = this.months[val[1]]
                this.day = this.days[val[2]]
            },
			radioChange: function(e) {
				console.log('radio发生change事件，携带value值为：' + e.detail.value)
			},
			register() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.account.length < 5) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 5 个字符'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				if (this.email.length < 3 || !~this.email.indexOf('@')) {
					uni.showToast({
						icon: 'none',
						title: '邮箱地址不合法'
					});
					return;
				}

				const data = {
					account: this.account,
					password: this.password,
					email: this.email
				}
				service.addUser(data);
				uni.showToast({
					title: '注册成功'
				});
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>
    .picker-item {
        text-align: center;
        line-height: 40px;
        font-size: 18px;
    }
    .picker-view {
        position: relative;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 238px;
        background-color: rgba(255, 255, 255, 1);
    }
</style>
