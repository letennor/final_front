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

//全局指令
import createDirectives from '@/directive'

createDirectives(Vue)
import axios from 'axios'
Vue.config.productionTip = false

Vue.use(Element, {
  size:'medium'
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
