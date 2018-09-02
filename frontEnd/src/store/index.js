import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    waveRaising: 0,
    loginOption: '',
    reginOption: ''
  },
  mutations: {
    waveRaising (state) {
      state.waveRaising = 1
    },
    logInOption (state, option) {
      state.loginOption = option
    },
    regInOption (state, option) {
      state.reginOption = option
    },
    formCompliteError (state) {
      state.formCompliteError = true
    }
  }
})
