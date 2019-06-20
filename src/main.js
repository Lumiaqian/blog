// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import '@/icons'
import './permission'
import store from './store'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import i18n from './lang' // Internationalization
import '@/styles/index.scss'
import uploader from 'vue-simple-uploader'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Highlight from './utils/mHighlight'
import {formatDate} from '@/utils/date.js'
import VCharts from 'v-charts'

Vue.config.productionTip = false
Vue.use(ElementUI, {
  // size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(mavonEditor)
Vue.use(uploader)
Vue.use(Viewer)
Vue.use(Highlight)
Vue.use(VCharts)
Vue.filter('formatDate', function (time) {
  var date = new Date(time)
  return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App),
  template: '<App/>'
})
