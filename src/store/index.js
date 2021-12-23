import { createStore } from 'vuex'

export default createStore({
  state: {
    centerDialogVisible: false,// 弹出登录框

  },
  mutations: {
    islogDialog (state) {
      state.centerDialogVisible = !state.centerDialogVisible
    },
    playAudioSrcchg (state, src) {
      state.playAudioSrc = src
    }

  },
  actions: {

  },
  getters: {

  }
})
