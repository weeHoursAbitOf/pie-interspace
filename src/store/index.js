import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
// import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'
import user from './modules/user'
import editor from './modules/editor'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    editor
  },
  state,
  // mutations,
  actions,
  getters
})