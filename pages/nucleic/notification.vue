<template>
	<view>
		<!-- <view class="search-bar">
			<view class="input">
				<input type="text" v-model="searchText" placeholder="请输入关键字查询" />
			</view>
			<view class="block search" @click="getData">查询</view>
		</view> -->
		<view class="content-list">
			<navigator class="content-slide"
				v-for="(item, idx) in list" 
				:key="item.id" 
				:url="'./notificationInfo?id='+item.id"
				hover-class="none">
				<view class="new" v-if="item.popUp"></view>
				<view class="title">{{item.title}}</view>
				<view class="time">{{item.createTime}}</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import { userNoticeList,cleanUserNoticeReadIndex } from '@/common/api.js'
	export default {
		data() {
			return {
				searchText: '',
				list: []
			}
		},
		onLoad() {
			this.getData();
			cleanUserNoticeReadIndex()
		},
		methods: {
			async getData() {
				try{
					const result = await userNoticeList();
					this.list = result
				}catch(e){
					//TODO handle the exception
				}
			},
			
		}
	}
</script>

<style>
page {
background: #F1F4F7;
}
</style>
<style lang="scss" scoped>
.search-bar {
	height: 104rpx;
	background: #FFFFFF;
	padding: 0 25rpx;
	display: flex;
	align-items: center;
	.input {
		flex: 1;
		background: #EEEEEE;
		border-radius: 8rpx;
		overflow: hidden;
		padding-left: 17rpx;
		input {
			width: 100%;
			height: 63rpx;
			font-size: 29rpx;
		}
	}
	.block {
		height: 63rpx;
		border-radius: 8rpx;
		text-align: center;
		line-height: 63rpx;
		background: #3A8CF0;
		color: #fff;
		font-size: 29rpx;
		width: 117rpx;
		margin-left: 15px;
	}
}
.content-list {
	padding-top: 21rpx;
	.content-slide {
		background: #FFFFFF;
		padding: 29rpx 46rpx 20rpx;
		margin-bottom: 21rpx;
		position: relative;
		.title {
			font-size: 31rpx;
			color: #333333;
			line-height: 42rpx;
		}
		.time {
			margin-top: 8rpx;
			font-size: 25rpx;
			color: #666666;
			line-height: 42rpx;
		}
		.new {
			width: 17rpx;
			height: 17rpx;
			background: #DA0303;
			border-radius: 50%;
			position: absolute;
			left: 19rpx;
			top: 17rpx;
		}
	}
}
</style>
