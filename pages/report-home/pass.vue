<template>
	<view class="body">
		<swiper class="swiper" disabled>
			<swiper-item>
				<view class="swiper-item">
					<view class="title" v-if='reportType==0'>货车司机报备通行证</view>
					<view class="title" v-else>{{reportType==1?'进东兴':reportType==2?'入境':'出东兴'}}报备通行证</view>
					<view class="time" v-if="reportType==0 && !item.startFormatTime ">【倒计时：暂未扫码登记 】</view>
					<view class="time" v-else>【{{reportType==0?'扫码登记':''}}倒计时：{{countdownTime}} 】</view>
					<view class="u-demo-block__content">
						<u-row justify="space-between" align='top' calss="doem_line" v-if="item.startFormatTime">
							<u-col span="4">
								<view class=" bg-purple">
									<span>有</span>
									<span>效</span>
									<span>期</span>
									<span>限：</span>
								</view>
							</u-col>
							<u-col span="8">
								<view class=" bg-purple-light" style="word-break:break-all">
									{{item.startFormatTime}} 至
									<view>{{item.endFormatTime}}</view>
								</view>
							</u-col>

						</u-row>
						<u-row justify="space-between">
							<u-col span="4">
								<view class=" bg-purple">
									<span>持</span>
									<span>证</span>
									<span>人：</span>
								</view>
							</u-col>
							<u-col span="8">
								<view class=" bg-purple-light">{{form.name}}</view>
							</u-col>
						</u-row>
						<u-row justify="space-between">
							<u-col span="4">
								<view class=" bg-purple">
									<span>证</span>
									<span>件</span>
									<span>号</span>
									<span>码：</span>
								</view>
							</u-col>
							<u-col span="8">
								<view class=" bg-purple-light">{{form.idNumber | idcard}}</view>
							</u-col>
						</u-row>
						<u-row justify="space-between">
							<u-col span="4">
								<view class=" bg-purple">
									<span>联</span>
									<span>系</span>
									<span>电</span>
									<span>话：</span>
								</view>
							</u-col>
							<u-col span="8">
								<view class=" bg-purple-light">{{form.phone|phone}}</view>
							</u-col>
						</u-row>
						<u-row justify="space-between" v-if="reportType==0">
							<u-col span="4">
								<view class=" bg-purple">
									<span>货</span>
									<span>物</span>
									<span>类</span>
									<span>型：</span>
								</view>
							</u-col>
							<u-col span="8">
								<view class=" bg-purple-light">{{getgoodsTypeValue(item.goodsType)}}</view>
							</u-col>
						</u-row>
						<u-row justify="space-between" align='top' v-if="reportType==0">
							<u-col span="4">
								<view class=" bg-purple">
									<span>来</span>
									<span>源</span>
									<span>地：</span>
								</view>
							</u-col>
							<u-col span="8">
								<view class=" bg-purple-light">{{item.origin}}</view>
							</u-col>
						</u-row>
						<u-row justify="space-between" align='top' v-if="reportType==1">
							<u-col span="4">
								<view class=" bg-purple">
									<span>来</span>
									<span>源</span>
									<span>地：</span>
								</view>
							</u-col>
							<u-col span="8">
								<view class=" bg-purple-light">{{item.originAddr}}</view>
							</u-col>
						</u-row>

						<u-row justify="space-between" align='top' v-if="reportType==2">
							<u-col span="4">
								<view class=" bg-purple">
									<span>入</span>
									<span>境</span>
									<span>口</span>
									<span>岸：</span>
								</view>
							</u-col>
							<u-col span="8">
								<view class=" bg-purple-light">{{item.entryPort}}</view>
							</u-col>
						</u-row>
						
						
						<u-row justify="space-between" align='top' v-if="reportType==2 ||reportType==1 ">
							<u-col span="4">
								<view class=" bg-purple">
									<span>申</span>
									<span>请</span>
									<span>说</span>
									<span>明：</span>
								</view>
							</u-col>
							<u-col span="8">
								<view class=" bg-purple-light">{{item.enterPurposeDetail?item.enterPurposeDetail:''}}</view>
							</u-col>
						</u-row>
						<u-row justify="space-between" align='top' v-if="reportType==3">
							<u-col span="4">
								<view class=" bg-purple">
									<span>目</span>
									<span>的</span>
									<span>地：</span>
								</view>
							</u-col>
							<u-col span="8">
								<view class=" bg-purple-light">{{item.outDest}}</view>
							</u-col>
						</u-row>
						<u-row justify="space-between" align='top' v-if="reportType==3">
							<u-col span="4">
								<view class=" bg-purple">
									<span>申</span>
									<span>请</span>
									<span>说</span>
									<span>明：</span>
								</view>
							</u-col>
							<u-col span="8">
								<view class=" bg-purple-light" style="word-break:break-all">{{item.outDesc?item.outDesc:''}}</view>
							</u-col>
						</u-row>
					</view>

					<view class="footer">
						<view>东兴市疫情防控指挥部</view>
						<view>{{item.verifyTime | verifyTime}}</view>
					</view>
					<!-- <view class="expired" v-if="isExpired">
						<view class="_title">已过期</view>
						<view class="_content" >
							<button @click="apply">重新申请</button>
						</view>
					</view> -->
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		getDictType,
		outReportQuery,
		getUserInfoById,
		getCurrDate,
		userReportedInfo,
		userDomesticReportedInfo,
		userGlobalReportedInfo,
		userTemporaryReportedInfo
	} from '@/common/api'
	export default {
		data() {
			return {
				driver_type: [],
				goods_type: [],
				form: {},
				reportType: -1,
				item: {},
				countdownTime: '00:00:00',
				isExpired: false
			}
		},
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
			phone(val) {
				if (!val) return '';
				return val.substr(0, 5) + '******'
			},
			verifyTime(val) {
				if (!val) return '';
				return val.split(' ').shift()
			}
		},
		onLoad(options) {
			if (options.userId) {
				getUserInfoById({
					params: {
						userId: options.userId
					},
					custom: {
						toast: true,
						catch: true
					}
				}).then(res => {
					this.form = res
				})
			} else {
				this.form = this.$store.state.userInfo
			}

			this.reportType = options.reportType
			if (options.reportType == 0) { //货车报备

				Promise.all([userReportedInfo({
					params: {
						id: options.id
					},
				}), getCurrDate()]).then(([res, time]) => {
					this.item = {
						...res,
						...this.timeDifference(res.userReport.startTime, res.userReport.endTime),
						verifyTime: res.userReport.verifyTime

					};
					this.countdown(time, res.userReport.endTime)
				})
			} else if (options.reportType == 1) { //群众
				Promise.all([userDomesticReportedInfo({
					params: {
						id: options.id
					},
				}), getCurrDate()]).then(([res, time]) => {
					this.item = {
						...res,
						...this.timeDifference(res.userReport.startTime, res.userReport.endTime),
						verifyTime: res.userReport.verifyTime
					};
					this.countdown(time, res.userReport.endTime)
				})
			} else if (options.reportType == 2) { //入境
				Promise.all([userGlobalReportedInfo({
					params: {
						id: options.id
					},
				}), getCurrDate()]).then(([res, time]) => {
					this.item = {
						...res,
						...this.timeDifference(res.userReport.startTime, res.userReport.endTime),
						verifyTime: res.userReport.verifyTime
					};
					this.countdown(time, res.userReport.endTime)
				})
			} else if (options.reportType == 3) { //出东兴
				Promise.all([outReportQuery(options.id), getCurrDate()]).then(([res, time]) => {
					this.item = {
						...res,
						...this.timeDifference(res.startTime, res.endTime)
					};
					this.countdown(time, res.endTime)
				})
			}
			Promise.all([
				getDictType("driver_type"),
				getDictType("goods_type")
			]).then(([driver, goods]) => {
				this.driver_type = driver.map((v) => ({
					...v,
					name: v.dictLabel,
				}));
				this.goods_type = goods.map((v) => ({
					...v,
					name: v.dictLabel,
					value: v.dictValue
				}));

			});

		},
		methods: {
			apply() {
				uni.redirectTo({
					url: '/pages/report-home/access'
				})
			},

			getgoodsTypeValue(value) {
				var str = ''
				this.goods_type.forEach(item => {
					if (item.dictValue == value) {
						str = item.dictLabel
					}
				})
				return str
			},
			timeDifference(date1, date2) {
				if (date1 && date2) {
					var nowtime = timeStrToDate(date1); //获取当前时间
					var endtime = timeStrToDate(date2); //定义结束时间
					var lefttime = endtime.getTime() - nowtime.getTime();
					var leftd = Math.floor(lefttime / (1000 * 60 * 60));
					return {
						startFormatTime: uni.$u.timeFormat(nowtime, 'mm-dd hh:MM'),
						endFormatTime: uni.$u.timeFormat(endtime, 'mm-dd hh:MM') + '(' + leftd + '小时)',
					}
				} else {
					return {
						startFormatTime: '',
						endFormatTime: '',
					}
				}

			},
			/**
			 * 
			 * @param {*} date: Date
			 */
			countdown(date1, date2) {
				if (!date1 || !date2) {
					return false
				}
				var nowtime = timeStrToDate(date1); //获取当前时间
				var endtime = timeStrToDate(date2); //定义结束时间
				var lefttime = endtime.getTime() - nowtime.getTime(); //距离结束时间的毫秒数

				if (lefttime <= 0) {
					this.countdownTime = '00:00:00'
					this.isExpired = true
					return
				}

				var leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)), //计算天数
					lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24), //计算小时数
					leftm = Math.floor(lefttime / (1000 * 60) % 60), //计算分钟数
					lefts = Math.floor(lefttime / 1000 % 60); //计算秒数
				this.countdownTime = doubleNumber(lefth + leftd * 24) + ":" + doubleNumber(leftm) + ":" + doubleNumber(
					lefts); //返回倒计时的字符串
				nowtime.setSeconds(nowtime.getSeconds() + 1)
				setTimeout(() => {
					this.countdown(nowtime, date2)
				}, 1000)
			}
		}
	}

	function doubleNumber(num) {
		return num < 10 ? `0${num}` : num
	}

	function timeStrToDate(time) {

		if (time instanceof Date) {
			return time
		}
		const [year, month, date, hours, minutes, seconds] = time.split(/(-| |:)/g).filter(v => ![' ', '-', ':'].includes(
			v)).map(v => Number(v))
		const d = new Date(year, month - 1, date, hours, minutes, seconds)
		return d
	}
