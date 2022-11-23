import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Vue from 'vue'
import myStroage from '../utils/sessionStorage'

// create an axios instance
const service = axios.create({
  timeout: 0 // request timeout
})

// 声明一个对象用于存储请求个数
let needLoadingRequestCount = 0

function showLoading() {
  if (needLoadingRequestCount === 0) {
    store.dispatch('setLoading', true)
  }
  needLoadingRequestCount++
}

function hideLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    store.dispatch('setLoading', false)
  }
}

// 判断数据类型是否为formdata
function isFormData(v) {
  return Object.prototype.toString.call(v) === '[object FormData]'
}

// // 请求前拦截
// service.interceptors.request.use(
//   (config) => {
//     if (myStroage.getStorage('project') && config.data) {
//       if (isFormData(config.data) && !config.data.has('projectId')) {
//         // 当为formdata类型
//         config.data.set(
//           'projectId',
//           JSON.parse(myStroage.getStorage('project')).id
//         )
//       } else if (!config.data.projectId) {
//         // 当为普通的对象时
//         config.data.projectId = JSON.parse(myStroage.getStorage('project')).id
//       }
//     }
//     showLoading()
//     if (config.type === 'demo') {
//       config.baseURL = Vue.prototype.demoUrl
//     } else {
//       config.baseURL = Vue.prototype.myUrl
//     }
//     if (getToken()) {
//       config.headers['x-auth-token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
//     }
//     config.headers['x-request-client'] = 'web'
//     return config
//   },
//   (error) => {
//     // Do something with request error
//     // console.log(error) // for debug
//     Promise.reject(error)
//   }
// )

// // 去请求后拦截
// service.interceptors.response.use(
//   (response) => {
//     hideLoading()
//     const res = response.data
//     if (res.status === 0) {
//       Message({
//         message: res.message,
//         type: 'error',
//         duration: 5 * 1000
//       })
//       return response.data
//     } else {
//       if (res.status === 1001) {
//         const url = response.config.url
//         if (
//           (!url.endsWith('rest/doc/serverUrl') &&
//             !url.endsWith('rest/dic/getDicMap') &&
//             !url.endsWith('rest/auth/logout') &&
//             !url.endsWith('rest/message/unreadNum') &&
//             !myStroage.getStorage('isLose')) ||
//           myStroage.getStorage('isLose') === '0'
//         ) {
//           myStroage.setStorage('isLose', 1)
//           MessageBox.confirm('登录超时，请重新登录', '登出', {
//             confirmButtonText: '重新登录',
//             cancelButtonText: '取消',
//             type: 'warning'
//           }).then(() => {
//             store.dispatch('FedLogOut').then(() => {
//               location.reload() // 为了重新实例化vue-router对象 避免bug
//             })
//           })
//         }
//       }
//       return response.data
//     }
//   },
//   (error) => {
//     hideLoading()
//     // console.log('err' + error) // for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

export default service
