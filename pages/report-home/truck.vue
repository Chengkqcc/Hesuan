<template>
	<view>
		<Tip />
		<view class="current-people">
			<view class="form-item" v-if="apply">
				<view class="form-item-label">
					<text>*</text>
					选择报备申请人
				</view>
				<view class="form-item-content radio">
					<uni-section title="选择报备申请人" type="line">
						<uni-data-select v-model="URDriverReport.userReport.userId" :localdata="familyList"
							@change="changeUserId"></uni-data-select>
					</uni-section>
				</view>
			</view>
			<!-- <view class="form-item no-require">
				<view class="form-item-label">
					<text>*</text>
					证件类型
				</view>
				<view class="form-item-content radio">
					<u-radio-group v-model="form.documentType" disabled="true">
						<u-radio :customStyle="{ marginRight: '40rpx' }" :name="1" label="身份证"
							activeColor="rgb(8,192,96)">
						</u-radio>
						<u-radio :name="2" label="护照" activeColor="rgb(8,192,96)"></u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					证件号码
				</view>
				<view class="form-item-content">
					<input v-model="form.idNumber" disabled="true" class="input" placeholder="请输入证件号码" />
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					手机号
				</view>
				<view class="form-item-content">
					<input v-model="form.phone" type="number" class="input" disabled="true" placeholder="请输入手机号" />
				</view>
			</view> -->
			<!-- <view class="form-item" style="overflow: hidden">
				<view class="add-people-btn" @click="addPassengerList">添加同乘人+</view>
			</view> -->
		</view>
		<view class="add-people">
			<view class="slide" v-for="(item, idx) in URDriverReport.userReport.userPeers" :key="idx">
				<view class="title">
					<view>同乘人{{ idx + 1 }}</view>
					<image @click="removePassengerList(idx)" src="@/static/report-home/icon_jian.png" />
				</view>

				<view class="form-item">
					<view class="form-item-label">
						<text>*</text>
						姓名
					</view>
					<view class="form-item-content">
						<input v-model="item.name" class="input" :maxlength='20' placeholder="请输入姓名"
							:disabled="isTrue" />
					</view>
				</view>
				<view class="form-item">
					<view class="form-item-label">
						<text>*</text>
						证件类型
					</view>
					<view class="form-item-content radio">
						<uni-section title="请选择" type="line">
							<uni-data-select v-model="item.documentType" :localdata="document_type"></uni-data-select>
						</uni-section>
					</view>
				</view>
				<view class="form-item">
					<view class="form-item-label">
						<text>*</text>
						证件号码
					</view>
					<view class="form-item-content">
						<input class="input" v-model="item.idNumber" :maxlength='20' type="card" placeholder="请输入证件号码"
							:disabled="isTrue" />
					</view>
				</view>
				<view class="form-item">
					<view class="form-item-label">
						<text>*</text>
						手机号
					</view>
					<view class="form-item-content">
						<input class="input" v-model="item.phone" :maxlength='13' type="number" placeholder="请输入"
							:disabled="isTrue" />
					</view>
				</view>
			</view>
		</view>
		<view class="address-info">
			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					始发地
				</view>
				<view class="form-item-content">
					<picker mode="region" @change="chooseLocation">
						<input v-model="URDriverReport.origin" class="input" disabled placeholder="请选择" />
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					始发地详细地址
				</view>
				<view class="form-item-content">
					<input v-model="URDriverReport.originDetail" :maxlength='100' class="input" placeholder="请输入"
						:disabled="isTrue" />
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					预计进入东兴时间
				</view>
				<view class="form-item-content">
					<input class="input" disabled v-model="enterDate" @click="returnTimeShow = true"
						placeholder="请选择" />
					<u-datetime-picker :show="returnTimeShow" :value="birthDate" mode="date" :minDate="minDateTime"
						:maxDate="maxDateTime" @confirm="birthDateConfirm" closeOnClickOverlay :immediateChange="true"
						@close="returnTimeShow = false" @cancel="returnTimeShow = false"></u-datetime-picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					车牌号
				</view>
				<view class="form-item-content">
					<input @click="carShow = true" disabled v-model="URDriverReport.numberPlate" class="input"
						placeholder="请输入" />
				</view>
			</view>

			<!-- <view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					申请类型
				</view>
				<view class="form-item-content">
					<u-radio-group v-model="URDriverReport.applyType">
						<u-radio:customStyle="{ marginRight: '40rpx' }" :name="1" label="运送货物"
							activeColor="rgb(8,192,96)"></u-radio>
						<u-radio:customStyle="{ marginRight: '40rpx' }" :name="2" label="临时过境"
							activeColor="rgb(8,192,96)"></u-radio>
					</u-radio-group>
				</view>
			</view> -->



			<view class="form-item" style="padding-left: 0px" v-for="(item, index) in URDriverReport.driverReportDests"
				:key="index">
				<view class="shop_div">
					<view class="form-item-label">
						<text>*</text>
						目的地{{ index == 0 ? "" : index + 1 }}
					</view>
					<view class="add_address">
						<image v-if="index == 0" @click="addDriverReportDests"
							src="@/static/report-home/icon_jia.png" />
						<image v-else @click="removeDriverReportDests(index)"
							src="@/static/report-home/icon_jian.png" />
					</view>
				</view>

				<view class="form-item-content" style="padding-left: 0px">
					<!-- 通用写法 -->
					<Destination :spId='item.spId' :index="index" :list.sync="item.listShop"
						@selectitem="selectitem($event, index)" />

				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					货物种类
				</view>
				<view class="form-item-content">
					<input @click="showDusinessType = true" v-model="URDriverReport.goodsTypeStr" disabled class="input"
						placeholder="请选择" />
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					是否需要代驾
				</view>
				<view class="form-item-content radio">
					<u-radio-group v-model="URDriverReport.chauffeuring" :disabled="isTrue">
						<u-radio :customStyle="{ marginRight: '40rpx' }" :name="true" label="是"
							activeColor="rgb(8,192,96)">
						</u-radio>
						<u-radio :name="false" label="否" activeColor="rgb(8,192,96)"></u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					是否当天返回
				</view>
				<view class="form-item-content radio">
					<u-radio-group v-model="URDriverReport.returnSameDay" :disabled="isTrue">
						<u-radio :customStyle="{ marginRight: '40rpx' }" :name="true" label="是"
							activeColor="rgb(8,192,96)">
						</u-radio>
						<u-radio :name="false" label="否" activeColor="rgb(8,192,96)"></u-radio>
					</u-radio-group>
					<input class="return-home-day" type="number" v-if="!URDriverReport.returnSameDay"
						v-model="URDriverReport.overnightDays" :disabled="isTrue" placeholder="请输入天数" />
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					司机类型
				</view>
				<view class="form-item-content radio">
					<u-radio-group v-model="URDriverReport.driverType" :disabled="isTrue">
						<u-radio v-for="doc in driver_type" :label="doc.name" :name="parseInt(doc.dictValue)"
							activeColor="rgb(8,192,96)" :customStyle="{ marginRight: '40rpx' }" :key="doc.dictCode">
						</u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					14天内是否有发热，咳嗽等不适症状
				</view>
				<view class="form-item-content radio">
					<u-radio-group v-model="URDriverReport.highRisk" :disabled="isTrue">
						<u-radio :customStyle="{ marginRight: '40rpx' }" :name="true" label="是"
							activeColor="rgb(8,192,96)">
						</u-radio>
						<u-radio :name="false" label="否" activeColor="rgb(8,192,96)"></u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					14天内是否到达过中高风险地区
				</view>
				<view class="form-item-content radio">
					<u-radio-group v-model="URDriverReport.physicalAbnormality" :disabled="isTrue">
						<u-radio :customStyle="{ marginRight: '40rpx' }" :name="true" label="是"
							activeColor="rgb(8,192,96)">
						</u-radio>
						<u-radio :name="false" label="否" activeColor="rgb(8,192,96)"></u-radio>
					</u-radio-group>
				</view>
			</view>
			<Upload v-model="testImages" />
		</view>
		<div class="footer">
			<PromiseComponent v-model="agreeOrNot" />
			<button @click="submit" v-if="URDriverReport.userReport.permitAudit != 1">
				{{ !URDriverReport.userReport.urId ? "提交" : "修改" }}
			</button>
		</div>
		<Feedback />
		<u-picker :show="showDusinessType" title="货物类型" :columns="[goods_type]" keyName="name" :immediateChange="true"
			@close="showDusinessType = false" @cancel="showDusinessType = false" @confirm="businessTypeSelect">
		</u-picker>

		<u-keyboard mode="" :tips="
        URDriverReport.numberPlate
          ? URDriverReport.numberPlate
          : '请输入车牌号码'
      " :dotDisabled="false" :random="false" :show="carShow" @close="carShow = false" @cancel="carShow = false"
			@confirm="confirm" @change="change" @backspace="backspace"></u-keyboard>
		<u-modal :show="promptShow" title="驳回原因" confirmText="我知道了" @confirm="promptShow = false" :content="content">
		</u-modal>
		<u-modal :show="showState" :title="scanTitle" :content='scanContent' confirmText="我知道了" @confirm='scanConfirm'>
		</u-modal>
		<u-loading-page :loadingText="loadingPageData.loadingText" :image="loadingPageData.image"
			:loadingMode="loadingPageData.loadingMode" :bgColor="loadingPageData.bgColor" :loading="loading"
			:color="loadingPageData.color" :loadingColor="loadingPageData.loadingColor">
		</u-loading-page>
	</view>
