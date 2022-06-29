<template>
	<div class="backge">
		<view class="u-page">
			<view class="u-demo-block">
				<text class="u-demo-block__title">问题和意见</text>
				<div class="count">{{askContent.length}}/200</div>
				<view class="textarea-action">
					{{askContent}}
				</view>
				<view class="img-content">
					<text class="u-demo-block__title" style="margin-top: 30upx;"
						v-if="fileList5.length > 0">图片（选填，提供问题截图）</text>
					<image v-for="(item,index) in fileList5" v-if="item" :src="item" @click="previewImage(index)" class="question-img" mode="aspectFill"
						alt="" srcset="" />
					<div class="img-count">{{fileList5.length}}/3</div>
				</view>

			</view>
			<view class="callback" v-if="answerContent">
				<view class="desc">
					回复
				</view>
				<div class="callback-content">
					{{answerContent}}
				</div>
			</view>
			<u-toast ref="uToast"></u-toast>
		</view>
	</div>
</template>

<script>
	import {
		getOpenId,
		getCompanyByHsCodeV2,
		getCardDetail,
		getUploadToken,
		addFead
	} from '../../common/api.js'
	import config from '@/common/config'
	export default {
		data() {
			return {
				value2: '',
				openId: '',
				qiniuToken: '',
				actingType: "2",
				lockType: true,
				show3: false,
				qiniuToken: '',
				userInfo: {},
				cardImgData: {},
				content: '证件信息未识别，现在去手动填写信息？',
				askContent: '',
				loading: false,
				fileList5: [],
				frontImg: '',
				reverseImg: '',
				answerContent: '',
				hsCode: '',
				background1: "https://admin.xzlglobal.com/hsfile/bg_mp.jpg",
			};
		},

		onShow() {
			uni.hideShareMenu()
			var that = this
			this.getQiniuToken()
			//根据code获取openid等信息
			wx.login({
				success: function(res) {
					if (res.code) {
						//发起网络请求
						console.log('获取用户成功！' + res.code)
						that.getOpenId(res.code)
					} else {
						console.log('获取用户登录态失败！' + res.errMsg)
					}
				}
			});
		},
		onLoad(option) {
			this.askContent = this.$store.state.feedBackInfo.askContent
			const list = []
			if (this.$store.state.feedBackInfo.imgUrl1) {
				list.push(this.$store.state.feedBackInfo.imgUrl1)
			}
			if (this.$store.state.feedBackInfo.imgUrl2) {
				list.push(this.$store.state.feedBackInfo.imgUrl2)
			}
			if (this.$store.state.feedBackInfo.imgUrl3) {
				list.push(this.$store.state.feedBackInfo.imgUrl3)
			}
			this.fileList5 = list
			this.answerContent = this.$store.state.feedBackInfo.answerContent
			if (option != null && option != "") {
				var data = option.actingType; // 字符串转对象
				if (data) {
					this.actingType = data
				}
				if (option.hsCode != null && option.hsCode != '') {
					this.hsCode = option.hsCode
				}
			}

		},
		methods: {
			//预览图片
			previewImage(index) {
				//uniapp预览轮播图
				uni.previewImage({
					current: index, //预览图片的下标
					urls: this.fileList5 //预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
				})
			},

			//获取用户信息
			async getOpenId(code) {
				var that = this
				await getOpenId(code).then(res => {
					if (res && JSON.stringify(res) !== "{}") {
						that.openId = res
						uni.setStorageSync('openId', res);
					}
				}).catch(err => {

				})
			},
			afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					this.uploadFilePromise(lists[i].url, event.name).then(res => {
						let item = this[`fileList${event.name}`][fileListLen]
						this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
							status: 'success',
							message: '',
							url: res
						}))
						fileListLen++
					})

				}
			},
			async getQiniuToken() { //获取七牛的uptoken
				var that = this
				getUploadToken().then(res => {
					if (res && JSON.stringify(res) !== "{}") {
						this.qiniuToken = res
					}
				})

			},
			uploadFilePromise(url, name) {
				var that = this
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'https://upload-z1.qiniup.com/',
						// url: config.baseUrl + '/wechat/common/upload',
						filePath: url,
						name: 'file',
						formData: {
							token: that.qiniuToken,
						},
						success: (res) => {
							setTimeout(() => {
								if (res.data) {
									// var data = JSON.parse(res.data);
									console.log(res)
									var imgData = JSON.parse(res.data);
									console.log(imgData)
									if (name == 5) {
										that.frontImg = config.qiniuUrl + imgData.key
										console.log(config.qiniuUrl + imgData.key)
										that.fileList5.forEach(item => {
											item.url = config.qiniuUrl + imgData.key
										})
										// that.fileList5.push({url:config.baseUrl + imgData.fileName})
										console.log(that.fileList5)
									} else if (name == 6) {
										that.reverseImg = config.qiniuUrl + imgData.key
										that.fileList6.forEach(item => {
											item.url = config.qiniuUrl + imgData.key
										})
										// that.fileList6.push({url:config.baseUrl + imgData.fileName})
									}
									resolve(config.qiniuUrl + imgData.key)
								}

							}, 1000)
						}
					});
				})
			},
			openLoadingPage() {
				this.loadingPageData = {
					loadingText: '',
					image: '',
					loadingMode: '',
					bgColor: '#ffffff',
				}
				// 自定义背景色
				this.loadingPageData.loadingMode = 'spinner'
				this.loadingPageData.bgColor = 'rgba(0, 0, 0, 0.4)'
				this.loadingPageData.loadingText = "加载中"
				this.loadingPageData.color = '#eee',
					this.loading = true
				setTimeout(() => {
					this.loading = false
				}, 1000)
			},
			/**
			 * 判断字符只能为字母或数字
			 * @param str
			 * @returns {boolean}
			 */
			containSpecial(s) {
				return /^[\da-z]+$/i.test(s);
			},
			/**
			 * @param {Boolean} type 是否有身份证 
			 */
			validityPeopleForm() {
				if (!this.askContent) {
					uni.$u.toast('请输入反馈内容');
					return false
				}
				return true
			},
			async submitCard(type) {
				if (!this.validityPeopleForm()){
					setTimeout(function () {
					}, 2000);
					return false
				} 
				// if (!this.validityPeopleForm()) return
				var that = this
				const params = {
					askContent: this.askContent
				}
				that.fileList5.forEach((item, index) => {
					if (index === 0) {
						params.imgUrl1 = item.url
					}
					if (index === 1) {
						params.imgUrl2 = item.url
					}
					if (index === 2) {
						params.imgUrl3 = item.url
					}
				})
				addFead(params, {
					custom: {
						toast: true,
						catch: true
					}
				}).then(res => {
					uni.$u.toast('提交成功');

					uni.redirectTo({
						url: '/pages/home/feedbackList'
					});
				})
			},

			cancel() {
				this.show3 = false
				console.log('cancel');
			},
			close() {
				this.show3 = false
				console.log('close');
			},

			str2utf8(str) {
				var encoder = new TextEncoder('utf8');
				return encoder.encode(str);
			},
			scanCode() {
				var that = this
				//扫码
				uni.scanCode({
					//onlyFromCamera: true, //只能从相机中获取，不能从图片中获取
					success: function(res) { //获取扫码结果
						that.openLoadingPage()
						if (res.result && res.result.length >= 17) {
							var dataStr = res.result
							console.log(dataStr)
							var str = dataStr.split('(')
							if (str.length >= 1) {
								that.hsCode = dataStr.split('(')[0]
							} else {
								uni.showToast({
									title: '无效二维码，扫码正确的核酸码',
									icon: 'none',
									duration: 2000
								});
							}
						} else {
							uni.showToast({
								title: '无效二维码，扫码正确的核酸码',
								icon: 'none',
								duration: 2000
							});
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.backge {
		width: calc(100%);
		height: 100vh;
		background-color: #F1F4F7;

		.u-page {
			padding: 40upx 30upx 0 30upx;
			position: relative;
		}
	}

	/deep/.u-input--square {
		height: 50px;
	}

	.img {
		width: 680upx;
		height: 400upx;
	}

	.u-demo-block__content {
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
	}

	.u-demo-block__title {
		font-size: 30upx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 42px;
	}

	.count {
		position: absolute;
		top: 18upx;
		right: 28upx;
		font-size: 30upx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 42upx
	}

	.count {
		position: absolute;
		top: 60upx;
		right: 50upx;
	}

	.img-count {
		position: absolute;
		top: 18upx;
		right: 28upx;
		font-size: 30upx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		line-height: 42upx
	}

	.demo_div {
		left: 0;
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	.textarea-action {
		width: 600upx;
		min-height: 216upx;
		background: #FFFFFF;
		border-radius: 8upx;
		padding: 26upx 24upx;
	}

	.question-img {
		width: 200upx;
		height: 200upx;
		padding: 5rpx;
		display: inline-block;

	}

	.img-content {
		position: relative;

	}

	.desc {
		font-size: 30upx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #3A8CF0;
		line-height: 42upx;
		margin-bottom: 20upx;


	}

	.callback-content {
		background: #E7F2FF;
		border-radius: 4px;
		box-sizing: border-box;
		padding: 26upx;
		word-break: break-all;
	}

	.u-demo-block {
		// background-color: #ffffff;
		// border-radius: 7px;
		padding: 0 20upx 30upx;
		margin-bottom: 40upx;

		.userinfo {
			background-color: #ffffff;
			border-radius: 7px;
			padding: 34upx;
		}

		.user_line {
			display: flex;
			flex-direction: row;
			align-items: center;
			line-height: 70upx;
			justify-content: space-between;

			.label-name {
				font-size: 40upx;
				// font-weight: 600;
			}

			.content {
				font-size: 40upx;
				color: #666666;
				// font-weight: 600;
			}
		}

	}
</style>
