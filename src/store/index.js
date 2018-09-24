import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import tag from './modules/tag'
import category from './modules/category'
import common from './modules/common'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    tag,
    category,
    common
  },
  getters
})
export default store
