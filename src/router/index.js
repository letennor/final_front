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

  // {
  //   path:'/echartsLearning',
  //   component: Layout,
  //   redirect: 'concept',
  //   name:'echartsLearning',
  //   meta: {title: 'Echarts学习', icon:'iconYzhou'},
  //   children:[
  //     {
  //       path:'concept',
  //       component:() => import('@/views/echartsLearning/concept/index'),
  //       name:'concept',
  //       meta:{title:'概念篇', icon:'', noCache:true}
  //     },
  //     {
  //       path:'barchart',
  //       component:() => import('@/views/echartsLearning/barchart/index'),
  //       name:'barchart',
  //       meta:{title:'柱状图', icon:'', noCache:true}
  //     }
  //   ]
  // },
  // {
  //   path:'/baiduMap',
  //   component: Layout,
  //   redirect: 'baiduMap',
  //   name:'baiduMap',
  //   meta: {title: '百度地图', icon:'iconmanyou'},
  //   children:[
  //     {
  //       path:'test1',
  //       component:() => import('@/views/baiduMap/test1/index'),
  //       name:'test1',
  //       meta:{title:'百度地图基本使用', icon:'', noCache:true}
  //     },
  //     {
  //       path:'test2',
  //       component:() => import('@/views/baiduMap/test2/index'),
  //       name:'test2',
  //       meta:{title:'路书', icon:'', noCache:true}
  //     },
  //     {
  //       path:'test3',
  //       component:() => import('@/views/baiduMap/test3/index'),
  //       name:'test3',
  //       meta:{title:'定位', icon:'', noCache:true}
  //     }
  //   ]
  // },
  {
    path:'/cultivation',
    component: Layout,
    redirect: 'cultivation',
    name:'cultivation',
    meta: {title: '培育', icon:'iconzidian'},
    children:[
      {
        path:'deathRecord',
        component:() => import('@/views/cultivation/deathRecord/index'),
        name:'deathRecord',
        meta:{title:'死亡情况记录', icon:'', noCache:true}
      },
      {
        path:'individualDeathRecord',
        component:() => import('@/views/cultivation/individualDeathRecord/index'),
        name:'individualDeathRecord',
        meta:{title:'个体死亡情况记录', icon:'', noCache:true}
      },
      {
        path:'dosingRecord',
        component:() => import('@/views/cultivation/dosingRecord/index'),
        name:'dosingRecord',
        meta:{title:'投药情况记录', icon:'', noCache:true}
      },
      {
        path:'eggProductionRecord',
        component:() => import('@/views/cultivation/eggProductionRecord/index'),
        name:'eggProductionRecord',
        meta:{title:'产蛋量记录', icon:'', noCache:true}
      },
      {
        path:'feedRecord',
        component:() => import('@/views/cultivation/feedRecord/index'),
        name:'feedRecord',
        meta:{title:'投喂情况记录', icon:'', noCache:true}
      },
      {
        path:'fertilizationRecord',
        component:() => import('@/views/cultivation/fertilizationRecord/index'),
        name:'fertilizationRecord',
        meta:{title:'受精情况记录', icon:'', noCache:true}
      }
    ]
  },
  {
    path:'/transport',
    component: Layout,
    redirect: 'transport',
    name:'transport',
    meta: {title: '运输', icon:'iconmanyou'},
    children:[
      {
        path:'incomingRecord',
        component:() => import('@/views/transport/incomingRecord/index'),
        name:'incomingRecord',
        meta:{title:'进货情况记录', icon:'', noCache:true}
      },
      {
        path:'outputRecord',
        component:() => import('@/views/transport/outputRecord/index'),
        name:'outputRecord',
        meta:{title:'出苗情况记录', icon:'', noCache:true}
      },
      {
        path:'transportRecord',
        component:() => import('@/views/transport/transportRecord/index'),
        name:'transportRecord',
        meta:{title:'运输情况记录', icon:'', noCache:true}
      },
    ]
  },
  {
    path:'/maintainProperty',
    component: Layout,
    redirect: 'maintainProperty',
    name:'maintainProperty',
    meta: {title: '字段维护', icon:'iconliuchengpeizhi'},
    children:[
      {
        path:'userInfo',
        component:() => import('@/views/maintainProperty/userInfo/index'),
        name:'userInfo',
        meta:{title:'用户', icon:'', noCache:true}
      },
      {
        path:'feedInfo',
        component:() => import('@/views/maintainProperty/feedInfo/index'),
        name:'feedInfo',
        meta:{title:'喂料', icon:'', noCache:true}
      },
      {
        path:'goodsInfo',
        component:() => import('@/views/maintainProperty/goodsInfo/index'),
        name:'goodsInfo',
        meta:{title:'货物', icon:'', noCache:true}
      },
      {
        path:'medicineInfo',
        component:() => import('@/views/maintainProperty/medicineInfo/index'),
        name:'medicineInfo',
        meta:{title:'药物', icon:'', noCache:true}
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
