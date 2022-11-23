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
    path:"/iconList",
    component: Layout,
    redirect: 'iconList',
    children:[{
      path:'iconList',
      component: () => import('@/views/iconList/index'),
      name:'iconList',
      meta: {title:'icon列表', icon:'iconccgl-xiangmuguanli-3', noCache: true}
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
  {
    path:'/baiduMap',
    component: Layout,
    redirect: 'baiduMap',
    name:'baiduMap',
    meta: {title: '百度地图', icon:'iconmanyou'},
    children:[
      {
        path:'test1',
        component:() => import('@/views/baiduMap/test1/index'),
        name:'test1',
        meta:{title:'百度地图基本使用', icon:'', noCache:true}
      },
      {
        path:'test2',
        component:() => import('@/views/baiduMap/test2/index'),
        name:'test2',
        meta:{title:'路书', icon:'', noCache:true}
      },
      {
        path:'test3',
        component:() => import('@/views/baiduMap/test3/index'),
        name:'test3',
        meta:{title:'定位', icon:'', noCache:true}
      }
    ]
  },
  {
    path:'/finalBack',
    component: Layout,
    redirect: 'finalBack',
    name:'finalBack',
    meta: {title: '后端测试', icon:'iconmoxingzhongxin'},
    children:[
      {
        path:'test1',
        component:() => import('@/views/finalBack/test1/index'),
        name:'finalTest1',
        meta:{title:'test1', icon:'', noCache:true}
      },
      {
        path:'test2',
        component:() => import('@/views/finalBack/test2/index'),
        name:'finalTest2',
        meta:{title:'test2', icon:'', noCache:true}
      },
      {
        path:'test3',
        component:() => import('@/views/finalBack/test3/index'),
        name:'finalTest3',
        meta:{title:'test3', icon:'', noCache:true}
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]


let tempRoute = constantRouterMap.concat(asyncRouterMap)


const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: tempRoute
})

const router = createRouter()


export default router
