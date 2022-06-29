<template>
	<div class="backge" style="background-color: #f3f4f6;">
		<view class="u-page">
			<view class="search" @click="addPassProxyAdd">
				<u-icon name="plus" color="#3A8CF0" size="40rpx"></u-icon>
				<text style="color: #3A8CF0;">添加已申请家人</text>
			</view>
			<u-empty v-if="indexList&& indexList.length==0" :mode="mode" :icon="img">
			</u-empty>
			<u-list>
				<u-swipe-action style='margin-bottom: 30upx;'>
					<u-swipe-action-item :options="options1" v-for="(item, index) in indexList" @click="unbundle(item)"
						:key="index">
						<view style="padding: 20upx;" @click="getFamilyDetail(item.familyUserId)">
							<u-row justify="center" align="center">
								<u-col span="2">
									<u-avatar
										v-if="item.hsFamilyMember.headUrl!=null && item.hsFamilyMember.headUrl!='' "
										size="90rpx" :src="item.hsFamilyMember.headUrl"></u-avatar>
									<u-avatar v-else :text="item.hsFamilyMember.name[0]" size="90rpx" randomBgColor>
									</u-avatar>
								</u-col>
								<u-col span="7">
									<view style="font-size: 36upx;font-weight: 700;">{{item.hsFamilyMember.name}}</view>
									<view style="margin-top: 10upx;color: #666666;font-size: 24upx;">
										核酸码：{{item.hsFamilyMember.hsCode}}</view>
									<view style="margin-top: 10upx;color: #666666;font-size: 24upx;">
										申请日期：{{item.createTime!=null?item.createTime:''}}</view>
								</u-col>
								<u-col span="2">
									<view v-if="item.permitApply.state==='1'"
										style="font-size: 30upx; text-align: right;color: #4CCD56;	">通过</view>
									<view v-if="item.permitApply.state==='0'"
										style="font-size: 30upx; text-align: right;color: #F5BE2D;	">待审核</view>
									<view v-if="item.permitApply.state==='2'"
										style="font-size: 30upx; text-align: right;color: #D23535;	">已驳回</view>
								</u-col>
							</u-row>
						</view>
						<u-line></u-line>
						<!-- <u-gap bgColor="#f3f4f6" height='10'></u-gap> -->
					</u-swipe-action-item>
				</u-swipe-action>
				<!-- <u-list-item v-for="(item, index) in indexList" :key="index">
					<u-swipe-action style='margin-bottom: 30upx;' >
						<u-swipe-action-item :options="options1":autoClose='true' @click="unbundle(item)">
							
						</u-swipe-action-item>
					</u-swipe-action>


					
				</u-list-item> -->
			</u-list>
			<u-modal :show="show" :title="title" :content='content' :showCancelButton='true' @confirm="confirm"
				@cancel='cancel'></u-modal>
			<view style="position:absolute;z-index: 999">
                <u-loading-page :loadingText="loadingPageData.loadingText" :image="loadingPageData.image"
				:loadingMode="loadingPageData.loadingMode" :bgColor="loadingPageData.bgColor" :loading="loading"
				:color="loadingPageData.color" :loadingColor="loadingPageData.loadingColor">
			</u-loading-page>
            </view>
		</view>
	</div>
</template>

