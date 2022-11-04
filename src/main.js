import Vue from 'vue'
import App from './App.vue'
import element from 'element-ui'
import router from '@/router/index'
import store from '@/store/index'


Vue.config.productionTip = false
Vue.use(element)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
