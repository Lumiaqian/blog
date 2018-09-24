import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/blog/layout/Layout.vue'
import Home from '@/views/blog/home/'
import Post from '@/views/blog/post'
import About from '@/views/blog/about'
import Tag from '@/views/blog/tag'
import TagPosts from '@/views/blog/tagPosts'
import Category from '@/views/blog/category'
import CatePosts from '@/views/blog/catePosts'
import Archive from '@/views/blog/archive'

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
