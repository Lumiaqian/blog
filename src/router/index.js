import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Layout from '@/views/blog/layout/Layout.vue'
import Home from '@/views/blog/home/'
import Post from '@/views/blog/post'
import About from '@/views/blog/about'
import Tag from '@/views/blog/tag'
import TagPosts from '@/views/blog/tagPosts'
import Category from '@/views/blog/category'
import CatePosts from '@/views/blog/catePosts'
import Archive from '@/views/blog/archive'
import Login from '@/views/admin/login'
import AdminLayout from '@/views/admin/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    hidden: true
  }
  ,
  {
    path: '',
    name: 'index',
    component: Layout,
    redirect: '/home',
    hidden: true,
    children: [
      {
        path: 'home',
        component: Home,
        hidden: true
      }
      ,
      {
        path: '/posts',
        name: 'posts',
        component: Post,
        hidden: true
      }
      ,
      {
        path: '/about',
        name: 'about',
        component: About,
        hidden: true
      }
      ,
      {
        path: '/tags',
        name: 'tags',
        component: Tag,
        hidden: true
      }
      ,
      {
        path: '/tags/:tag',
        name: 'TagPosts',
        component: TagPosts,
        hidden: true
      }
      ,
      {
        path: '/categories',
        name: 'categories',
        component: Category,
        hidden: true
      }
      ,
      {
        path: '/categories/:category',
        name: 'CatePosts',
        component: CatePosts,
        hidden: true
      }
      ,
      {
        path: '/archives',
        name: 'archive',
        component: Archive,
        hidden: true
      }
    ]
  }
  // ,
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   component: AdminLayout
  // }
]

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
router.beforeEach((to, from, next) => {
  if (to.fullPath.indexOf('/admin') !== -1){
    store.commit('IS_ADMIN_WRAP',true)
  }else{
    store.commit('IS_ADMIN_WRAP',false)
  }
  if (to.meta.requireAuth) {
    if (!getAccessToken()) {
      store.commit('IS_LOGIN', false)
    }
    NProgress.start()
    next()
  } else {
    NProgress.start()
    next() // 确保一定要调用 next()
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router

export const asyncRouterMap = [
  {
    path: '/admin',
    component: AdminLayout,
    name: 'dashboard',
    redirect: '/admin/index',
    //alwaysShow: true, // will always show the root menu
    children: [
      {
        path: 'index',
        component: () => import('@/views/admin/dashboard/index'),
        name: 'dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/admin/hello',
    component: AdminLayout,
    children: [{
      path: 'index',
      component: () => import('@/components/HelloWorld'),
      name: 'test',
      meta: { title: 'test', icon: 'hello', noCache: true }
    }]
  },
  {
    path: '/admin/post',
    component: AdminLayout,
    name: 'post',
    meta: { title: 'post', icon: 'post', noCache: true },
    redirect: 'noredirect',
    children: [{
      path: 'write',
      component: () => import('@/views/admin/writer/index'),
      name: 'write',
      meta: { title: 'write', icon: 'write', noCache: true }
    },
    {
      path: 'management',
      component: () => import('@/views/admin/postManagement/index'),
      name: 'management',
      meta: { title: 'management', icon: 'management', noCache: true }
    },
    {
      path: 'draftBox',
      component: () => import('@/views/admin/draftBox/index'),
      name: 'draftBox',
      meta: { title: 'draftBox', icon: 'draftBox', noCache: true }
    },
    {
      path: 'trashCan',
      component: () => import('@/views/admin/trashCan/index'),
      name: 'trashCan',
      meta: { title: 'trashCan', icon: 'trashCan', noCache: true }
    },{
      path: 'editPost',
      hidden: true,
      component: ()=> import('@/views/admin/editPost/index'),
      name: 'editPost',
      meta: {title: 'editPost', icon: 'editPost', noCache: true}
    }]
  }
]
