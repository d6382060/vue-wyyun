import { createStore } from 'vuex'

export default createStore({
  state: {
    centerDialogVisible: false,// 弹出登录框
    playAudioSrc: null   // 播放链接

  },
  mutations: {
    islogDialog (state) {
      state.centerDialogVisible = true
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
