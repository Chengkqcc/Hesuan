<template>
	<view class="body">
		<view class="title">{{detail.title}}</view>
		<view class="time">{{detail.createTime}}</view>
		<u-line margin='23rpx 0 17rpx'></u-line>
		<u-parse :content="detail.content"></u-parse>
	</view>
</template>

<script>
	import { userNoticeDetail } from '@/common/api.js'
	export default {
		data() {
			return {
				detail: {}
			}
		},
		onLoad( { id } ) {
			this.getDetail(id);
		},
		methods: {
			async getDetail(id){
				uni.showLoading()
				try{
					const result = await userNoticeDetail(id);
					console.log(result)
					this.detail =result
				}catch(e){
					console.log(e)
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.body {
	padding: 0 44rpx;
}
.title {
	font-size: 38rpx;
	color: #333333;
	line-height: 54rpx;
	padding: 38rpx 0 8rpx;
}
.time {
	font-size: 25rpx;
	color: #666666;
	line-height: 42rpx;
}
</style>

