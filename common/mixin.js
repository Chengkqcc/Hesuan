export default {
	data() {
		return {
			statusBarHeight: 0,
			navigationBarHeight: 0,
			navHeight: 0,
			windowHeight: 0, // 可使用窗口高度
		}
	},
	methods: {
		// 获取设备信息
		getSystemInfo() {
			this.statusBarHeight = getApp().globalData.statusBarHeight
			this.navigationBarHeight = getApp().globalData.navigationBarHeight
			this.windowHeight = uni.getSystemInfoSync().windowHeight
			this.navHeight = getApp().globalData.navHeight
			return {
				statusBarHeight:getApp().globalData.statusBarHeight,
				navigationBarHeight : getApp().globalData.navigationBarHeight,
				windowHeight : uni.getSystemInfoSync().windowHeight,
				navHeight : getApp().globalData.navHeight
			}
		},
	},
}
