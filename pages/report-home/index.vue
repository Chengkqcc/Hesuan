<template>
	<view>
		<navigator @click="getdetail('./truck')" hover-class="none" class="list-item">
			<image src="@/static/report-home/icon_fx1.png" />
			货车司机报备
		</navigator>
		<navigator @click="getdetail('./inCrowd')" hover-class="none" class="list-item">
			<image src="@/static/report-home/icon_fx2.png" />
			国内群众报备
		</navigator>
		<navigator @click="getdetail('./inbound')" hover-class="none" class="list-item">
			<image src="@/static/report-home/icon_fx3.png" />
			国外入境人员报备
		</navigator>

	</view>
</template>

<script>
	import {
		userReportedList,
		inReportLatest
	} from '../../common/api.js'
	export default {
		data() {
			return {
				status: 'aaaa',
				list: [],
				apply:false,
				options1: [{
					text: '删除',
					style: {
						backgroundColor: 'red',
					}
				}, ],
			}
		},
		onShow() {
			
		},
		onLoad(option) {
			if (option != null && option != "" && option.apply) {
				this.apply = option.apply
			}
			this.userReportedList()
		},
		methods: {
			userReportedList() {
				userReportedList().then(res => {
					this.list = res
				})
			},
			inReportLatest(url) {
				inReportLatest().then(res => {
					console.log(res)
					if (res && JSON.stringify(res) !== "{}") {
						if (res.valid != 3 && res.valid != 4) {
							uni.$u.toast("已有审核中或未过期的报备记录,请在报备申请查询里查看！");
							return
						}
						// if (res.valid != 3 ) {
						// 	uni.$u.toast("已有审核中或未过期的报备记录,请在报备申请查询里查看！");
						// 	return
						// }else if(res.valid == 4){
						// 	uni.$u.toast("已有驳回报备记录,请在报备申请查询里修改！");
						// 	return
						// }
					}
					uni.navigateTo({
						url: url
					})


				})
			},
			getdetail(reportType) {
				if(this.apply){
					uni.navigateTo({
						url: reportType+'?apply='+this.apply
					})
				}else{
					this.inReportLatest(reportType)
				}
			}
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
			width: 83rpx;
			height: 83rpx;
			margin-right: 42rpx;
		}

		&:nth-child(3) image {
			width: 71rpx;
			height: 83rpx;
			margin-right: 48rpx;
		}

		&:nth-child(4) image {
			width: 83rpx;
			height: 67rpx;
			margin-right: 42rpx;
		}

		&:nth-child(5) image {
			width: 85rpx;
			height: 69rpx;
			margin-right: 42rpx;
		}
	}
</style>
