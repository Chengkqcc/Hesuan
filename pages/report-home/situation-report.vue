<template>
	<view>
		<Tip />
		<view class="current-people">
			<!-- <view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					姓名
				</view>
				<view class="form-item-content">
					<input v-model="userInfo.name" disabled="true" class="input" placeholder="请输入姓名" />
				</view>
			</view> -->
			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					选择报备申请人
				</view>
				<view class="form-item-content radio">
					<uni-section title="选择报备申请人" type="line">
						<uni-data-select v-model="form.userId" :localdata="familyList" @change="changeUserId">
						</uni-data-select>
					</uni-section>
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					是否为运输物资货车司机
				</view>
				<view class="form-item-content radio">
					<u-radio-group v-model="form.driverType" :disabled="isTrue">
						<u-radio :customStyle="{ marginRight: '40rpx' }" :name="0" label="否"
							activeColor="rgb(8,192,96)">
						</u-radio>
						<u-radio :name="1" label="是" activeColor="rgb(8,192,96)"></u-radio>
					</u-radio-group>
				</view>
			</view>

			<view class="form-item" v-if="form.driverType==1">
				<view class="form-item-label">
					<text>*</text>
					车牌号
				</view>
				<view class="form-item-content">
					<input @click="carShow = true" disabled v-model="form.numberPlate" class="input"
						placeholder="请输入" />
				</view>
			</view>
			<view class="form-item" v-if="form.driverType==1">
				<view class="form-item-label">
					<text>*</text>
					货物种类
				</view>
				<view class="form-item-content">
					<input @click="showDusinessType = true" v-model="form.goodsTypeStr" disabled class="input"
						placeholder="请选择" />
				</view>
			</view>


			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					预计出东兴时间
				</view>
				<view class="form-item-content">
					<input class="input" disabled v-model="form.outDate" @click="entryPortDateShow = true"
						placeholder="请选择" />
					<u-datetime-picker :show="entryPortDateShow" :value="form._outDate" mode="date"
						:minDate="minentryPort" :maxDate="maxentryPort" @confirm="entryPortDateShowConfirm"
						closeOnClickOverlay :immediateChange="true" @close="entryPortDateShow = false"
						@cancel="entryPortDateShow = false"></u-datetime-picker>
				</view>
			</view>

			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					出东兴情况说明
				</view>
				<view class="form-item-content textarea">
					<textarea v-model="form.outDesc" :maxlength='50' placeholder="请输入"></textarea>
				</view>
			</view>

			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					出东兴目的地
				</view>
				<view class="form-item-content" style="padding-top: 5rpx; box-sizing: border-box">
					<uni-data-picker :localdata="deptTree" placeholder="点击选择出东兴目的地" popup-title="请选择出东兴目的地"
						:clear-icon="false" :map="{ text: 'extName', value: 'id' }" @change="bindPickerChange"
						ref="picker" :border="false">
					</uni-data-picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					目的地详细地址
				</view>
				<view class="form-item-content textarea">
					<textarea v-model="form.outDestStr" :maxlength='50' placeholder="请输入"></textarea>
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					当前体温状况
				</view>
				<view class="form-item-content radio">
					<u-radio-group v-model="form.tempNormal" :disabled="isTrue">
						<u-radio :customStyle="{ marginRight: '40rpx' }" :name="true" label="正常"
							activeColor="rgb(8,192,96)">
						</u-radio>
						<u-radio :name="false" label="异常,且超过37.3℃" activeColor="rgb(8,192,96)"></u-radio>
					</u-radio-group>
				</view>
			</view>

			<Upload secondTitle="健康码" thirdTitle="行程卡" v-model="testImages" />
		</view>
		<div class="footer">
			<PromiseComponent v-model="agreeOrNot" />
			<button @click="submit">提交申请</button>
		</div>
		<Feedback />
		<u-picker :show="showDusinessType" title="货物类型" :columns="[goods_type]" keyName="name" :immediateChange="true"
			@close="showDusinessType = false" @cancel="showDusinessType = false" @confirm="businessTypeSelect">
		</u-picker>
		<u-keyboard mode="" :tips="
		  form.numberPlate
		    ? form.numberPlate
		    : '请输入车牌号码'
		" :dotDisabled="false" :random="false" :show="carShow" @close="carShow = false" @cancel="carShow = false"
			@confirm="confirm" @change="change" @backspace="backspace"></u-keyboard>
		<u-modal :show="modal.show" :title="modal.title" :content="modal.content" @confirm="modal.show = false"
			@cancel="modal.show = false"></u-modal>
		<u-modal :show="showState" :title="scanTitle" :content='scanContent' confirmText="我知道了" @confirm='scanConfirm'>
		</u-modal>
		<u-loading-page :loadingText="loadingPageData.loadingText" :image="loadingPageData.image"
			:loadingMode="loadingPageData.loadingMode" :bgColor="loadingPageData.bgColor" :loading="loading"
			:color="loadingPageData.color" :loadingColor="loadingPageData.loadingColor">
		</u-loading-page>
	</view>
