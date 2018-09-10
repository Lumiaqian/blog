import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/layout/Layout.vue'
import Home from '@/views/home/'
import Post from '@/views/post'
import About from '@/views/about'
import Tag from '@/views/tag'
import TagPosts from '@/views/tagPosts'
import Category from '@/views/category'
import CatePosts from '@/views/catePosts'
import Archive from '@/views/archive'

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
        path: '/posts',
        name: 'posts',
        component: Post
      }
      ,
      {
        path: '/about',
        name: 'about',
        component: About
      }
      ,
      {
        path: '/tags',
        name: 'tags',
        component: Tag
      }
      ,
      {
        path: '/tags/:tag',
        name: 'TagPosts',
        component: TagPosts
      }
      ,
      {
        path: '/categories',
        name: 'categories',
        component: Category
      }
      ,
      {
        path: '/categories/:category',
        name: 'CatePosts',
        component: CatePosts
      }
      ,
      {
        path: '/archives',
        name: 'archive',
        component: Archive
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
