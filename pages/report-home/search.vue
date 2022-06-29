<template>
	<view class="body">
		<view v-if="list&& list.length==0">
			<u-empty :mode="mode" :icon="img">
			</u-empty>
		</view>
		<u-swipe-action style='margin-bottom: 30upx;'>
			<block v-for="(item, idx) in list" :key="item.id">
				<u-swipe-action-item :options="options1" @click="unbundle(item, idx)" :disabled="item.permitAudit !== 0">
					<view class="slide" @click="getdetail(item)">
						<image class="headimg" :src='item.avatar' />
						<view class="content">
							<view class="title">
								<view class="name">{{item.userName}}</view>
								<view class="label" v-if="item.reportType===0">货车司机报备</view>
								<view class="label" v-if="item.reportType===1">群众入东兴报备</view>
								<view class="label" v-if="item.reportType===2">入境报备</view>
								<!-- <view class="label" v-if="item.reportType===1 || item.reportType===2 || item.reportType===0 ">入东兴报备</view> -->

								<view class="label" v-if="item.reportType===3">出东兴报备</view>
							</view>
							<view class="idcard">证件号码：{{item.userIdNumber | idcard}}</view>
							<view class="date">
								<view class="value">申请日期：{{item.createTime?$u.timeFormat(item.createTime , 'yyyy-mm-dd hh:MM'):'' }}</view>
								<view class="success" v-if="item.permitAudit === 1 && (item.valid === 2 || item.valid === 1)">通过</view>
								<view class="error" v-if="item.permitAudit === 2">驳回</view>
								<view class="await" v-if="item.permitAudit === 0">审核中</view>
								<view class="overdue" v-if="item.valid === 3">已过期</view>
							</view>
						</view>
					</view>
				</u-swipe-action-item>
				<view style="height: 10rpx;background: #f3f4f6;">

				</view>
			</block>

		</u-swipe-action>
	</view>
</template>
<script>
	import {
		delOutReport,
		delDriverReported,
		delGlobalReported,
		delDomesticReported,
		delTemporaryReported,
		userReportedList
	} from '../../common/api.js'
	export default {
		filters: {
			idcard(str) {
				if (!str) return '';
				if (18 <= str.length) {
					let leftStr = str.substring(0, 6);
					let rightStr = str.substring(str.length - 4, str.length);

					let strCon = ''
					for (let i = 0; i < str.length - 4 - 6; i++) {
						strCon += '*';
					}
					return leftStr + strCon + rightStr;
				} else if (str.length > 4) {
					return str.substr(0, str.length - 4) + '****'
				} else {
					return str.substr(0, str.length - 1) + '****'
				}
			},
		},
		data() {
			return {
				mode: 'list',
				status: 'aaaa',
				list: [],
				options1: [{
					text: '删除',
					style: {
						backgroundColor: 'red',
					}
				}, ],
			}
		},
		onShow() {
			this.userReportedList()
		},
		methods: {
			userReportedList() {
				userReportedList().then(res => {
					this.list = res
				})
			},
			//删除报备
			unbundle(row, index) {
				var that = this
				if(row.permitAudit && row.permitAudit === 2){
					return uni.$u.toast("暂不能删除已驳回记录");
				}
				uni.showModal({
					title: '温馨提示',
					content: '确定要删除报备信息吗？',
					success: res => {
						if (res.confirm) {
							uni.showLoading({
								title: '加载中',
								mask: true
							});
							var ids = [row.id]
							if (row.reportType === 0) { //货车司机
								delDriverReported(ids).then(res => {
									that.list.splice(index, 1)
								})
							} else if (row.reportType === 1) { //国内群众
								delDomesticReported(ids).then(res => {
									that.list.splice(index, 1)
								})
							} else if (row.reportType === 2) { //入境
								delGlobalReported(ids).then(res => {
									that.list.splice(index, 1)
								})
							} else if (row.reportType === 3) { // 出东兴
								delOutReport(ids).then(res => {
									that.list.splice(index, 1)
								})
							}

						}
					}
				})
			},
			detectionState(item){
				console.log(item)
				if(item.valid === 2 || item.valid === 1){
					uni.navigateTo({
						url: './pass?id=' + item.id + '&reportType=' + item.reportType + '&userId=' + item
							.userId
					})
				}else if(item.valid === 3){
					return uni.$u.toast("当前报备已过期");
				}
			},

			getdetail(item) {
				var userInfo = this.$store.state.userInfo
				var queryParam = ''
				if (userInfo.id != item.userId) {
					queryParam += '&apply=true'
				}
				if (item.reportType === 0) { //货车司机
					if (item.permitAudit === 1) {
						this.detectionState(item)
					} else {
						uni.navigateTo({
							url: './truck?id=' + item.id + queryParam
						});

					}
				} else if (item.reportType === 1) { //国内群众
					if (item.permitAudit === 1) {
						this.detectionState(item)
					} else {
						uni.navigateTo({
							url: './inCrowd?id=' + item.id + queryParam
						});

					}
				} else if (item.reportType === 2) { //入境
					if (item.permitAudit === 1) {
						this.detectionState(item)
					} else {
						uni.navigateTo({
							url: './inbound?id=' + item.id + queryParam
						});

					}
				} else if (item.reportType === 3) { // 出东兴
					if (item.permitAudit === 0 || item.permitAudit === 2) {
						uni.navigateTo({
							url: `/pages/report-home/situation-report?id=${item.id}&reject=` + (item
								.permitAudit === 2 ? item.rejectReason : '') + queryParam
						})
					} else if (item.permitAudit === 1) {
						this.detectionState(item)
					}
				} 
			}
		},
	}
</script>
<style>
	page {
		background: #f1f4f7;
	}
</style>
<style lang="scss" scoped>
	.slide {
		height: 208rpx;
		background: #ffffff;
		display: flex;
		align-items: center;
		padding: 0 40rpx 0 50rpx;
		margin-bottom: 21rpx;

		.headimg {
			width: 104rpx;
			height: 104rpx;
			border-radius: 50%;
			margin-right: 33rpx;
		}

		.content {
			flex: 1;

			.title {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.name {
					font-weight: 600;
					color: #333333;
				}

				.label {
					width: 221rpx;
					line-height: 46rpx;
					border-radius: 23rpx;
					border: 2rpx solid #3a8cf0;
					text-align: center;
					font-size: 29rpx;
					color: #3a8cf0;
				}
			}

			.idcard,
			.date {
				font-size: 29rpx;
				color: #666666;
				margin-top: 12rpx;
			}

			.date {
				display: flex;
				align-items: center;
				justify-content: space-between;

				/deep/ .success {
					color: #28D06D;
				}

				/deep/ .error {
					color: #DA0303;
				}

				/deep/ .await {
					color: #3A8CF0;
				}

				/deep/.overdue {
					color: #666666;
				}
			}
		}
	}
</style>
