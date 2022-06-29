import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) // vue的插件机制

// Vuex.Store 构造器选项
const store = new Vuex.Store({
    // 为了不和页面或组件的data中的造成混淆，state中的变量前面建议加上$符号
    state: {
        // 用户信息
        $userInfo: {
            id: 1
        },
		userInfo: {},
		isLogin: false,
		debug: false,
		feedBackInfo: {},
    },
	mutations: {
		setLoginStatus (state, status) {
		    state.isLogin = status;
		},
		setUserInfo(state, userInfo) {
		    state.userInfo = JSON.parse(JSON.stringify(userInfo));
		},
		setFeedBackInfo(state, feedBackInfo) {
		    state.feedBackInfo = JSON.parse(JSON.stringify(feedBackInfo));
		},
		setdebug(state, debug) {
		    state.debug = debug;
		},
	},
	actions: {
		setLoginStatus (setLoginStatus, status ) {
			setLoginStatus.commit('setLoginStatus', status)
		},
		setUserInfo (setUserInfo, userInfo ) {
			setUserInfo.commit('setUserInfo', userInfo)
		},
		setFeedBackInfo (setFeedBackInfo, feedBackInfo ) {
			setFeedBackInfo.commit('setFeedBackInfo', feedBackInfo)
		},
		setdebug (setdebug, debug ) {
			setdebug.commit('setdebug', debug)
		},
	}


})

export default store
