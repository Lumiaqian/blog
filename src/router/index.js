import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/layout/Layout.vue'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    component: Layout
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {

  }
]
