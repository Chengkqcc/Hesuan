/**
 * 请求拦截
 * @param {Object} http
 */
import cfg from '@/common/config'
module.exports = (vm) => {
    uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
        // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
		const token = uni.getStorageSync('token')
		// !cfg.blackList.includes(config.url)
        // config.data = config.data || {}
		 config.data = config.data || {}
		if (!config.header.token && config.url.indexOf('wechat') === -1 && !cfg.blackList.includes(config.url.split('?')[0])) {
			// console.log('不是白名单，需要加token')
			config.header.Authorization = `Bearer ${token}`
		}else{
			// console.log('白名单不需要加token')
		}
        // 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
        // console.log(vm.$store.state);
        return config
    }, (config) => // 可使用async await 做异步操作
        Promise.reject(config))
}
