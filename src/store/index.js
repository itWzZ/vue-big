import Vue from 'vue'
import Vuex from 'vuex'
import { userinfoApi } from '../api/index.js'
// 1. 导入包
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
export default new Vuex.Store({
  // plugins: [createPersistedState()],
  state: {
    token: sessionStorage.getItem('token'),
    userInfo: {}
  },
  mutations: {
    // 将token保存到仓库中
    updateToken (state, token) {
      sessionStorage.setItem('token', token)
      state.token = token
    },
    // 退出首页时,将浏览器中的token清除
    delToken (state) {
      state.token = ''
    },
    // 将获取到的用户信息存储到仓库中
    setUser (state, info) {
      state.userInfo = info
    }
  },
  actions: {
    async userInfoHandle ({ commit }) {
      const res = await userinfoApi()
      commit('setUser', res.data.data)
    }
  },
  modules: {}
})
