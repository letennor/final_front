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
  {
    path: '/companyData',
    component: Layout,
    redirect: 'businessLicense',
    name: 'companyData',
    meta: { title: '模块1', icon: 'iconcopy' },
    children: [
      {
        path: 'businessLicense',
        component: () => import('@/views/companyData/businessLicenses/index'),
        name: 'businessLicense',
        meta: { title: '模块1-1', icon: '', noCache: true }
      },
      {
        path: 'auditReport',
        component: () => import('@/views/companyData/auditReport/index'),
        name: 'auditReport',
        meta: { title: '模块1-2', icon: '', noCache: true }
      },
      {
        path: 'socialSecurity',
        component: () => import('@/views/companyData/socialSecurity/index'),
        name: 'socialSecurity',
        meta: { title: '模块1-3', icon: '', noCache: true }
      }]
  },
  {
    path:'/model2',
    component: Layout,
    redirect: 'model2-1',
    name: 'model2',
    meta: { title: '模块2', icon: 'iconquanxianguanli'},
    children:[
      {
        path:'model2-1',
        component: () => import('@/views/model2/model2-1/index'),
        name:'model2-1',
        meta:{title:'模块2-1', icon:'', noCache:true}
      },
      {
        path:'model2-2',
        component: () => import('@/views/model2/model2-2/index'),
        name:'model2-2',
        meta:{title:'模块2-2', icon:'', noCache:true}
      },
      {
        path:'model2-3',
        component: () => import('@/views/model2/model2-3/index'),
        name:'model2-3',
        meta:{title:'模块2-3', icon:'', noCache:true}
      },
    ]
  },
  {
    path:'/echartsLearning',
    component: Layout,
    redirect: 'concept',
    name:'echartsLearning',
    meta: {title: 'Echarts学习', icon:'iconYzhou'},
    children:[
      {
        path:'concept',
        component:() => import('@/views/echartsLearning/concept/index'),
        name:'concept',
        meta:{title:'概念篇', icon:'', noCache:true}
      },
      {
        path:'barchart',
        component:() => import('@/views/echartsLearning/barchart/index'),
        name:'barchart',
        meta:{title:'柱状图', icon:'', noCache:true}
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]


let tempRoute = constantRouterMap.concat(asyncRouterMap)

console.log('tempRoute', tempRoute)

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: tempRoute
})

const router = createRouter()


export default router