</script>

<style>
	page {
		background: #DDDDDD;
	}
</style>
<style lang="scss">
	.bg-purple {
		margin-bottom: 10rpx;
		// text-align: right;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		color: #333333;
	}

	.bg-purple-light {
		margin-bottom: 10rpx;
		word-break: break-all;
		font-weight: 600;
	}

	.u-demo-block__content {
		padding: 0 70upx;
		// line-height: 60upx;
		// margin-top: 50upx;
		font-size: 30upx;

	}

	.swiper-item {
		width: 667rpx;
		margin: 0 auto;
		height: 1125rpx;
		margin: 0 auto 30rpx;
		background: url(@/static/bb_bg.png) no-repeat;
		background-size: 100% 100%;
		text-align: center;
		position: relative;

		.footer {
			width: 196rpx;
			height: 196rpx;
			background: url(@/static/logo1.png) center / 100% 100% no-repeat;
			position: absolute;
			bottom: 56rpx;
			right: 140rpx;
			white-space: nowrap;
			text-align: center;
			transform: translate(0, 0);

			view {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				color: #333333;
			}

			view:first-child {
				margin-top: 60rpx;
				font-weight: bold;
				font-size: 33rpx;
			}

			view:last-child {
				font-size: 29rpx;
				margin-top: 100rpx;
			}
		}

		.title {
			font-size: 46rpx;
			color: #333333;
			padding-top: 92rpx;
			font-weight: bold;
		}

		.time {
			padding: 52rpx 0;
			font-size: 38rpx;
			color: #4CCD56;
		}

		.p {
			text-align: left;
			padding: 0 70rpx;
			display: flex;
			color: #333333;
			font-size: 29rpx;
			margin-bottom: 10rpx;
			line-height: 50rpx;

			.label {
				width: 157rpx;
				padding-right: 20rpx;
				flex-shrink: 0;
				text-align: justify;
				position: relative;
				height: 30rpx;

				&::after {
					content: '';
					display: inline-block;
					width: 100%;
				}

				&::before {
					content: ':';
					position: absolute;
					right: 14rpx;
				}
			}

			.text {
				word-break: break-all;
			}
		}

		.expired {
			width: 500rpx;
			height: 258rpx;
			background: #FFFFFF;
			box-shadow: 0px 0px 21rpx 0rpx rgba(0, 0, 0, 0.1);
			border-radius: 21rpx;
			border: 2rpx solid #EEEEEE;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);

			._title {
				color: #DA0303;
				font-size: 33rpx;
				font-weight: bold;
				padding: 25rpx 0;
				text-align: center;
				border-bottom: 2rpx solid #EEEEEE;
			}

			._content {
				padding-top: 35rpx;

				button {
					width: 258rpx;
					margin: 0 auto;
					line-height: 92rpx;
					background: #3A8CF0;
					border-radius: 21rpx;
					text-align: center;
					font-size: 31rpx;
					color: #fff;
				}
			}
		}
	}

	.swiper {
		height: 1125rpx;
		width: 100%;
		margin-top: 30rpx;
		pointer-events: none;
	}
</style>
