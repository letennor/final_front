import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout/Layout'

/* Router Modules */
import constantRouterMap from './modules/constantRouterMap'

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRouterMap = [
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: '首页', icon: 'iconzhuye', noCache: true }
    }]
  },
  // 企业资料
  {
    path: '/companyData',
    component: Layout,
    redirect: 'businessLicense',
    name: 'companyData',
    meta: { title: '企业资料', icon: 'iconcopy' },
    children: [
      {
        path: 'businessLicense',
        component: () => import('@/views/companyData/businessLicenses/index'),
        name: 'businessLicense',
        meta: { title: '企业证照', icon: '', noCache: true }
      },
      {
        path: 'auditReport',
        component: () => import('@/views/companyData/auditReport/index'),
        name: 'auditReport',
        meta: { title: '审计报告', icon: '', noCache: true }
      },
      {
        path: 'socialSecurity',
        component: () => import('@/views/companyData/socialSecurity/index'),
        name: 'socialSecurity',
        meta: { title: '社保证明', icon: '', noCache: true }
      }]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const router = createRouter()


export default router
