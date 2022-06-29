<template>
	<view class="body">
		<view class="content">

			<view class="title_ts">
				<image src='@/static/report-home/icon_zhuyi.png' />
				<p style="font-size: 34rpx;font-weight: 700;">温馨提示：</p>
			</view>
			<p>进出东兴报备通行凭证，审核通过后，48小时内有效，超期需重新提交申请。请广大居民根据出行计划，提前1-2天申请，填写真实个人防疫信息。</p>
			<p>感谢广大居民的积极配合。中高风险地区、中高风险地区所在县市区或直辖市街道/镇、本土疫情发生所在设区市或直辖市城区返桂来桂人员需配合疫情防控相关管理措施，请提前了解我市防疫管理政策，合理安排行程。</p>
			

		</view>
	</view>
</template>

<style lang="scss" scoped>
	.body {
		width: 667rpx;
		// height: 138rpx;
		background: #fff;
		margin: 42rpx auto;
		display: flex;
		align-items: center;
		padding: 20rpx 30rpx;
		box-sizing: border-box;

		.title_ts {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 20rpx 0;
		}

		image {
			width: 67rpx;
			height: 67rpx;
			margin-right: 30rpx;
		}

		view {
			flex: 1;
			font-size: 28rpx;
		}

		.content {
			color: red;
		}
	}
</style>
