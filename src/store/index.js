import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import getters from './getters'
import tag from './modules/tag'
import category from './modules/category'
import common from './modules/common'
import permission from './modules/permission'
import user from './modules/user'
import tagsView from './modules/tagsView'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    tag,
    category,
    common,
    permission,
    user,
    app,
    tagsView
  },
  getters
})
export default store
