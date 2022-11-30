import Vue from 'vue'
import 'normalize.css/normalize.css'
import App from './App.vue'
import Element from 'element-ui'
import echarts from 'echarts'
import router from '@/router'
import store from '@/store'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // 全局CSS
import './permission'
import * as filters from './filters'
import myStroage from '@/utils/sessionStorage'
import BaiduMap from 'vue-baidu-map'


console.log('echarts:', echarts)

//全局指令
import createDirectives from '@/directive'

createDirectives(Vue)
import axios from 'axios'
Vue.config.productionTip = false

Vue.use(Element, {
  size:'medium'
})

Vue.use(BaiduMap, {
  ak:'CPEvt459mKpMp7qNbg8GK3YVBlRCPfdq'
})

//注册全部过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


Vue.prototype.$storage = myStroage // session存储全局化
Vue.prototype.$echarts = echarts

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

// 默认Element-ui弹框点击遮罩层不关闭
Element.Dialog.props.closeOnClickModal.default = false

// 显示弹框时，页面不能滚动
Element.Dialog.props.lockScroll.default = false
