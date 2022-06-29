/**
 * 响应拦截
 * @param {Object} http 
 */
module.exports = (vm) => {
	uni.$u.http.interceptors.response.use((response) => {
		/* 对响应成功做点什么 可使用async await 做异步操作*/
		const data = response.data
		// 自定义参数
		const custom = response.config?.custom
		uni.hideLoading();
		if (data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
			// 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
			console.log("错误信息", data, custom.toast !== false)
			if (custom.toast !== false || response.config.url.indexOf('__system__toast') != -1) {
				uni.$u.toast(data.msg)
			}
			// 如果需要catch返回，则进行reject
			if (custom?.catch || response.config.url.indexOf('__system__catch') != -1) {
				return Promise.reject(data)
			} else {
				// 否则返回一个pending中的promise
				return new Promise(() => {})
			}
		}
		return data.data || data.rows || {}
	}, (response) => {
		/*  对响应错误做点什么 （statusCode !== 200）*/
		return Promise.reject(response)
	})
}
