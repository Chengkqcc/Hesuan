<script>
	export default {
		globalData: {
			statusBarHeight: 0, // 状态导航栏高度
			navHeight: 0, // 总体高度
			navigationBarHeight: 0, // 导航栏高度(标题栏高度)
		},
		onLaunch: function() {
			console.log("App Launch")
			// 状态栏高度
			this.globalData.statusBarHeight = uni.getSystemInfoSync().statusBarHeight

			// #ifdef MP-WEIXIN
			// 获取微信胶囊的位置信息 width,height,top,right,left,bottom
			const custom = wx.getMenuButtonBoundingClientRect()
			// console.log(custom)

			// 导航栏高度(标题栏高度) = 胶囊高度 + (顶部距离 - 状态栏高度) * 2
			this.globalData.navigationBarHeight = custom.height + (custom.top - this.globalData.statusBarHeight) * 2
			// console.log("导航栏高度："+this.globalData.navigationBarHeight)
			// 总体高度 = 状态栏高度 + 导航栏高度
			this.globalData.navHeight = this.globalData.navigationBarHeight + this.globalData.statusBarHeight

			// 获取token 判断当前是否登录
			// const token = uni.getStorageSync('token');
			// this.$store.dispatch('setLoginStatus', token ? true : false);
			// #endif

			// console.log(this.globalData)

			// var that = this
			// uni.getSystemInfo({
			// 	success: function(e) {
			// 		Vue.prototype.StatusBar = e.statusBarHeight;
			// 		let custom = wx.getMenuButtonBoundingClientRect();
			// 		Vue.prototype.Custom = custom;
			// 		Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;

			// 	}
			// })

		},
		onShow: function() {
			// 检查更新
			this.updateApp();
		},
		onHide: function() {

		},
		methods: {
			updateApp() {
				const updateManager = uni.getUpdateManager();
				updateManager.onCheckForUpdate(function(res) {
					// 请求完新版本信息的回调
					if (res.hasUpdate) {
						updateManager.onUpdateReady(function(res2) {
							uni.showModal({
								title: '更新提示',
								content: '发现新版本，是否重启应用?',
								cancelColor: '#eeeeee',
								confirmColor: '#FF0000',
								success(res2) {
									if (res2.confirm) {
										// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
										updateManager.applyUpdate();
									}
								}
							});
						});
					}
				});

				updateManager.onUpdateFailed(function(res) {
					// 新的版本下载失败
					uni.showModal({
						title: '提示',
						content: '检查到有新版本，但下载失败，请检查网络设置',
						success(res) {
							if (res.confirm) {
								// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
								updateManager.applyUpdate();
							}
						}
					});
				});
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
	@import "common/demo.scss";

	.image-bg {
		position: absolute;
		z-index: -1;
		left: 0;
		right: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;
	}
</style>
