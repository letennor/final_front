import { getServerUrl, getDictMap } from '@/api/system/dictionary'
import { unreadNum } from '@/api/system/message'

const dictionary = {
  state: {
    fileUrl: '',
    dictMap: {},
    hideLayout: false,
    isFull: false,
    messageNum: 0
  },
  mutations: {
    SET_FILE_URL: (state, fileUrl) => {
      state.fileUrl = fileUrl
    },
    SET_DICT_MAP: (state, dictMap) => {
      state.dictMap = dictMap
    },
    SET_HIDE_LAYOUT: (state, hideLayout) => {
      state.hideLayout = hideLayout
    },
    SET_IS_FULL: (state, isFull) => {
      state.isFull = isFull
    },
    SET_MESSAGE_NUM: (state, messageNum) => {
      state.messageNum = messageNum
    }
  },
  actions: {
    setFileUrl({ commit }) {
      getServerUrl().then(response => {
        commit('SET_FILE_URL', response.result)
      })
    },
    setDictMap({ commit }) {
      getDictMap().then(response => {
        commit('SET_DICT_MAP', response.result)
      })
    },
    setMessageNum({ commit }) {
      unreadNum().then(response => {
        commit('SET_MESSAGE_NUM', response.result)
      })
    },
    setHideLayout({ commit }, hideLayout) {
      commit('SET_HIDE_LAYOUT', hideLayout)
    },
    setIsFull({ commit }, isFull) {
      commit('SET_IS_FULL', isFull)
    }
  }
}

export default dictionary
