import { asyncRouterMap } from '@/router'
import constantRouterMap from '@/router/modules/constantRouterMap'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.privileges) {
    return roles.some(role => route.meta.privileges.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    isProject: true
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_IS_PROJECT: (state, isProject) => {
      state.isProject = isProject
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { privilegesArr } = data
        // let accessedRouters
        // if (roles.indexOf('ROLE_admin') >= 0) {
        //   accessedRouters = asyncRouterMap
        // } else {
        const accessedRouters = filterAsyncRouter(asyncRouterMap, privilegesArr)
        // }
        // 切换为系统
        commit('SET_IS_PROJECT', false)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
