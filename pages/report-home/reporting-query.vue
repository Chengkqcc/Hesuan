<template>
	<view>
		<view style="padding: 20upx;background: #fff;" @click="getDetail(item)">
			<u-row justify="center" align="center">
				<u-col span="2">
					<u-avatar
						v-if="item.avatar!=null && item.avatar!='' "
						size="90rpx" :src="item.avatar"></u-avatar>
					<u-avatar v-else :text="item.name[0]" size="90rpx" randomBgColor>
					</u-avatar>
				</u-col>
				<u-col span="10">
					<view style="font-size: 33rpx;font-weight: 700;">{{item.name}}</view>
					<view style="margin-top: 10upx;color: #666666;font-size: 29r4upx;">
						证件号码：{{item.respondentIdNumber}}</view>
					<view style="margin-top: 10upx;color: #666666;font-size: 29rpx;display: flex;justify-content: space-between;">
						申请日期：{{item.requestTime}}
						<view style="font-size: 25rpx; text-align: right;color: #4CCD56;">通过</view>
						<view style="font-size: 25rpx; text-align: right;color: #28D06D;">审核成功</view>
						<view style="font-size: 25rpx; text-align: right;color: #DA0303;">审核失败</view>
						<view style="font-size: 25rpx; text-align: right;color: #999999;">已过期</view>
					</view>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			getDetail() {
				// 申请待审核
				// uni.navigateTo({
				// 	url: '/pages/nucleic/applylose?source=own'
				// })
				// 审核失败
				// uni.navigateTo({
				// 	url: '/pages/nucleic/applyreject?source=own&reject=' + result.userPassRequestRecord
				// 		.rejectReason
				// })
			}
		}
	}
</script>

<style>
page {
	background: #F1F4F7;
}
</style>