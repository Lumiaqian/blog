import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/layout/Layout.vue'
import Home from '@/views/home/'
import Post from '@/views/post'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '',
    name: 'index',
    component: Layout,
    children: [
      {
        path: 'home',
        component: Home
      },
      ,
      {
        path: '/post',
        name: 'post',
        component: Post
      }
    ],
    redirect: '/home'
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
