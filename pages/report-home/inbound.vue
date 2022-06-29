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
					<input v-model="form.name" disabled="true" class="input" placeholder="请输入姓名" />
				</view>
			</view> -->
			<view class="form-item" v-if="apply">
				<view class="form-item-label">
					<text>*</text>
					选择报备申请人
				</view>
				<view class="form-item-content radio">
					<uni-section title="选择报备申请人" type="line">
						<uni-data-select v-model="URGlobalReport.userReport.userId" :localdata="familyList"
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
					<input v-model="form.idNumber" disabled="true" class="input" type="card" placeholder="请输入证件号码" />
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					手机号
				</view>
				<view class="form-item-content">
					<input v-model="form.phone" class="input" disabled="true" placeholder="请输入手机号" />
				</view>
			</view> -->
		</view>

		<view class="address-info">
			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					目的地社区/网格
				</view>
				<view class="form-item-content" style="padding-top: 5rpx; box-sizing: border-box">
					<uni-data-picker :localdata="deptTree" placeholder="点击选" popup-title="请选择社区/网格" :readonly="isTrue"
						v-model="URGlobalReport.companyId" :clear-icon='false' :map="{text:'label',value:'id'}"
						@change="bindPickerChange">
					</uni-data-picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					入境口岸
				</view>
				<view class="form-item-content">
					<input v-model="URGlobalReport.entryPort"  :maxlength='20' class="input" placeholder="请输入" :disabled="isTrue" />
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					入境时间
				</view>
				<view class="form-item-content">
					<input class="input" disabled v-model="URGlobalReport.entryPortDate"
						@click="entryPortDateShow = true" placeholder="请选择" />
					<u-datetime-picker :show="entryPortDateShow" :value="entryPortDate" mode="datetime"
						:minDate="minentryPort" :maxDate="maxentryPort" @confirm="entryPortDateShowConfirm"
						closeOnClickOverlay :immediateChange='true' @close="entryPortDateShow = false;"
						@cancel="entryPortDateShow = false;"></u-datetime-picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					入境前14日居住或途径的国家和地区
				</view>
				<view class="form-item-content textarea" >
					<textarea v-model="URGlobalReport.passedArea"  :maxlength='100' placeholder="请输入"></textarea>
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					解除隔离日期
				</view>
				<view class="form-item-content">
					<input class="input" disabled v-model="releaseDateStr" @click="releaseDateShow = true"
						placeholder="请选择" />
					<u-datetime-picker :show="releaseDateShow" :value="releaseDate" mode="date" :minDate="minentryPort"
						:maxDate="maxentryPort" @confirm="releaseDateConfirm" closeOnClickOverlay
						:immediateChange='true' @close="releaseDateShow = false;" @cancel="releaseDateShow = false;">
					</u-datetime-picker>
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
						:maxDate="maxDateTime" @confirm="birthDateConfirm" closeOnClickOverlay :immediateChange='true'
						@close="returnTimeShow = false;" @cancel="returnTimeShow = false;"></u-datetime-picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					进东兴交通方式
				</view>
				<view class="form-item-content">
					<input @click="showDusinessType = true" v-model="URGlobalReport.transportationStr" disabled
						class="input" placeholder="请选择" />
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					航班（车次/车牌号)
				</view>
				<view class="form-item-content">
					<input v-model="URGlobalReport.flight" :maxlength='50' class="input" placeholder="请输入" :disabled="isTrue" />
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					第一入境点城市
				</view>
				<view class="form-item-content">
					<picker mode="region" @change="chooseLocation" :readonly="isTrue">
						<input v-model="URGlobalReport.firstEntryCity" class="input" disabled placeholder="请选择" />
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					进东兴后目的地
				</view>

				<view class="form-item-content textarea">
					<textarea v-model="URGlobalReport.destAddr" disabled placeholder="请不要使用默认加载地址，搜索选择正确目的地"
						@click="getMapLocation"></textarea>

					<!-- <picker mode="region" @change="chooseLocationDestAddr">
						<input v-model="URDomesticReport.destAddr" class="input" disabled placeholder="请选择" />
					</picker> -->
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					目的地详细地址
				</view>
				<view class="form-item-content">
					<input v-model="URGlobalReport.destAddrDetail" class="input" placeholder="详细地址,例如1号楼1层101室"
						:readonly="isTrue" />
				</view>
			</view>

			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					来东兴目的
				</view>
				<view class="form-item-content">
					<input @click="showEnterPurpose=true" v-model="URGlobalReport.enterPurposeStr" disabled="true"
						class="input" placeholder="请选择" />
				</view>
			</view>
			<view class="form-item">
				<view class="form-item-label">
					<text>*</text>
					进东兴事由说明
				</view>
				<view class="form-item-content textarea">
					<textarea v-model="URGlobalReport.enterPurposeDetail" placeholder="请输入"></textarea>
				</view>
				
			</view>



			<Upload v-model="testImages" />
		</view>
		<div class="footer">
			<PromiseComponent v-model="agreeOrNot" />
			<button @click="submit"
				v-if='URGlobalReport.userReport.permitAudit!=1'>{{!URGlobalReport.userReport.urId?'提交':'修改'}}</button>
		</div>
		<Feedback />
		<u-picker :show="showDusinessType" title='交通方式' :columns="[user_transportation]" keyName="name"
			:immediateChange='true' @close="showDusinessType = false;" @cancel="showDusinessType = false;"
			@confirm='businessTypeSelect'>
		</u-picker>
		<u-picker :show="showEnterPurpose" title='入东兴目的' :columns="[user_enter_purpose]" keyName="name"
			:immediateChange='true' @close="showEnterPurpose = false;" @cancel="showEnterPurpose = false;"
			@confirm='user_enter_purposeSelect'>
		</u-picker>
		<u-modal :show="promptShow" title="驳回原因" confirmText='我知道了' @confirm="promptShow = false" :content='content'>
		</u-modal>
		<u-modal :show="showState" :title="scanTitle" :content='scanContent' confirmText="我知道了" @confirm='scanConfirm'></u-modal>
		<u-loading-page :loadingText="loadingPageData.loadingText" :image="loadingPageData.image"
			:loadingMode="loadingPageData.loadingMode" :bgColor="loadingPageData.bgColor" :loading="loading"
			:color="loadingPageData.color" :loadingColor="loadingPageData.loadingColor">
		</u-loading-page>
	</view>
