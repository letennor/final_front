import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    changeSideBar: false,
    language: Cookies.get('language') || 'en',
    loading: false,
    bigSize: false
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      console.log('opened:',state.sidebar.opened)
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    SET_LOADING: (state, loading) => {
      state.loading = loading
      Cookies.set('language', loading)
    },
    SET_BIG_SIZE: (state, bigSize) => {
      state.bigSize = bigSize
    },
    SET_CHANGE_SIDEBAR: (state, changeSideBar) => {
      state.changeSideBar = changeSideBar
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    setLoading({ commit }, loading) {
      commit('SET_LOADING', loading)
    },
    setBigSize({ commit }, bigSize) {
      commit('SET_BIG_SIZE', bigSize)
    },
    setChangeSidebar({ commit }, changeSideBar) {
      commit('SET_CHANGE_SIDEBAR', changeSideBar)
    }
  }
}

export default app
