import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken
} from '@/utils/auth' // getToken from cookie
import myStroage from './utils/sessionStorage'

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

// permissiom judge function
function hasPermission(roles, permissionRoles) {
  // if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
  // return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/authredirect'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  // if (!store.getters.isProject) {
  //   next()
  //   return
  // }
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else if (to.path === '/404') {
      if (myStroage.getStorage('project')) {
        next({
          path: '/projectDash/projectDashboard'
        })
      } else {
        next({
          path: '/dashboard'
        })
      }
      return
    } else {
      // 拦截需要全屏隐藏layout的页面
      if (to.path === '/dashboard') {
        store.dispatch('setHideLayout', true)
      } else {
        store.dispatch('setHideLayout', false)
      }
      // 判断是系统级权限还是项目级权限

      if (myStroage.getStorage('project')) {
        if (!store.getters.projectPrivileges || store.getters.projectPrivileges.length === 0) {
          store.dispatch('getProjectPrivileges').then(res => {
            var privilegesArr = []
            res.result.projectPrivileges.forEach(item => {
              if (item.type === 'menu') {
                privilegesArr.push(item.code)
              }
            })

            store.dispatch('GenerateProjectRoutes', {
              privilegesArr
            }).then(() => { // 根据roles权限生成可访问的路由表
              router.addRoutes(store.getters.addRouters)
              next({
                ...to,
                replace: true
              })
            })
          })
        } else {
          // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
          if (hasPermission(store.getters.projectPrivileges, to.meta.privileges)) {
            next() //
          } else {
            next({
              path: '/401',
              replace: true,
              query: {
                noGoBack: true
              }
            })
          }
          // 可删 ↑
        }
      } else {
        if (!store.getters.privileges || store.getters.privileges.length === 0) { // 判断当前用户是否已拉取完user_info信息
          store.dispatch('GetUserInfo').then(res => { // 拉取user_info
            console.log('userInfo:', res)
            //判断state
            const privilegesArr = []
            res.data.data.privileges.forEach(function (item) {
              if (item.type === 'menu') {
                privilegesArr.push(item.privilegeCode)
              }
            })
            store.dispatch('GenerateRoutes', {
              privilegesArr
            }).then(() => { // 根据roles权限生成可访问的路由表

              console.log('生成路由的privilege：', privilegesArr)
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              next({
                ...to,
                replace: true
              }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            })
          }).catch(() => {
            store.dispatch('FedLogOut').then(() => {
              // Message.error('Verification failed, please login again')
              next({
                path: '/login'
              })
            })
          })
        } else {
          // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
          if (hasPermission(store.getters.privileges, to.meta.privileges)) {
            next() //
          } else {
            next({
              path: '/401',
              replace: true,
              query: {
                noGoBack: true
              }
            })
          }
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }

  console.log('router:', router)
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