</template>
<script>
	import Tip from "./components/outTip.vue";
	import PromiseComponent from "./components/promiseReport.vue";
	import Feedback from "./components/feedback.vue";
	import Upload from "./components/upload.vue";
	import {
		outReportLatest,
		getAreaSimple,
		outReport,
		getArea,
		getDictType,
		getfamilyList,
		outReportQuery,
		outReportUpdate,
		userPassandrecordState
	} from "@/common/api";

	function toast(title) {
		uni.showToast({
			title,
			icon: "none",
		});
	}
	export default {
		components: {
			Upload,
			Feedback,
			Tip,
			PromiseComponent,
		},
		data() {
			return {
				loading:false,
				loadingPageData: {
					// 自定义提示内容
					loadingText: '加载中',
					// 自定义图片
					image: '',
					// 自定义加载动画模式
					loadingMode: 'spinner',
					// 自定义背景色
					bgColor: 'rgba(0, 0, 0, 0.4)',
					color:'#eee'
				},
				goods_type: [], //货物类型
				showDusinessType: false,
				carShow: false,
				showState: false,
				scanTitle: '提示',
				scanContent: "该用户的网格证处于异常状态，无法操作进出东兴报备。如有疑问，请与所在村社区联系，待网格证状态正常后，即可正常进行报备。",
				familyList: [],
				apply: false,
				deptTree: [],
				maxentryPort: new Date().getTime() + 3600 * 24 * 2 * 1000,
				minentryPort: new Date().getTime(),
				entryPortDateShow: false,
				form: {
					driverType: 0,
					goodsType: 0,
					goodsTypeStr: "",
					numberPlate: "",
					outDest: null,
					_outDate: "",
					outDate: "",
					outDesc: "",
					outDestStr: "",
					userId: null,
					tempNormal: true,
					companyName: "",
				},
				testImages: [],
				agreeOrNot: false,
				userInfo: {},
				modal: {
					show: false,
					title: "",
					content: "",
				},
			};
		},
		async onLoad(option) {
			this.loading = true
			await this.load()
			this.loading = false
			this.userInfo = this.$store.state.userInfo;
			getAreaSimple(0).then((res) => {
				this.deptTree = tileCity(res);
				setTimeout(() => {
					if (this.form.outDest) {
						this.$refs.picker.inputSelected = this.form.outDest
							.split("/")
							.map((v) => ({
								text: v
							}));
					}
				});
			});
			if (option.apply) {
				this.apply = option.apply
			}
			if (option.id) {
				uni.showLoading();
				outReportQuery(option.id).then((res) => {
					this.form.outDest = res.outDest;
					this.form.outDestStr = res.outDestStr;
					this.form.permitAudit = res.permitAudit;
					this.form.outDesc = res.outDesc;
					this.form.numberPlate = res.numberPlate?res.numberPlate:'';
					this.form.goodsType = res.goodsType;
					this.form.driverType = res.driverType;
					this.goods_type.forEach(item => {
						if (item.dictValue == res.goodsType) {
							this.form.goodsTypeStr = item.dictLabel
						}
					})
					this.form.companyId = res.companyId;
					this.form.userId = res.userId;
					this.form.outDate = res.outDate.split(" ").shift();
					this.form._outDate = res.outDate;
					this.form.tempNormal = res.tempNormal;
					this.testImages = [res.hsUrl, res.healthUrl, res.routeUrl, res.otherUrl];
					if (this.deptTree.length) {
						setTimeout(() => {
							this.$refs.picker.inputSelected = res.outDest
								.split("/")
								.map((v) => ({
									text: v
								}));
						});
					}
				});
				this.reportId = option.id;
			}
			if (option.reject) {

				this.modal = {
					show: true,
					title: "驳回原因",
					content: option.reject,
				};
			}
		},
		onShow() {},
		methods: {

			confirm() {
				this.carShow = false
			},
			change(e) {
				this.form.numberPlate += e
			},
			backspace() {
				this.form.numberPlate = this.form.numberPlate.slice(0, -1)
			},
			businessTypeSelect(info) {
				console.log(info)
				this.showDusinessType = false
				this.form.goodsType = info.value[0].value
				this.form.goodsTypeStr = info.value[0].name
			},
			scanConfirm() {
				uni.navigateBack({
					delta: 1
				});
			},
			changeUserId(e) {
				var that = this
				if (e) {
					outReportLatest({
						params: {
							userId: e
						},
						custom: {
							toast: true,
							catch: true
						}
					}).then(res => {
						if (res && JSON.stringify(res) !== "{}") {
							if (res.valid != 3 && res.valid != 4) {
								uni.$u.toast("该用户已有审核中或未过期的报备记录,请在报备申请查询里查看！");
								return
							}
						}
					})
					this.familyList.forEach(item => {
						if (item.userId === e) {
							//查询网格证状态
							that.getUserState(item.idNumber)
						}
					})
				}
			},
			getUserState(idNumber) {
				userPassandrecordState(idNumber).then(res => {
					if (res && res.userState && res.userState != 'NORMAL') {
						this.showState = true
					}

				})
			},
			async load() {
				await Promise.all([
					getDictType("goods_type"),
					getfamilyList(),
				]).then(([goods, family]) => {
					this.familyList = family.map((v) => ({
						...v,
						value: v.userId,
						text: v.name,
					}));
					this.goods_type = goods.map((v) => ({
						...v,
						name: v.dictLabel,
						value: v.dictValue
					}));

				});
			},
			stepsearch() {},
			getArea(...argv) {
				const lastPid = argv[argv.length - 1];
				getArea(lastPid).then((res) => {
					res.forEach((item) => {
						item.children = [];
					});
					this.deptTree = res;
				});
			},

			bindPickerChange(val) {
				const list = val.detail.value.filter((v) => v);
				var companyName = [];
				for (let i = 0; i < list.length; i++) {
					companyName.push(list[i].text);
				}
				this.form.outDest = companyName ? companyName.join("/") : "";
			},
			entryPortDateShowConfirm(e) {
				this.entryPortDateShow = false;
				this.form.outDate = uni.$u.timeFormat(e.value, "yyyy-mm-dd");
				this.form._outDate = e.value;
			},

			submit() {
				this.checkPic();
				if (this.apply && !this.form.userId) {
					return uni.$u.toast("请选择报备申请人");
				}
				if (this.form.driverType == 1 && !this.form.numberPlate) {
					return uni.$u.toast("请输入车牌号");
				}
				// if (this.form.driverType == 1 && this.form.numberPlate && !uni.$u.test.carNo(this.form.numberPlate)){
				// 	return uni.$u.toast("请输入正确车牌号");
				// } 
				
				if (this.form.driverType == 1 && !this.form.goodsType) {
					return uni.$u.toast("请选择货物类型");
				} 
				if (this.form.driverType == 0){
					this.form.goodsType = null
					this.form.numberPlate = ''
				}

				if (!this.form.outDate) {
					return uni.$u.toast("请选择预计出东兴时间");
				} else if (this.judgeTime(this.form.outDate + " 00:00:00")) {
					return uni.$u.toast("预计出东兴时间不能为过去时间");
				}
				if (!this.form.outDesc) {
					return uni.$u.toast("请输入出东兴情况说明");
				}
				if (!this.form.outDest) {
					return uni.$u.toast("请选择出东兴目的地");
				}
				if (!this.form.outDestStr) {
					return uni.$u.toast("请输入目的地详细地址");
				}
				if (!this.form.hsUrl) {
					return uni.$u.toast("请上传48小时核酸证明");
				}
				if (!this.form.healthUrl) {
					return uni.$u.toast("请上传健康码");
				}
				if (!this.form.routeUrl) {
					return uni.$u.toast("请上传行程卡");
				}
				if (!this.agreeOrNot) {
					return uni.$u.toast("请同意个人承诺书");
				}
				const form = {
					...this.form
				};
				form.outDate += " 00:00:00";
				delete form._outDate;
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				let request = null;
				if (this.reportId && form.permitAudit == 0) {
					form.id = this.reportId;
					form.permitAudit = 0
					form.createTime = uni.$u.timeFormat(new Date(), 'yyyy-mm-dd hh:MM:ss')
					request = outReportUpdate(form, {
						custom: {
							toast: true,
							catch: true,
						},
					});
				} else {
					form.id = null
					request = outReport(form, {
						custom: {
							toast: true,
							catch: true,
						},
					});
				}
				request.then(() => {
					uni.showToast({
						title: `提交成功`,
						icon: "success",
						mask: true,
					});
					setTimeout(() => {
						uni.navigateBack({});
					}, 1500);
				});
				return;
			},

			checkPic() {
				this.form.hsUrl = this.testImages[0];
				this.form.healthUrl = this.testImages[1];
				this.form.routeUrl = this.testImages[2];
				this.form.otherUrl = this.testImages[3];
			},
		},
	};

	function tileCity(citys) {
		const root = [];
		const map = {};
		for (let city of citys) {
			if (city.pid == 0) {
				root.push(city);
				map[city.id] = city.children = [];
			} else {
				if (map[city.pid]) {
					map[city.pid].push(city);
					map[city.id] = city.children = [];
				}
			}
		}
		return root;
	}

	function timeStrToDate(time) {
		if (time instanceof Date) {
			return time;
		}
		const [year, month, date, hours, minutes, seconds] = time
			.split(/(-| |:)/g)
			.filter((v) => ![" ", "-", ":"].includes(v))
			.map((v) => Number(v));
		const d = new Date(year, month, date, hours, minutes, seconds);
		return d;
	}
