<template>
	<div class="backge">
		<view class="u-demo-block">
			<view class="u-demo-block__content">
				<div class="info" v-if="!userInfo.addr">
					<u-button type="primary" :plain="true" text="选择地址" @click="getMapLocation"></u-button>
				</div>
				<div class="info" v-if="userInfo.addr">
					<view class="address">
						<view >
							<view style="font-size: 30rpx;color: #000;">{{userInfo.addressName}}</view>
							<view style="font-size: 24rpx;color: rgba(0, 0, 0, 0.53);">{{userInfo.addr}}</view>
						</view>
						<view class="editAddress">
							<u-button type="primary" :plain="true" text="修改地址" @click="getMapLocation"></u-button>
						</view>
					</view>
				</div>
				<div class="info">
					<p class="name">详细地址</p>
					<div class="form-action">
						<u--input class="form-action" v-model="userInfo.houseNum" placeholder="详细地址,例如1层101室"
							border="none">
						</u--input>
					</div>
				</div>
				<div class="info">
					<p class="name">商家名称</p>
					<div class="form-action">
						<u--input class="form-action" v-model="userInfo.spName" :maxlength='20' placeholder="请输入商家名称" border="none">
						</u--input>
					</div>
				</div>
				<div class="info">
					<p class="name">商家类型</p>
					<div class="form-action" @click="showDusinessType = true">
						<u--input class="form-action" v-model="dusinessType" disabled disabledColor="#ffffff"
							placeholder="请选择商家类型" border="none"></u--input>
					</div>
					<div class="right">
						<u-icon slot="right" name="arrow-right"></u-icon>
					</div>
				
				</div>
				<div class="info">
					<p class="name">负责人姓名</p>
					<div class="form-action">
						<u--input class="form-action" v-model="userInfo.name" placeholder="请输入姓名" border="none">
						</u--input>
					</div>
				</div>
				<div class="info">
					<p class="name">证件类型</p>
					<div class="form-action" @click="showDocumentType = true">
						<u--input class="form-action" disabled v-model="documentType" disabledColor="#ffffff"
							placeholder="请选择证件类型" border="none"></u--input>
					</div>
					<div class="right">
						<u-icon slot="right" name="arrow-right"></u-icon>
					</div>
				</div>
				<div class="info">
					<p class="name">证件号码</p>
					<div class="form-action">
						<u--input v-model="userInfo.idNumber" placeholder="请输入证件号码" border="none"></u--input>
					</div>
				</div>
				<div class="info">
					<p class="name">联系电话</p>
					<div class="form-action">
						<u--input class="form-action" v-model="userInfo.phone" type='number' placeholder="请输入联系电话" border="none">
						</u--input>
					</div>
				</div>
				<!-- <div class="info">
					<p class="name">联系地址</p>
					<div class="textarea-action">
						<u--textarea border="none" v-model="userInfo.addr" placeholder="XX社区XX路XX店" count></u--textarea>
					</div>
				</div> -->
				
				<div class="info" v-if="userInfo.spType == '1'">
					<p class="name">是否为隔离点</p>
					<div class="form-action">
						<view style="position: relative;top: 9rpx;">
							<u-radio-group v-model="userInfo.isIsolate" placement="row">
								<u-radio :customStyle="{marginBottom: '20rpx'}" label="是" :name="true">
								</u-radio>
								<view style="width:40rpx">
								</view>
								<u-radio :customStyle="{marginBottom: '20rpx'}" label="否" :name="false">
								</u-radio>
							</u-radio-group>

						</view>
					</div>

				</div>
				<div class="promise">
					<Promise v-model="agreeOrNot" />
				</div>
				<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
				<u-action-sheet :show="showDocumentType" :actions="document_type" title="请选择证件类型"
					@close="showDocumentType = false;;" @select="documentTypeSelect">
				</u-action-sheet>
				<u-picker :show="showDusinessType" title='商家类型' :columns="[business_type]" keyName="name"  :immediateChange='true'
				@close="showDusinessType = false;" @cancel="showDusinessType = false;" @confirm='businessTypeSelect'
				></u-picker>
				<!-- <u-action-sheet :show="showDusinessType" :actions="business_type" title="请选择商家类型"
					@close="showDusinessType = false;" @select="businessTypeSelect">
				</u-action-sheet> -->
			</view>
		</view>
		<view class="u-demo-block">
			<view class="u-demo-block__content demo_div"
				style=" padding: 0 20px 20px 20px; flex-direction: column;align-items: stretch;flex-wrap: nowrap;">
				<u-button text="提交申请" @click="submit" size="large" type="primary"></u-button>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</div>
</template>