</template>
<script>
	import Tip from "./components/tip.vue";
	import PromiseComponent from "./components/promiseReport.vue";
	import Feedback from "./components/feedback.vue";
	import Upload from "./components/upload.vue";
	import {
		checkPhone,
		checkLicensePlate,
		checkIdNo
	} from "@/util/regext";
	import {
		inReportLatest,
		getDictType,
		getfamilyList,
		getSpListByPage,
		userGlobalReported,
		userGlobalReportedInfo,
		updateGlobalReported,
		deptTreeselect,userPassandrecordState
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
			PromiseComponent
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
				showState:false,
				scanTitle:'提示',
				scanContent:"该用户的网格证处于异常状态，无法操作进出东兴报备。如有疑问，请与所在村社区联系，待网格证状态正常后，即可正常进行报备。",
				familyList: [],
				apply: false,
				content: '',
				promptShow: false,
				list: [],
				isTrue: false,
				entryPortDateShow: false,
				releaseDateShow: false,
				deptTree: [],
				form: {},
				tval: null,
				releaseDateStr: '',
				enterDate: '',
				releaseDate: Number(new Date()),
				birthDate: Number(new Date()),
				entryPortDate: Number(new Date()),
				maxentryPort: new Date().getTime(),
				minentryPort: new Date().getTime() - 3600 * 24 * 365 * 2 * 1000,
				maxDateTime: new Date().getTime() + 3600 * 24 * 2 * 1000,
				minDateTime: new Date().getTime(),
				carShow: false,
				showEnterPurpose: false,
				showDusinessType: false,
				returnTimeShow: false,
				agreeOrNot: false,
				passengerList: [],
				testImages: ["", "", "",''],
				documentTypeList: [],
				user_transportation: [], //交通方式
				user_profession: [], //人员类型
				user_enter_purpose: [], //入东兴目的
				URGlobalReport: {
					entryPort: '', //入境口岸
					entryPortDate: null, //入境时间
					firstEntryCity: '', //第一入境城市
					passedArea: '', //入境前14日居住或途径的国家和地区
					releaseDate: null, //解除隔离日期
					destAddr: '', //来东兴目的地
					destAddrDetail: '', //来东兴详细地址
					enterPurpose: null, //入东兴目的，字典user_enter_purpose
					enterPurposeDetail: '', //入东兴事由说明
					flight: '', //航班或车次
					highRisk: false, //14天是否到过中高风险地区
					originAddr: '', //	来源地
					tempNormal: true, //	当前体温状况
					transportation: null, //	交通方式，字典user_transportation
					userProfession: null, //	人员类型，字典user_profession
					userReport: {
						userId: null,
						deadlineTime: null, //	有效截止时间
						enterDate: null, //	预计进入东兴时间
						enterState: 0, //进出东兴市状态， 0 初始化， 1 已入东兴市， 2 已出东兴市
						healthUrl: null, //	健康码
						hsUrl: null, //	48小时核酸证明
						routeUrl: null, //	行程卡
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
						valid: 0, //是否在有效期内. 0 未审核， 1 已审核未起效， 2 已起效， 3 已过期
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
			this.loading = false
			if (option != null && option != "") {
				if (option.apply) {
					// uni.setNavigationBarTitle({
					// 	title: '代申请入境报备'
					// })
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
							// if (res.valid != 3 ) {
							// 	uni.$u.toast("该用户已有审核中或未过期的报备记录,请在报备申请查询里查看！");
							// 	return
							// }else if(res.valid == 4){
							// 	uni.$u.toast("该用户已有驳回报备记录,请在报备申请查询里修改！");
							// 	return
							// }
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
			bindPickerChange(val) {
				const list = val.detail.value.filter(v => v);
				var companyName = []
				for (let i = 0; i < list.length; i++) {
					companyName.push(list[i].text)
				}
				this.URGlobalReport.companyName = companyName ? companyName.join('/') : ""

			},
			getReportedInfo(id) {
				userGlobalReportedInfo({
					params: {
						id: id
					},
					custom: {
						toast: true,
						catch: true
					}
				}).then(res => {
					this.user_transportation.forEach(item => {
						if (item.dictValue == res.transportation) {
							res.transportationStr = item.dictLabel
						}
					})
					this.user_enter_purpose.forEach(item => {
						if (item.dictValue == res.enterPurpose) {
							res.enterPurposeStr = item.dictLabel
						}
					})
					var testImages = []
					testImages.push(res.userReport.hsUrl ? res.userReport.hsUrl : '')
					testImages.push(res.userReport.routeUrl ? res.userReport.routeUrl : '')
					testImages.push(res.userReport.healthUrl ? res.userReport.healthUrl : '')
					testImages.push(res.userReport.otherUrl ? res.userReport.otherUrl : '')
					this.testImages = testImages
					this.enterDate = uni.$u.timeFormat(res.userReport.enterDate, 'yyyy-mm-dd')
					this.releaseDateStr = uni.$u.timeFormat(res.userReport.releaseDateStr, 'yyyy-mm-dd')
					console.log(res)
					this.URGlobalReport = res
					if (res.userReport.permitAudit == 2) {
						this.promptShow = true
						this.content = res.userReport.rejectReason
					}
					console.log('状态', res.permitAudit)
					if (res.userReport.permitAudit == 1) {
						this.isTrue = true
					}
				})
			},

			
			removeDriverReportDests(index) {
				this.URGlobalReport.driverReportDests.splice(index, 1);
			},
			addDriverReportDests() {
				this.URGlobalReport.driverReportDests.push({
					confirm: false, //是否确认
					confirmDate: null, //确认时间
					spId: null, //社会场所id
					spName: '', //社会场所名称
					urId: null
				})
			},

			entryPortDateShowConfirm(e) {
				this.entryPortDateShow = false
				this.entryPortDate = e.value
				this.URGlobalReport.entryPortDate = uni.$u.timeFormat(e.value, 'yyyy-mm-dd hh:MM:00')
			},

			birthDateConfirm(e) {
				this.returnTimeShow = false
				this.birthDate = e.value
				this.enterDate = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				this.URGlobalReport.userReport.enterDate = uni.$u.timeFormat(e.value, 'yyyy-mm-dd 00:00:00')
			},
			releaseDateConfirm(e) {
				this.releaseDateShow = false
				this.releaseDate = e.value
				this.releaseDateStr = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				this.URGlobalReport.releaseDate = uni.$u.timeFormat(e.value, 'yyyy-mm-dd 00:00:00')
			},


			businessTypeSelect(info) {
				console.log(info)
				this.showDusinessType = false
				this.URGlobalReport.transportation = info.value[0].dictValue
				this.URGlobalReport.transportationStr = info.value[0].name
			},
			user_enter_purposeSelect(info) {
				console.log(info)
				this.showEnterPurpose = false
				this.URGlobalReport.enterPurpose = info.value[0].dictValue
				this.URGlobalReport.enterPurposeStr = info.value[0].name
			},
			async load() {
				await Promise.all([
					getDictType("user_transportation"),
					getDictType("user_profession"),
					getDictType("user_profession"),
					deptTreeselect(),
					getfamilyList(),
				]).then(([driver, goods, document, dept,family]) => {
					this.user_transportation = driver.map((v) => ({
						...v,
						name: v.dictLabel,
					}));
					var user_profession =  goods.filter(v => v.dictValue != 9 && v.dictValue != 10 && v.dictValue != 11);
					this.user_profession = user_profession.map((v) => ({
						...v,
						name: v.dictLabel,
						value: v.dictValue
					}));
					
					this.user_enter_purpose = user_profession.map((v) => ({
						...v,
						name: v.dictLabel,
					}));
					dept = dept.children
					this.deptTree = dept.filter(v => v.id != 377 && v.id != 382 && v.id != 386
					&& v.id != 437 && v.id != 438 && v.id != 439
					);

					this.familyList = family.map((v) => ({
						...v,
						value: v.userId,
						text: v.name,
					}));

				});
			},
			validityPeopleForm() {
				const {
					companyId,
					userReport,
					entryPort,
					passedArea,
					releaseDate,
					driverReportDests,
					transportation,
					flight,
					destAddr,
					destAddrDetail,
					firstEntryCity,
					enterPurpose,
					enterPurposeDetail
				} = this.URGlobalReport
				let message = ''
				if (!enterPurposeDetail) message = '请输入入东兴事由说明'
				if (!enterPurpose) message = '请选择入东兴目的'

				if (!destAddrDetail) message = '请输入目的地详细地址'
				if (!destAddr) message = '请选择进东兴目的地'
				if (!firstEntryCity) message = '请选择第一入境城市'
				if (!flight) message = '请输入航班或车次或车牌号'
				if (!transportation) message = '请选择进东兴交通方式'


				if (!userReport.enterDate) {
					message = '请选择进东兴时间'
				} else if(this.judgeTime(userReport.enterDate)) {
					message = '进东兴时间不能为过去时间'
				}

				if (!releaseDate) {
					message = '请选择隔离日期'
				}

				if (!passedArea) {
					message = '请输入入境前14日居住或途径的国家和地区'
				}

				if (!entryPort) {
					message = '请输入入境口岸'
				}
				if (!companyId) {
					message = '请选择社区/网格'
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
					this.URGlobalReport.firstEntryCity = res.detail.value.join('/')
				}

			},
			chooseLocationDestAddr(res) {
				console.log(res.detail.value);
				if (res.detail.value && res.detail.value.length > 0) {
					this.URGlobalReport.destAddr = res.detail.value.join('/')
				}

			},

			submit() {

				if (!this.validityPeopleForm()) {
					setTimeout(function() {}, 2000);
					return false
				}
				if (!this.checkPic()) {
					setTimeout(function() {}, 2000);
					return false
				}
				if (!this.agreeOrNot) {
					uni.$u.toast('请同意个人承诺书');
					return
				}
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				console.log(JSON.stringify(this.URGlobalReport))

				if (this.URGlobalReport.userReport.urId && this.URGlobalReport.userReport.permitAudit == 0) {
					this.URGlobalReport.permitAudit = 0
					this.URGlobalReport.userReport.createTime = uni.$u.timeFormat(new Date() , 'yyyy-mm-dd hh:MM:ss')   
					updateGlobalReported(this.URGlobalReport, {
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
					this.URGlobalReport.userReport.urId = null
					userGlobalReported(this.URGlobalReport, {
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
						this.URGlobalReport.userReport.hsUrl = this.testImages[i] //	48小时核酸证明
					} else if (i == 1) {
						this.URGlobalReport.userReport.routeUrl = this.testImages[i] //	
					} else if (i == 2) {
						this.URGlobalReport.userReport.healthUrl = this.testImages[i] //	
					} else if (i == 3) {
						this.URGlobalReport.userReport.otherUrl = this.testImages[i] //	
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
			},
			getMapLocation() {
				var that = this
				uni.chooseLocation({
					success: (res) => {
						console.log(res);
						if (res.errMsg === 'chooseLocation:ok') {
							console.log(res);
							that.URGlobalReport.destAddr = res.address + "(" + res.name + ")"
							// that.userInfo.addr = res.address
							// that.userInfo.lat = res.latitude
							// that.userInfo.lng = res.longitude
							// that.userInfo.addressName = res.name
						} else {
							uni.showToast({
								title: "选择地址失败",
								icon: "none",
								duration: 1000
							})
						}
						// this.getRegionFn(res);
					},
					fail: (err) => {
						if (err.errMsg === "chooseLocation:fail cancel") {
							// 用户手动关闭
							return;
						}
						// 如果用uni.chooseLocation没有获取到地理位置，则需要获取当前的授权信息，判断是否有地理授权信息
						uni.getSetting({
							success: (res) => {
								console.log(res);
								var status = res.authSetting;
								if (!status['scope.userLocation']) {
									// 如果授权信息中没有地理位置的授权，则需要弹窗提示用户需要授权地理信息
									uni.showModal({
										title: "是否授权当前位置",
										content: "需要获取您的地理位置，请确认授权，否则地图功能将无法使用",
										success: (tip) => {
											if (tip.confirm) {
												// 如果用户同意授权地理信息，则打开授权设置页面，判断用户的操作
												uni.openSetting({
													success: (data) => {
														// 如果用户授权了地理信息在，则提示授权成功
														if (data
															.authSetting[
																'scope.userLocation'
															] === true
														) {
															uni.showToast({
																title: "授权成功",
																icon: "success",
																duration: 1000
															})
															// 授权成功后，然后再次chooseLocation获取信息
															uni.chooseLocation({
																success: (
																	res
																	) => {
																	if (res
																		.errMsg ===
																		'chooseLocation:ok'
																		) {
																		that.URGlobalReport
																			.destAddr =
																			res
																			.address +
																			"(" +
																			res
																			.name +
																			")"
																		// that.userInfo.addr =res.address
																		// that.userInfo.lat =res.latitude
																		// that.userInfo.lng =res.longitude
																		// that.userInfo.addressName = res.name
																	} else {
																		uni.showToast({
																			title: "选择地址失败",
																			icon: "none",
																			duration: 1000
																		})
																	}
																}
															})
														} else {
															uni.showToast({
																title: "授权失败",
																icon: "none",
																duration: 1000
															})
														}
													}
												})
											}
										}
									})
								}
							},
							fail: (res) => {
								uni.showToast({
									title: "调用授权窗口失败",
									icon: "none",
									duration: 1000
								})
							}
						})
					}
				});
			},
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
