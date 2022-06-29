<template>
	<view>
		<!-- <navigator url="./index" hover-class="none" class="list-item">
			<image src="@/static/report-home/icon_fx_jin.png" />
			进东兴报备
		</navigator>
		<view @click="outReportLatest" hover-class="none" class="list-item">
			<image src="@/static/report-home/icon_fx_chu.png" />
			出东兴报备
		</view> -->
		<navigator url="./index?apply=true" hover-class="none" class="list-item">
			<image src="@/static/report-home/icon_fx_jin.png" />
			进东兴报备
		</navigator>
		<!-- <view @click="gotoOut" hover-class="none" class="list-item">
			<image src="@/static/report-home/icon_fx_chu.png" />
			出东兴报备
		</view> -->
		<navigator url="./situation-report?apply=true" hover-class="none" class="list-item">
			<image src="@/static/report-home/icon_fx_chu.png" />
			出东兴报备
		</navigator>
		<navigator url="./search" hover-class="none" class="list-item">
			<image src="@/static/report-home/icon_fx5.png" />
			报备申请查询
		</navigator>
		<navigator v-if="isShop" url="./delivery" hover-class="none" class="list-item">
			<image src="@/static/report-home/icon_fx50.png" />
			货物签收确认
		</navigator>
		<navigator v-if="isShop && isolate" url="./isolation" hover-class="none" class="list-item">
			<image src="@/static/report-home/icon_fx60.png" />
			隔离人员到店确认
		</navigator>
		<u-modal :show="show" :title="title" :content='content' @confirm="showConfirm()"></u-modal>
	</view>
</template>
<script>
	import {
		getMerchantInfo,
		outReportLatest
	} from '../../common/api.js'
	export default {
		data() {
			return {
				isShop: false,
				isolate: false,
				list: [],
				title: '温馨提示',
				content: '该功能正在维护中，会尽快恢复使用，敬请谅解!',
				show: false
			}
		},
		onShow() {
			this.routerLink()

		},
		methods: {
			gotoOut(){
				this.show = true
			},
			
			
			outReportLatest() {
				outReportLatest().then(res => {
					if (res && JSON.stringify(res) !== "{}") {
						if (res.valid != 3 && res.valid != 4) {
							uni.$u.toast("该用户已有审核中或未过期的报备记录,请在报备申请查询里查看！");
							return
						}
						// console.log(res.valid != 3 && res.valid != 4)
						// if (res.valid != 3) {
						// 	uni.$u.toast("已有审核中或未过期的报备记录,请在报备申请查询里查看！");
						// 	return
						// } else if (res.valid == 4) {
						// 	uni.$u.toast("已有驳回报备记录,请在报备申请查询里修改！");
						// 	return
						// }
					}
					uni.navigateTo({
						url: './situation-report'
					})
				})
			},
			async routerLink() {
				try {
					getMerchantInfo({
						custom: {
							toast: false,
							catch: true
						}
					}).then(result => {
						// AGREE 通过 REJECT 申请中 REQUEST 拒接
						if (result.state === 'AGREE') {
							this.isShop = true
							if(result.info.spType==1  && result.info.isolate){
								this.isolate = true
							}
						} else {
							this.isShop = false
						}
					}).catch(err => {
						this.isShop = false
						this.isolate = false
					});

				} catch (error) {
					this.isShop = false
					this.isolate = false
				}
			},
			showConfirm() {
				this.show = false
			},


		},
	}
</script>
<style lang="scss" scoped>
	.list-item {
		width: 667rpx;
		height: 125rpx;
		background: #ffffff;
		box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.1);
		border-radius: 17rpx;
		display: flex;
		align-items: center;
		padding: 0 54rpx;
		margin: 0 auto;
		color: #333333;
		font-weight: bold;
		box-sizing: border-box;
		margin-top: 23rpx;

		&:first-child image {
			width: 81rpx;
			height: 67rpx;
			margin-right: 44rpx;
		}

		&:nth-child(2) image {
			width: 81rpx;
			height: 67rpx;
			margin-right: 44rpx;
		}

		&:nth-child(3) image {
			width: 81rpx;
			height: 67rpx;
			margin-right: 44rpx;
		}

		&:nth-child(4) image {
			width: 81rpx;
			height: 67rpx;
			margin-right: 44rpx;
		}

		&:nth-child(5) image {
			width: 81rpx;
			height: 67rpx;
			margin-right: 44rpx;
		}

		&:nth-child(6) image {
			width: 81rpx;
			height: 70rpx;
			margin-right: 44rpx;
		}

		&:nth-child(7) image {
			width: 85rpx;
			height: 69rpx;
			margin-right: 42rpx;
		}
	}
</style>
