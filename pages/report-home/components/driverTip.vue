<template>
	<view class="body">
		
		<view class="content">
			
			<view class="title_ts">
				<image src='@/static/report-home/icon_zhuyi.png' />
				<p style="font-size: 34rpx;font-weight: 700;">温馨提示：</p>
			</view>
			<p>【无需代驾】经报备正常通行的货运车辆进入东兴无需代驾，司乘人员不会因此而导致变码。</p>
			<p>【自费食宿】健康码红黄码、行程码带*的司乘人员进入东兴请主动配合进行集中闭环管理（食宿费自理）。</p>
			<p>【如实填报】如实填报信息，否则将要承担相应法律责任。</p>
			<p>【为你服务】做好个人防护，关注官方消息，不要听信流言谣言，遇到困难主动联系货物所属主管部门。</p>

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
		.title_ts{
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
