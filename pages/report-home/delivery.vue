<template>
	<view class="body">
		<view class="search-bar">
			<view class="block">
				<input v-model="queryParam.userName" class="input" placeholder="输入姓名" />
			</view>
			<view class="block">
				<uni-datetime-picker v-model="range" type="daterange" @maskClick="maskClick" :border="false" />
			</view>
			<view class="block search" @click="getData">查询</view>
		</view>
		<u-empty v-if="!loading && list&& list.length==0" mode="list" :icon="img"></u-empty>

		<block v-for="(item, idx) in list" :key="item.id">
			<view style="height: 10rpx;background: #f3f4f6;">
			</view>
			<view class="slide">
				<image class="headimg" :src='item.avatar' />
				<view class="content">
					<view class="title">
						<view class="name">司机姓名：{{item.userName}}</view>
						<view class="success" v-if="item.confirm">已签收</view>
					</view>
					<view class="idcard"  @click="getPhone(item.userPhone)">联系电话：{{item.userPhone}}</view>
					<view class="date">
						<view class="value">货物类型：{{item.goodsTypeStr}}</view>
					</view>
				</view>
			</view>
			<u-line></u-line>
			<view style="padding: 0 30upx;background-color: #ffffff;">
				<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
				<u--form labelPosition="left" :model="item" ref="form1" labelWidth="170rpx">
					<u-form-item label="收货日期" prop="form.birthday" borderBottom @click="dateActionShow(item.id,item.confirm)">
						<u--input v-model="item.confirmDate" border="none" disabled fontSize='31rpx'
							style="text-align: right;" disabledColor="#fff" suffixIcon="arrow-right"
							suffixIconStyle="opacity:0.6" placeholder="请选择收货日期"></u--input>
					</u-form-item>
					<u-datetime-picker :show="item.id == id " :value="item.nowDate" mode="datetime"
						:minDate="minDateTime" :maxDate="maxDateTime" @confirm="birthDateConfirm($event,idx)"
						closeOnClickOverlay @cancel="coseDateActionShow" @close="coseDateActionShow">
					</u-datetime-picker>
				</u--form>
				<view class="custom" v-if="!item.confirm">
					<view class="custom-style">
						<u-button type="primary" @click="confirmGoods(item)" text="确认签收"></u-button>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>
<script>
	import {
		driverReportedList,
		driverReportedConfirm,
		getDictType
	} from '../../common/api.js'
	export default {
		data() {
			return {
				id: 0,
				queryParam: {
					"endTime": "",
					"startTime": "",
					"userId": null,
					"userName": ""
				},
				form: {
					confirmDate: null
				},
				goods_type: [],
				range: [],
				returnTimeShow: false,
				endTimeShow: false,
				birthDate: Number(new Date()),
				startIimeDate: Number(new Date()),
				endTimeDate: Number(new Date()),
				maxDateTime: new Date().getTime(),
				minDateTime: new Date().getTime() - 3600 * 24 * 180 * 1000,
				status: 'aaaa',
				list: [],
				loading: true,
				options1: [{
					text: '删除',
					style: {
						backgroundColor: 'red',
					}
				}, ],
			}
		},
		watch: {

			range(newval) {
				console.log('范围选:', this.range);
			},

		},
		async onShow() {
			await this.load()
			this.driverReportedList()
			
		},
		methods: {
			load() {
				Promise.all([
					getDictType("goods_type")
				]).then(([goods]) => {
					this.goods_type = goods.map((v) => ({
						...v,
						name: v.dictLabel,
					}));
				});
			},
		 	getGoods_typeStr(goods){
				var str = ''
				this.goods_type.forEach(item=>{
					if(item.dictValue == goods){
						str = item.dictLabel
					}
				})
				console.log(str)
				return str
			},
			getPhone(phone) {
				uni.makePhoneCall({
					phoneNumber: phone, //电话号码
					success: function(e) {
						console.log(e);
					},
					fail: function(e) {
						console.log(e);
			
					}
				})
			},
			dateActionShow(id,confirm) {
				if(!confirm){
					this.id = id
				}
				
			},
			coseDateActionShow() {
				this.id = 0
			},
			maskClick(e) {
				console.log('maskClick事件:', e);
				this.range = e
			},
			getData() {
				this.driverReportedList()
			},

			confirmGoods(item) {
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				if (!item.confirmDate) {
					uni.hideLoading();
					uni.$u.toast("请选择收货日期");
					return false
				}
				var param = {
					id: item.id,
					date: item.confirmDate
				}
				driverReportedConfirm(param).then(res => {
					uni.showToast({
						title: '操作成功',
						icon: 'success',
						mask: true
					})
					this.getData()
				})
			},

			birthDateConfirm(e, index) {
				console.log(e, index)
				this.id = 0
				this.list.forEach((item, i) => {
					if (index == i) {
						item.nowDate = e.value
						item.confirmDate = uni.$u.timeFormat(e.value, 'yyyy-mm-dd hh:MM:00')
					}
				})
			},

			driverReportedList() {
				var that = this
				this.loading = true;
				console.log(this.range)
				if (this.range && this.range.length >= 2) {
					this.queryParam.startTime = uni.$u.timeFormat(this.range[0], 'yyyy-mm-dd 00:00:00')
					this.queryParam.endTime = uni.$u.timeFormat(this.range[1], 'yyyy-mm-dd 23:59:59')
				} else {
					this.queryParam.startTime = null
					this.queryParam.endTime = null
				}

				 driverReportedList(this.queryParam).then(res => {
					this.loading = false;
					if (res && res.length > 0) {
						res.forEach(i => {
							i.nowDate = Number(new Date())
							that.goods_type.forEach(item=>{
								if(item.dictValue == i.goodsType){
									i.goodsTypeStr = item.dictLabel
								}
							})
						})
					}
					console.log(res)
					this.list = res
				})
			},
			

			
		},
	}
</script>
<style>
	page {
		background: #f1f4f7;
	}
</style>
<style lang="scss" scoped>
	/deep/ .uni-date-editor--x .uni-date__icon-clear {
		border: 0;
	}

	/deep/ .uni-date-x {
		height: 63rpx;
		background: #EEEEEE;
	}

	.custom {
		display: flex;
		justify-content: center;

		.custom-style {

			width: 200rpx;
			padding: 30rpx;
		}
	}


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


			input {
				height: 63rpx;
			}

			&:nth-child(1) {
				width: 130rpx;
			}

			&:nth-child(2) {
				width: 450rpx;
			}

			&:nth-child(3) {
				width: 100rpx;
			}
		}

		.search {
			background: #3A8CF0;
			color: #fff;
		}
	}

	.slide {
		height: 208rpx;
		background: #ffffff;
		display: flex;
		align-items: center;
		padding: 0 40rpx 0 50rpx;
		// margin-bottom: 21rpx;

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

				/deep/ .success {
					color: #28D06D;
				}

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