<script>
	import {
		userPermitApply,
		getDictType,
		userFamilyPermitApply,
		comeCodeApply,
	} from '../../common/api.js'
	import Promise from "@/components/promise.vue";
	import {
		checkPhone,
		checkLicensePlate,
		checkIdNo
	} from '@/util/regext'
	export default {
		components: {
			Promise
		},
		data() {
			return {
				agreeOrNot: false,
				showDusinessType: false,
				showDocumentType: false,
				documentType: '',
				dusinessType: '',
				userInfo: {
					addr: '',
					lng: '',
					lat: '',
					name: '',
					idNumber: '',
					phone: '',
					spType: '',
					spName: '',
					documentType: '',
					addressName: '',
					houseNum: '',
					isIsolate: false
				},
				document_type: [], //证件类型
				business_type: [], // 商家类型
			}
		},
		onLoad(option) {
			var that = this
			this.getDictType('business_type')
			this.getDictType('document_type')
		},
		methods: {
			/**
			 * 判断字符只能为字母或数字
			 * @param str
			 * @returns {boolean}
			 */
			containSpecial(s) {
				//判断是否有特殊字符串
				// var containSpecial = RegExp(
				// 	/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/
				// 	);
				// return (containSpecial.test(s));
				return /^[\da-z]+$/i.test(s);
			},
			businessTypeSelect(info) {
				console.log(info)
				this.showDusinessType = false
				this.userInfo.spType = info.value[0].value
				this.dusinessType = info.value[0].name
			},
			documentTypeSelect(info) {
				this.showDocumentType = false
				this.userInfo.documentType = info.value
				this.documentType = info.name
			},
			//获取用户信息
			getDictType(type) {
				getDictType(type).then(res => {
					if (res && JSON.stringify(res) !== "{}") {
						const typeList = []
						res.forEach(item => {
							typeList.push({
								name: item.dictLabel,
								value: item.dictValue
							})

						})
						if (type === 'business_type') {
							this.business_type = typeList;
							console.log('business_type',typeList)
						} else {
							this.document_type = typeList;
						}
					}
				})
			},
			validityPeopleForm() {
				const {
					spName,
					addr,
					name,
					idNumber,
					phone,
					spType,
					documentType
				} = this.userInfo
				let message = ''
				if (!addr) message = '请输选择地址'
				if (!spName) {
					message = '请输入商家名称'
				}
				if (this.dusinessType === '') message = '请选择商家类型'
				if (!name) {
					message = '请输入负责人姓名'
				}
				if (!idNumber){
					 message = '请输入证件号码'
				}else if (documentType === '身份证' && !checkIdNo(idNumber)){
					 message = '证件号码格式不正确'
				}else if(documentType !== '' && !uni.$u.test.enOrNum(idNumber)){
					message = '证件号码格式不正确'
				}
				
				if (documentType === '') message = '请选择证件类型'
				if (!checkPhone(phone)) message = '手机号码格式不正确'
				if (!phone) message = '请输入手机号码'
				
				
				if (message) {
					uni.$u.toast(message);
					return false
				}
				return true
			},

			submit() {
				// if (!this.validityPeopleForm()) return
				if (!this.validityPeopleForm()){
					setTimeout(function () {
					}, 2000);
					return false
				} 
				var that = this
				const params = Object.assign({}, this.userInfo, {})
				if (!this.userInfo.lat || !this.userInfo.lng) {
					return uni.$u.toast('请先选择地址')
				}
				if (!this.agreeOrNot) {
					return uni.$u.toast('请同意个人承诺书')
				}
				params.addr = params.addr + params.addressName + params.houseNum
				
				console.log(params)
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				comeCodeApply(params).then(res => {
					uni.showToast({
						title: '申请成功',
						icon: 'success',
						duration: 1000
					})

					uni.redirectTo({
						url: '/pages/nucleic/applylose'
					})
				})

				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				// this.$refs.form1.validate().then(res => {
				// 	var name = that.userInfo.name.replace(/\s+/g, "")
				// 	if (name == null || name == "" || name.length <= 1) {
				// 		uni.$u.toast('请输入正确姓名')
				// 		return false
				// 	}
				// 	var phone = that.userInfo.phone.replace(/\s+/g, "")
				// 	that.userInfo.phone = that.userInfo.phone.replace(/\s+/g, "")
				// 	if (phone == null || phone == "" || phone.length != 11) {
				// 		uni.$u.toast('请输入正确的手机号')
				// 		return false
				// 	}
				// 	var reg = /^\d{1,}$/
				// 	var pattern = new RegExp(reg);
				// 	if (!pattern.test(phone)) {
				// 		uni.$u.toast('请输入正确的手机号')
				// 		return false
				// 	}

				// 	var documentType = that.userInfo.documentType
				// 	if (documentType == null || documentType == "" || documentType.length == 0) {
				// 		uni.$u.toast('请选择证件类型')
				// 		return false
				// 	}
				// 	var idNumber = that.userInfo.idNumber.replace(/\s+/g, "")
				// 	that.userInfo.idNumber = that.userInfo.idNumber.replace(/\s+/g, "")
				// 	if (idNumber == null || idNumber == "" || idNumber.length <= 6) {
				// 		uni.$u.toast('请输入正确证件号码')
				// 		return false
				// 	}
				// 	if (!that.containSpecial(idNumber)) {
				// 		uni.$u.toast('请输入正确证件号码！')
				// 		return false
				// 	}
				// 	var addr = that.userInfo.addr.replace(/\s+/g, "")
				// 	if (addr == null || addr == "" || addr.length < 10) {
				// 		uni.$u.toast('居住地址不得少于个字符')
				// 		return false
				// 	}
				// 	var address = that.userInfo.address.replace(/\s+/g, "")
				// 	if (address == null || address == "" || address.length < 10) {
				// 		uni.$u.toast('户籍地址不得少于10个字符')
				// 		return false
				// 	}


				// 	var hsCode = that.userInfo.hsCode.replace(/\s+/g, "")
				// 	if (hsCode == null || hsCode == "" || hsCode.length <= 0) {
				// 		uni.$u.toast('核酸码为空，请返回重试')
				// 		return false
				// 	}
				// 	console.log(that.userInfo)
				// 	if (that.lockType) {
				// 		that.lockType = false
				// 		uni.showLoading({
				// 			title: '加载中',
				// 			mask: false
				// 		});
				// 		if (that.actingType == '1') {
				// 			userFamilyPermitApply(that.userInfo, {
				// 				custom: {
				// 					toast: false,
				// 					catch: true
				// 				}
				// 			}).then(ress => {
				// 				if (ress) {
				// 					uni.showToast({
				// 						title: '代申请成功',
				// 						icon: 'success',
				// 						duration: 2000
				// 					});
				// 					setTimeout(() => {
				// 						uni.reLaunch({
				// 							url: '/pages/nucleic/family',
				// 						})
				// 					}, 2000)
				// 				}

				// 			}).catch(err => {
				// 				uni.$u.toast(err.msg)
				// 				that.lockType = true
				// 			})
				// 		} else {
				// 			userPermitApply(that.userInfo, {
				// 				custom: {
				// 					toast: false,
				// 					catch: true
				// 				}
				// 			}).then(resz => {
				// 				if (resz) {
				// 					uni.showToast({
				// 						title: '申请成功',
				// 						icon: 'success',
				// 						duration: 2000
				// 					});
				// 					setTimeout(() => {
				// 						uni.redirectTo({
				// 							url: '/pages/nucleic/apply',
				// 						})
				// 					}, 2000)
				// 				}

				// 			}).catch(err => {
				// 				uni.$u.toast(err.msg)
				// 				that.lockType = true
				// 			})
				// 		}

				// 	} else {
				// 		console.log(that.lockType)
				// 	}


				// }).catch(errors => {
				// 	// uni.$u.toast('校验失败')
				// })
			},
			getMapLocation() {
				var that = this
				uni.chooseLocation({
					success: (res) => {
						console.log(res);
						if (res.errMsg === 'chooseLocation:ok') {
							console.log(res);
							that.userInfo.addr = res.address
							that.userInfo.lat = res.latitude
							that.userInfo.lng = res.longitude
							that.userInfo.addressName = res.name
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
																success: (res) => {
																	if (res.errMsg ==='chooseLocation:ok') {
																		that.userInfo.addr =res.address
																		that.userInfo.lat =res.latitude
																		that.userInfo.lng =res.longitude
																		that.userInfo.addressName = res.name
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
			hideKeyboard() {
				uni.hideKeyboard()
			}
		},
	}
</script>

<style lang="scss" scoped>
	.backge {
		min-height: 100vh;
		width: 100%;
		background: #F1F4F7;

		box-sizing: border-box;
		padding: 40upx 0 0 0;

		.info {
			width: 658upx;
			min-height: 88upx;
			border-radius: 8upx;
			margin: 0 auto 40upx;
			position: relative;

			.name {
				width: 180upx;
				height: 88upx;
				font-size: 30upx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 88upx;
				position: absolute;
				text-align: right;
			}

			.form-action,
			.textarea-action {
				width: 452upx;
				border-radius: 8upx;
				background-color: #fff;
				margin-left: 206upx;
				padding: 22upx 32upx;
				box-sizing: border-box;
			}

			.textarea-action {
				height: 200upx;
				padding: 0;
			}
		}

		/deep/ .u-textarea {
			padding: 22upx 32upx;
		}

		.right {
			width: 28upx;
			height: 36upx;
			position: absolute;
			right: 34upx;
			top: 30rpx;
		}
	}

	.body {
		padding: 0 30rpx;
		display: flex;
		font-size: 26rpx;
		font-weight: bold;

		text {
			color: #3a8cf0;
			letter-spacing: -4rpx;

			&::before {
				content: "<< ";
			}

			&::after {
				content: " >>";
			}
		}
	}
	.address{
		background-color: #ffffff;
		    padding: 30rpx;
		    display: flex;
		    align-items: center;
		    justify-content: space-between;
	}
	.editAddress {
		width: 150rpx;
	}


	.promise {
		margin-left: 60rpx;
	}
</style>
