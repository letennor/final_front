import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { projectUserInfo } from '@/api/project/project'
import myStroage from '@/utils/sessionStorage'

const user = {
  state: {
    userId: null,
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    privileges: [],
    buttonPrivileges: [],
    projectPrivileges: [],
    projectButtonPrivileges: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PRIVILEGES: (state, privileges) => {
      state.privileges = privileges
    },
    SET_BUTTON_PRIVILEGES: (state, buttonPrivileges) => {
      state.buttonPrivileges = buttonPrivileges
    },
    SET_PROJECT_PRIVILEGES: (state, projectPrivileges) => {
      state.projectPrivileges = projectPrivileges
    },
    SET_PROJECT_BUTTON_PRIVILEGES: (state, projectButtonPrivileges) => {
      state.projectButtonPrivileges = projectButtonPrivileges
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          commit('SET_TOKEN', response.result)
          setToken(response.result)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          const data = response
          const roleArr = data.result.roles
          const privilegesArr = []
          const privilegesButtonArr = []
          data.result.privileges.forEach(function(item) {
            if (item.type === 'menu') {
              privilegesArr.push(item.code)
            } else {
              privilegesButtonArr.push(item.code)
            }
          })
          if (privilegesArr.length === 0) {
            privilegesArr.push('p_zhuye')
          }
          // const buttonPrivilegesArr = data.result.privileges
          commit('SET_ROLES', roleArr)
          commit('SET_PRIVILEGES', privilegesArr)
          commit('SET_BUTTON_PRIVILEGES', privilegesButtonArr)
          commit('SET_NAME', data.result.user ? data.result.user.name : data.result.user.name)
          commit('SET_AVATAR', data.result.user ? data.result.user.photo : '')
          commit('SET_USERID', data.result.user ? data.result.user.id : null)
          // commit('SET_INTRODUCTION', data.introduction)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    },
    setPrivilege({ commit }, type) {
      if (type === 'system') {
        commit('SET_PROJECT_PRIVILEGES', [])
        commit('SET_PROJECT_BUTTON_PRIVILEGES', [])
      } else {
        commit('SET_PRIVILEGES', [])
        commit('SET_BUTTON_PRIVILEGES', [])
      }
    },
    // 获取项目权限
    getProjectPrivileges({ commit }) {
      return new Promise((resolve, reject) => {
        var p1 = new Promise((resolve) => {
          getUserInfo().then(response => {
            resolve(response)
          })
        })
        var p2 = new Promise((resolve) => {
          projectUserInfo({ projectId: JSON.parse(myStroage.getStorage('project')).id }).then(response => {
            resolve(response)
          })
        })
        Promise.all([p1, p2]).then(res => {
          if (res[0].success) {
            const data = res[0]
            const roleArr = data.result.roles
            commit('SET_ROLES', roleArr)
            commit('SET_NAME', data.result.user ? data.result.user.name : data.result.user.name)
            commit('SET_AVATAR', data.result.user ? data.result.user.photo : '')
            commit('SET_USERID', data.result.user ? data.result.user.id : '')
          }
          if (res[1].success) {
            const privilegesArr = []
            const privilegesButtonArr = []
            if (res[1].result.projectPrivileges && res[1].result.projectPrivileges.length > 0) {
              res[1].result.projectPrivileges.forEach(function(item) {
                if (item.type === 'menu') {
                  privilegesArr.push(item.code)
                } else {
                  privilegesButtonArr.push(item.code)
                }
              })
            }
            if (privilegesArr.length === 0) {
              privilegesArr.push('p_zhuye')
            }
            //设置项目权限
            commit('SET_PROJECT_PRIVILEGES', privilegesArr)
            //设置按钮权限
            commit('SET_PROJECT_BUTTON_PRIVILEGES', privilegesButtonArr)
          }
          resolve(res[1])
        })
      })
    }
  }
}

export default user