</template>
<script>
	import Tip from "./components/driverTip.vue";
	import PromiseComponent from "./components/promiseReport.vue";
	import Feedback from "./components/feedback.vue";
	import Upload from "./components/upload.vue";
	import Destination from './components/destination.vue'
	import {
		checkPhone,
		checkLicensePlate,
		checkIdNo
	} from "@/util/regext";
	import {
		inReportLatest,
		getShopInfo,
		getDictType,
		getfamilyList,
		reported,
		userReportedInfo,
		checkLogin,
		getUserDetailInfo,
		updateReported,
		getSpListByPage,
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
			Destination
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
				showState: false,
				scanTitle: '提示',
				scanContent: "该用户的网格证处于异常状态，无法操作进出东兴报备。如有疑问，请与所在村社区联系，待网格证状态正常后，即可正常进行报备。",
				familyList: [],
				apply: false,
				content: '',
				promptShow: false,
				isTrue: false,
				form: {},
				tval: null,
				birthDate: Number(new Date()),
				maxDateTime: new Date().getTime() + 3600 * 24 * 2 * 1000,
				minDateTime: new Date().getTime(),
				carShow: false,
				showDusinessType: false,
				returnTimeShow: false,
				agreeOrNot: false,
				enterDate: '',
				listShop: [],
				passengerList: [],
				testImages: ["", "", "", ''],
				documentTypeList: [],
				driver_type: [], //司机类型
				goods_type: [], //货物类型
				document_type: [], //证件类型
				URDriverReport: {
					chauffeuring: false, //是否需要代驾
					chauffeuringName: '',
					chauffeuringPhone: '',
					destCnt: 0, //目的地数量
					driverReportDests: [ //目的地列表

						// URDriverReportDest
						{
							listShop: null,
							confirm: false, //是否确认
							confirmDate: null, //确认时间
							spId: null, //社会场所id
							spName: '', //社会场所名称
							urId: null,
							data: null
						}
					],
					driverType: 2, //司机类型，字典driver_type
					goodsType: null, //货物类型，字典goods_type
					highRisk: false, //14天是否到过中高风险地区
					numberPlate: '', //	车牌号
					origin: null, //	始发地
					originDetail: null, //	始发地详细地址
					overnight: false, //	是否过夜
					overnightDays: null, //	需要过夜天数
					physicalAbnormality: false, //	14天是否有发热咳嗽等不适症状
					returnSameDay: true, //是否当天返回，
					urId: null,
					userReport: {
						userId: null,
						deadlineTime: null, //	有效截止时间
						enterDate: null, //	预计进入东兴时间
						hsUrl: null, //	48小时核酸证明
						routeUrl: null, //	行程卡
						healthUrl: null, //	健康码
						otherUrl: null, //	其他
						iso: null, //	是否需要闭环管理
						isoConfirm: null, //	隔离到店确认
						isoConfirmDate: null, //	确认时间
						isoEndDate: null, //	隔离结束时间
						isoSPId: null, //	隔离场所id
						isoStartDate: null, //	隔离开始时间
						isoType: null, //	隔离方式，字典iso_type, 0 居家， 1 集中
						permitAudit: 0, //	审核状态，字典permit_audit
						rejectReason: null, //	驳回原因
						reportType: null, //	报备类型
						userPeerCnt: null, //	同行人员数量
						userPeers: [ //同行人员列表
							// {
							// 	documentType: null, //	证件类型，字典document_type
							// 	idNumber: null,
							// 	name: null,
							// 	phone: null,
							// 	urId: null,
							// }

						],
						verifySysUserId: null, //审核人
						verifyTime: null, //审核时间
					}
				},
			};
		},
		async onLoad(option) {
			this.form = this.$store.state.userInfo
			this.loading = true
			await this.load();
			await this.getList()
			console.log('接口调用完成')
			this.loading = false
			if (option != null && option != "") {
				if (option.apply) {
					this.apply = option.apply
				}
				var data = option.id; // 字符串转对象
				if (data) {
					this.getReportedInfo(data)
				}

			}

		},
		onShow() {

		},

		methods: {
			scanConfirm() {
				uni.navigateBack({
					delta: 1
				});
			},

			changeUserId(e) {
				var that = this
				if (e) {
					inReportLatest({
						params: {
							userId: e
						},
						custom: {
							toast: true,
							catch: true
						}
					}).then(res => {
						console.log(res)
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


			checkLogin(code) {
				checkLogin({
					params: {
						code: code
					},
					custom: {
						toast: false,
						catch: true
					}
				}).then((res) => {
					if (res.token) {
						uni.setStorageSync("token", res.token);
						this.$store.dispatch("setLoginStatus", true);
						this.getUserInfo();
					}
				}).catch(err => {

					console.log('err', err)
				});
			},
			getUserInfo() {
				getUserDetailInfo().then((res) => {
					this.form = res;
					this.$store.dispatch("setUserInfo", res);
				}).catch(err => {

				});
			},

			async getShopInfo(id) {
				var data = {}
				if (id) {
					await getShopInfo({
						params: {
							id: id
						},
						custom: {
							toast: true,
							catch: true
						}
					}).then(res => {
						data = res
					})
				}
				return data
			},
			async getReportedInfo(id) {
				var resData = ""
				await userReportedInfo({
					params: {
						id: id
					},
					custom: {
						toast: true,
						catch: true
					}
				}).then(res => {
					this.goods_type.forEach(item => {
						if (item.dictValue == res.goodsType) {
							res.goodsTypeStr = item.dictLabel
						}
					})
					var testImages = []
					testImages.push(res.userReport.hsUrl ? res.userReport.hsUrl : '')
					testImages.push(res.userReport.routeUrl ? res.userReport.routeUrl : '')
					testImages.push(res.userReport.healthUrl ? res.userReport.healthUrl : '')
					testImages.push(res.userReport.otherUrl ? res.userReport.otherUrl : '')
					this.testImages = testImages
					this.enterDate = uni.$u.timeFormat(res.userReport.enterDate, 'yyyy-mm-dd')
					if (res.userReport.userPeers && res.userReport.userPeers.length > 0) {
						res.userReport.userPeers.forEach(item => {
							item.documentType = item.documentType + ''
						})
					}
					resData = res

				})
				if (resData.driverReportDests && resData.driverReportDests.length > 0) {

					console.log(resData.driverReportDests)
					var arr = []
					for (let item of resData.driverReportDests) {
						arr.push(await this.getShopInfo(item.spId))
						arr = [...arr, ...this.listShop];
						item.listShop = this.unique(arr, 'spId')

					}

				}




				this.URDriverReport = resData
				if (resData.userReport.permitAudit == 2) {
					this.promptShow = true
					this.content = resData.userReport.rejectReason
				}
				if (resData.userReport.permitAudit == 1) {
					this.isTrue = true
				}

			},

			unique(arr, key) {
				if (!arr) return arr
				if (key === undefined) return [...new Set(arr)]
				const map = {
					'string': e => e[key],
					'function': e => key(e),
				}
				const fn = map[typeof key]
				const obj = arr.reduce((o, e) => (o[fn(e)] = e, o), {})
				return Object.values(obj)
			},

			removeDriverReportDests(index) {
				this.URDriverReport.driverReportDests.splice(index, 1);
			},
			addDriverReportDests() {
				this.URDriverReport.driverReportDests.push({
					listShop: this.listShop,
					confirm: false, //是否确认
					confirmDate: null, //确认时间
					spId: null, //社会场所id
					spName: '', //社会场所名称
					urId: null
				})
			},
			selectitem(e, index) {
				this.URDriverReport.driverReportDests.forEach((item, i) => {
					if (i == index) {
						item.spId = e.spId
						item.spName = e.spName
					}
				})

				console.log(this.URDriverReport.driverReportDests);
			},
			birthDateConfirm(e) {
				this.returnTimeShow = false
				this.birthDate = e.value
				this.enterDate = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				this.URDriverReport.userReport.enterDate = uni.$u.timeFormat(e.value, 'yyyy-mm-dd 00:00:00')
			},
			confirm() {
				this.carShow = false
			},
			change(e) {
				this.URDriverReport.numberPlate += e
			},
			backspace() {
				this.URDriverReport.numberPlate = this.URDriverReport.numberPlate.slice(0, -1)
			},
			businessTypeSelect(info) {
				console.log(info)
				this.showDusinessType = false
				this.URDriverReport.goodsType = info.value[0].value
				this.URDriverReport.goodsTypeStr = info.value[0].name
			},
			async getList() {
			 await	getSpListByPage({
					page: 1,
				}).then((res) => {
					this.listShop = res.list;
					if (this.URDriverReport.driverReportDests && this.URDriverReport.driverReportDests.length >
						0) {
						if (!this.URDriverReport.driverReportDests[0].listShop) {
							this.URDriverReport.driverReportDests[0].listShop = res.list
						}
					}
					console.log('获取商户列表')
				});
			},
			async load() {
				
				
				await Promise.all([
					getDictType("driver_type"),
					getDictType("goods_type"),
					getDictType("document_type"),
					getfamilyList(),
				]).then(([driver, goods, document, family]) => {
					this.driver_type = driver.map((v) => ({
						...v,
						name: v.dictLabel,
					}));
					this.goods_type = goods.map((v) => ({
						...v,
						name: v.dictLabel,
						value: v.dictValue
					}));
					this.document_type = document.map((v) => ({
						...v,
						name: v.dictLabel,
						text: v.dictLabel,
						value: v.dictValue,
					}));

					this.familyList = family.map((v) => ({
						...v,
						value: v.userId,
						text: v.name
					}));
					console.log(this.familyList)
					console.log('基础数据加载完成')
				});
			},
			validityPeopleForm() {
				const {
					userReport,
					origin,
					returnSameDay,
					overnightDays,
					originDetail,
					numberPlate,
					driverReportDests,
					goodsType,
				} = this.URDriverReport
				let message = ''

				if (!returnSameDay && !overnightDays) {
					message = '请输入天数'
				}

				if (!goodsType) message = '选择货物种类'
				for (var i = 0; i < driverReportDests.length; i++) {
					if (!driverReportDests[i].spId) {
						message = '请选择目的地商区'
						break
					}
				}
				// if (numberPlate && !uni.$u.test.carNo(numberPlate)) message = '请输入正确车牌号'
				if (!numberPlate) message = '请输入车牌号'
				if (!userReport.enterDate) {
					message = '请选择进东兴时间'
				} else if(this.judgeTime(userReport.enterDate)) {
					message = '进东兴时间不能为过去时间'
				}


				if (!originDetail) {
					message = '请输入始发地详细地址'
				}
				if (!origin) {
					message = '请选择始发地'
				}

				if (userReport.userPeers && userReport.userPeers.length > 0) {
					for (var i = 0; i < userReport.userPeers.length; i++) {
						if (!userReport.userPeers[i].name) {
							message = '请输入同乘人名字'
							break
						}
						if (!userReport.userPeers[i].phone) {
							message = '请输入同乘人手机号'
							break
						} else if (!checkPhone(userReport.userPeers[i].phone)) {
							message = '同乘人手机号码格式不正确'
							break
						}
						if (!userReport.userPeers[i].idNumber) {
							message = '请输入证件号码'
							break
						} else if (userReport.userPeers[i].documentType == 1 && !checkIdNo(userReport.userPeers[i]
								.idNumber)) {
							message = '证件号码格式不正确'
							break
						} else if (!uni.$u.test.enOrNum(userReport.userPeers[i].idNumber)) {
							message = '证件号码格式不正确'
							break
						}
					}
				}
				if (this.apply && !userReport.userId) message = '请选择选择报备申请人'

				if (message) {
					uni.$u.toast(message);
					return false
				}
				return true
			},
			

			chooseLocation(res) {
				console.log(res.detail.value);
				if (res.detail.value && res.detail.value.length > 0) {
					this.URDriverReport.origin = res.detail.value.join('/')
				}

			},
			addPassengerList() {
				this.URDriverReport.userReport.userPeers.push({
					documentType: '1', //	证件类型，字典document_type
					idNumber: null,
					name: null,
					phone: null,
					urId: null,
				});
			},
			removePassengerList(idx) {
				this.URDriverReport.userReport.userPeers.splice(idx, 1);
			},
			submit() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				if (!this.validityPeopleForm()) {
					setTimeout(function() {}, 2000);
					return false
				}
				if (!this.checkPic()) {
					setTimeout(function() {}, 2000);
					return false
				}
				if (!this.agreeOrNot) {
					uni.hideLoading();
					uni.$u.toast('请同意个人承诺书');
					return
				}
				console.log(this.URDriverReport.userReport)
				if (this.URDriverReport.userReport.urId && this.URDriverReport.userReport.permitAudit == 0) {
					this.URDriverReport.permitAudit = 0
					this.URDriverReport.userReport.createTime = uni.$u.timeFormat(new Date() , 'yyyy-mm-dd hh:MM:ss')   
					updateReported(this.URDriverReport, {
						custom: {
							toast: true,
							catch: true
						}
					}).then(res => {
						uni.hideLoading();
						uni.showToast({
							title: '提交成功',
							icon: 'success',
							mask: true
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
							// uni.redirectTo({
							// 	url: './search'
							// });
						}, 1500)
					}).catch(err => {

					})
				} else {
					this.URDriverReport.userReport.urId = null
					reported(this.URDriverReport, {
						custom: {
							toast: true,
							catch: true
						}
					}).then(res => {
						uni.hideLoading();
						uni.showToast({
							title: '提交成功',
							icon: 'success',
							mask: true
						})
						setTimeout(() => {
							uni.redirectTo({
								url: './search'
							});
						}, 1500)
					}).catch(err => {

					})
				}

			},

			checkPic() {
				var index = -1
				console.log(this.testImages)
				for (var i = 0; i < this.testImages.length; i++) {
					if (i == 0) {
						this.URDriverReport.userReport.hsUrl = this.testImages[i] //	48小时核酸证明
					} else if (i == 1) {
						this.URDriverReport.userReport.routeUrl = this.testImages[i] //	
					} else if (i == 2) {
						this.URDriverReport.userReport.healthUrl = this.testImages[i] //	
					} else if (i == 3) {
						this.URDriverReport.userReport.otherUrl = this.testImages[i] //	
					}
					console.log(this.testImages[i])
					if (!this.testImages[i]) {
						index = i
						break
					}
				}
				if (index === 0) {
					return toast("请上传48小时核酸证明"), false;
				} else if (index === 1) {
					return toast("请上传行程卡"), false;
				} else if (index === 2) {
					return toast("请上传健康码"), false;
				}
				return true
			}
		},
	};
</script>
<style>
	page {
		background: #f1f4f7;
	}
</style>
<style lang="scss" scoped>
	@import "./common.scss";

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
