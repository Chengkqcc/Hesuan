import Vue from 'vue'
import App from './App'

// vuex
import store from './store'

// 引入全局uView
import uView from '@/uni_modules/uview-ui'
import {
	judgeTime
} from "util/ruoyi.js";
import mixin from './common/mixin'
import * as qiniu from 'qiniu-js'
Vue.prototype.$store = store
Vue.prototype.judgeTime = judgeTime
Vue.config.productionTip = false

App.mpType = 'app'
Vue.use(uView)

// #ifdef MP
// 引入uView对小程序分享的mixin封装
const mpShare = require('@/uni_modules/uview-ui/libs/mixin/mpShare.js')
Vue.mixin(mpShare)
// #endif

Vue.mixin(mixin)

const app = new Vue({
    store,
    ...App
})
// 引入请求封装
require('./util/request/index')(app)
app.$mount()
