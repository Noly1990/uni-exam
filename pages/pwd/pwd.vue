<template>
    <view class="content">
        <view>
            <view class="hint">
                <text class="title">忘记密码请联系各班老师修改</text>
            </view>
        </view>

        <view class="btn-row">
            <button type="primary" class="primary" @tap="findPassword">确定</button>
        </view>
    </view>
</template>

<script>
    import service from '../../service.js';

    export default {
        data() {
            return {
                email: ''
            }
        },
        methods: {
            findPassword() {
                uni.navigateTo({
                	url:"../login/login"
                })
            }
        }
    }
</script>

<style>
.hint {
	text-align: center;
}
</style>
