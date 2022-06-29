<template>
	<view>
		<view class="search-bar">
			<view class="block" @click="dateShow = true">{{date}}</view>
			<view class="block" @click="changeType()">{{normal?'正常':'异常'}}</view>
			<view class="block search" @click="getData">查询</view>
		</view>
		<view class="content-list">
			
			<u-empty v-if="!loading && list&& list.length==0" mode="list" :icon="img">
			</u-empty>
			<view class="content-slide" v-for="(item, idx) in list" :key="idx">
				<view class="content-row">
					<label>到达时间：</label>
					<view >{{item.inTime|| ''}}</view>
				</view>
				<view class="content-row">
					<label>离开时间：</label>
					<view >{{item.outTime || ''}}</view>
				</view>
				<view class="content-row">
					<label>扫码商家：</label>
					<view >{{item.spName || ''}}</view>
				</view>
				<view class="content-row">
					<label>扫码状态：</label>
					<view >{{item.normal ? '正常' : '异常'}}</view>
				</view>
			</view>
		</view>
		<u-datetime-picker :show="dateShow" v-model="formDate" mode="date" :maxDate='maxDate'
          @confirm="dateShow = false"
          @cancel="dateShow = false"
          @close="dateShow = false"></u-datetime-picker>
	</view>
</template>

<script>
	const timeFormat = uni.$u.timeFormat;
	import { userScanList } from '@/common/api.js'
	export default {
		data() {
			const currentTime = +new Date();
			return {
				dateShow: false,
				date: timeFormat(currentTime, 'yyyy-mm-dd'),
				formDate: currentTime,
				maxDate: currentTime,
				normal: true,
				list: [],
				loading: true
			}
		},
		watch: {
		  "formDate"(time) {
			this.date= timeFormat(time, "yyyy-mm-dd");
		  },
		},
		onLoad() {
			this.getData();
		},
		methods: {
			changeType(){
				this.normal = !this.normal
				this.getData();
			},
			
			async getData() {
				this.loading = true;
				uni.showLoading()
				try{
					const result = await userScanList({
						"endTime": this.date+" 23:59:59",
						"normal": this.normal,
						"startTime": this.date+" 00:00:00",
					}, { custom: { toast: true } })
					this.list = result
					this.loading = false;
				}catch(e){
					//TODO handle the exception
				}
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
.search-bar {
	height: 104rpx;
	background: #FFFFFF;
	padding: 0 25rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.block {
		height: 63rpx;
		background: #EEEEEE;
		border-radius: 8rpx;
		text-align: center;
		line-height: 63rpx;
		color: #999999;
		font-size: 29rpx;
		width: 117rpx;
		&:nth-child(1), &:nth-child(2) {
			width: 208rpx;
		}
	}
	.search {
		background: #3A8CF0;
		color: #fff;
	}
}
.content-list {
	margin-top: 21rpx;
	.content-slide {
		padding: 17rpx 46rpx;
		line-height: 75rpx;
		font-size: 31rpx;
		margin-bottom: 21rpx;
		background: #fff;
		.content-row {
			display: flex;
			align-items: center;
			justify-content: space-between;
			label {
				color: #333333;
			}
			view {
				color: #666666;
			}
		}
	}
}
</style>