</script>
<style>
	page {
		background: #f1f4f7;
	}
</style>
<style lang="scss" scoped>
	@import "./common.scss";

	.form-item-content.textarea {
		height: 208rpx !important;
		padding: 20rpx;
	}

	.add_address {
		image {
			width: 63rpx;
			height: 67rpx;
		}
	}

	.shop_div {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.footer {
		padding-top: 20rpx;
		padding-bottom: 148rpx;

		button {
			margin-top: 21rpx;
			width: 625rpx;
			height: 92rpx;
			background: #3a8cf0;
			border-radius: 8rpx;
			text-align: center;
			color: #fff;
			font-size: 33rpx;
		}
	}

	.current-people {
		background: #fff;
		margin-top: 42rpx;
		padding: 0 30rpx;
	}

	.address-info {
		background: #fff;
		padding: 0 30rpx;

		.return-home-day {
			border: 1px solid rgb(197, 197, 197);
			height: 60rpx;
			width: 200rpx;
			padding-left: 20rpx;
			margin-right: 200rpx;
			font-size: 26rpx;
		}
	}

	.add-people {
		background: rgb(246, 246, 246);

		.slide {
			padding: 30rpx 30rpx;
		}

		.title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: rgb(99, 99, 99);

			image {
				width: 63rpx;
				height: 67rpx;
			}
		}
	}
</style>
