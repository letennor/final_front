import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import router from '@/router'
import store from '@/store'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // 全局CSS


Vue.config.productionTip = false
Vue.use(Element)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
