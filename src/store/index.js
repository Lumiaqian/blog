import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import tag from './modules/tag'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    tag
  },
  getters
})
export default store
