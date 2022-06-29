<template>
	<view>
		<view class="banner">
			<image src="@/static/work-platform/banner.png"></image>
		</view>
		<navigator class="add" hover-class="none" url="./add-job">
			+ 新增网格工作
		</navigator>
		<view class="tab">
			<view class="tab-title">
				<view
					v-for="(item,index) in tabList"
					:key='index'
					:class="{active:index==activeIndex}"
					@click="changeTab(item, index)"
				>{{item.text}}</view>
				
			</view>
			<view class="tab-content">
				<view
					v-for="(item,index) in tabList"
					v-if="item.load"
					v-show="index === activeIndex"
					:key='index'>
					<view class="tab-slide">
						<view class="time">
							<view>2022-5-14 16:12</view>
							<view style="color: #E02E2E;">已驳回</view>
							<view style="color: #35D276;">审核成功</view>
							<view style="color: #3A8CF0;">待接收</view>
							<view style="color: #35D276;">七星社区 已接收</view>
						</view>
						<view class="content">群众反馈问题，如何处理</view>
						<view class="buttons">
							<view>进度查询</view>
						</view>
					</view>
					<view class="tab-slide">
						<view class="time">2022-5-14 16:12</view>
						<view class="content">群众反馈问题，如何处理</view>
						<view class="buttons" v-if="index === 0">
							<view>修改</view>
							<view>提交</view>
						</view>
						<view class="buttons" v-else-if="index === 1">
							<view>失败原因</view>
							<view>重新申请</view>
							<view>评价</view>
						</view>
						<view class="buttons" v-if="index === 2">
							<view>取消申请</view>
							<view>进度查询</view>
						</view>
						<view class="buttons" v-if="index === 3">
							<view>查看评价</view>
							<view>评价</view>
						</view>
						<view class="buttons" v-if="index === 4">
							<view>评价</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: 0,
				tabList: [
					{ load: true, text: '草稿箱' },
					{ load: false, text: '待处理' },
					{ load: false, text: '审核中' },
					{ load: false, text: '已完成' },
					{ load: false, text: '待评价' },
				]
			}
		},
		methods: {
			changeTab(item, idx) {
				item.load = true;
				this.activeIndex = idx;
			}
		}
	}
</script>
<style>
	page {
		background: #F1F4F7;
	}
</style>
<style lang="scss" scoped>
.banner {
	height: 313rpx;
	image {
		width: 100%;
		height: 100%;
	}
}
.add {
	font-size: 31rpx;
	text-align: center;
	color: #3A8CF0;
	line-height: 92rpx;
	background: #fff;
}
.tab {
	margin-top: 20px;
	.tab-title {
		font-size: 31rpx;
		color: #999999;
		line-height: 92rpx;
		display: flex;
		justify-content: space-around;
		background: #fff;
		border-bottom: 1px solid #EEEEEE;
		view {
			padding: 0 10rpx;
		}
		.active {
			color: #333333;
			position: relative;
			font-weight: bold;
			&::after {
				content: '';
				position: absolute;
				left: 0px;
				width: 100%;
				bottom: 0rpx;
				height: 5rpx;
				background: #3A8CF0;
				z-index: 99;
			}
		}
	}
	.tab-content {
		.tab-slide{
			background: #FFFFFF;
			padding: 25rpx 35rpx;
			margin-bottom: 20rpx;
			.time {
				color: #666666;
				font-size: 25rpx;
				display: flex;
				justify-content: space-between;
				.right {
					
				}
			}
			.content {
				margin-top: 20rpx;
				font-size: 31rpx;
				font-weight: 600;
				color: #333333;
				line-height: 44rpx;
			}
			.buttons {
				margin-top: 38rpx;
				display: flex;
				justify-content: space-around;
				view {
					width: 188rpx;
					line-height: 63rpx;
					background: #3A8CF0;
					border-radius: 8rpx;
					text-align: center;
					color: #fff;
					font-size: 29rpx;
				}
			}
		}
	}
}
</style>