<script>
	import {
		getOpenId,
		userById,
		unbundling,
		getFamilyListByOpenid
	} from '../../common/api.js'
	export default {
		data() {
			return {
				hsCode: '',
				show: false,
				title: '驳回内容',
				content: '',
				openId: '',
				loading: false,
				loadingPageData: {
					// 自定义提示内容
					loadingText: '',
					// 自定义图片
					image: '',
					// 自定义加载动画模式
					loadingMode: '',
					// 自定义背景色
					bgColor: '#ffffff',
				},
				options1: [{
					text: '删除',
					style: {
						backgroundColor: 'red',
					}
				}],
				mode: 'list',
				indexList: [
                    {
                        hsFamilyMember: {
                            name: 'dawjdoaw',
                            hsCode: 'daw90d790edhioawdawd',
                            headUrl: 'https://img2.baidu.com/it/u=3895119537,2684520677&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
                        },
                        permitApply: {
                            status: 1
                        }
                    }
                ],
				urls: [

				]
			};
		},
		onShow() {
			uni.hideShareMenu()
			this.openLoadingPage()
			var that = this
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
		onLoad() {
			// this.getFamilyList()
		},
		methods: {
			addPassProxyAdd() {
				uni.navigateTo({
					url: '/pages/nucleic/passProxyAdd'
				});
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

			//获取用户信息
			async getOpenId(code) {
				var that = this
				await getOpenId(code).then(res => {
					console.log(res)
					if (res && JSON.stringify(res) !== "{}") {
						uni.setStorageSync('openId', res);
						that.openId = res
						that.getFamilyList(res)
					}
				}).catch(err => {

				})
			},
			//解绑
			unbundling(id) {
				var that = this
				unbundling(id).then(res => {
					if (res && JSON.stringify(res) !== "{}") {
						uni.showToast({
							title: '解绑成功',
							icon: 'success',
							duration: 2000
						});
						that.getFamilyList(that.openId)

					}

				}).catch(err => {

				})
			},

			getFamilyList(openId) {
				var that = this
				try {
					uni.showLoading({
						title: '加载中',
						mask: false
					});
					getFamilyListByOpenid(openId).then(res => {
						console.log(res)

                        // aaaaaaaaaaaaaaaaaa
						// if (res && res.length > 0) {
						// 	that.indexList = res
						// } else {
						// 	that.indexList = []
						// }
					}).catch(err => {

					})
				} catch (e) {
					// error
				}

			},
			//解绑申请人
			unbundle(row) {
				var that = this
				uni.showModal({
					title: '温馨提示',
					content: '确定要解除绑定吗？',
					success: res => {
						if (res.confirm) {
							uni.showLoading({
								title: '加载中',
								mask: true
							});
							that.unbundling(row.id)
						}
					}
				})
			},

			getFamilyDetail(id) {
				var that = this
				userById(id).then(res => {
					console.log(res)
					if (res != null) {
						if (res.permitApply && res.permitApply != null) {
							if (res.permitApply.state === '1') {
								uni.navigateTo({
									url: '/pages/nucleic/familyPermit?familyId=' + id,
								})
							} else if (res.permitApply.state === '2') {
								that.show = true
								that.content = "“" + res.permitApply.reject + '”,是否重新去待申请？'
								that.hsCode = res.hsCode
								// uni.navigateTo({
								// 	url: '/pages/nucleic/familyPermit?familyId=' + id,
								// })
							} else {
								console.log(id)
								uni.$u.toast('未审核通过不支持查看！')
								return false
							}
						}
					}

				}).catch(err => {

				})
			},
			//确定
			confirm() {
				this.show = false
				uni.navigateTo({
					url: '/pages/nucleic/uploadcard?actingType=1&hsCode=' + this.hsCode,
				})
			},
			//关闭
			cancel() {
				this.show = false

			},


		},
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f3f4f6;
	}

	.backge {
		height: 100vh;
	}

	.u-page {
		padding: 0;
		// &__button-item {
		// 	margin: 0 15px 15px 0;
		// }
	}

	.u-demo-block__title {
		padding: 10px 0 2px 15px;
	}

	.swipe-action {
		&__content {
			padding: 25rpx 0;

			&__text {
				font-size: 15px;
				color: $u-main-color;
				padding-left: 30rpx;
			}
		}
	}

	.u-demo-block__content {
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
	}

	.demo_div {
		left: 0;
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	.search {
        display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background-color: #ffffff;
		padding: 30upx;
		margin-bottom: 20upx;
        font-size: 33rpx;
	}
</style>
