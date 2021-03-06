import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Layout from '@/views/blog/layout/Layout.vue'
import Home from '@/views/blog/home/'
// eslint-disable-next-line no-unused-vars
import Post from '@/views/blog/post'
import About from '@/views/blog/about'
import Tag from '@/views/blog/tag'
import TagPosts from '@/views/blog/tagPosts'
import Category from '@/views/blog/category'
import CatePosts from '@/views/blog/catePosts'
import Archive from '@/views/blog/archive'
import Login from '@/views/admin/login'
import AdminLayout from '@/views/admin/layout/Layout'
import Search from '@/views/blog/search'
import Article from '@/views/blog/article'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    hidden: true
  },
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
      },
      {
        path: '/posts',
        name: 'posts',
        component: Article,
        hidden: true
      },
      {
        path: '/about',
        name: 'about',
        component: About,
        hidden: true
      },
      {
        path: '/tags',
        name: 'tags',
        component: Tag,
        hidden: true
      },
      {
        path: '/tags/tag',
        name: 'TagPosts',
        component: TagPosts,
        hidden: true
      },
      {
        path: '/categories',
        name: 'categories',
        component: Category,
        hidden: true
      },
      {
        path: '/categories/category',
        name: 'CatePosts',
        component: CatePosts,
        hidden: true
      },
      {
        path: '/archives',
        name: 'archive',
        component: Archive,
        hidden: true
      },
      {
        path: '/search',
        name: 'search',
        component: Search,
        hidden: true
      }
    ]
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    name: 'Page401',
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    name: 'Page404',
    hidden: true
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
  // console.log(constantRouterMap.path)
  if (to.fullPath.indexOf('/admin') !== -1) {
    store.commit('IS_ADMIN_WRAP', true)
  } else if (to.fullPath.indexOf('/40') !== -1) {
    // console.log(to)
    store.commit('IS_ERROR_WRAP', true)
  } else {
    store.commit('IS_ADMIN_WRAP', false)
  }
  if (to.meta.requireAuth) {
    // eslint-disable-next-line no-undef
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
    // alwaysShow: true, // will always show the root menu
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
      path: 'uploadPost',
      component: () => import('@/views/admin/uploadPost/index'),
      name: 'uploadPost',
      meta: { title: 'uploadPost', icon: 'upload', noCache: true }
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
    }, {
      path: 'editPost',
      hidden: true,
      component: () => import('@/views/admin/editPost/index'),
      name: 'editPost',
      meta: {title: 'editPost', icon: 'editPost', noCache: true}
    }]
  },
  {
    path: '/admin/tag',
    component: AdminLayout,
    children: [{
      path: 'index',
      component: () => import('@/views/admin/tag/index'),
      name: 'tag',
      meta: {title: 'tag', icon: 'tag', noCache: true}
    }]
  },
  {
    path: '/admin/category',
    component: AdminLayout,
    children: [{
      path: 'index',
      component: () => import('@/views/admin/cate/index'),
      name: 'category',
      meta: {title: 'category', icon: 'category', noCache: true}
    }]
  },
  {
    path: '/admin/setting',
    component: AdminLayout,
    name: 'setting',
    meta: { title: 'setting', icon: 'setting', noCache: true },
    redirect: 'noredirect',
    children: [{
      path: 'baseSetting',
      component: () => import('@/views/admin/setting/index'),
      name: 'baseSetting',
      meta: {title: 'baseSetting', icon: 'baseSetting', noCache: true}
    },
    {
      path: 'aboutMe',
      component: () => import('@/components/HelloWorld'),
      name: 'aboutMe',
      meta: {title: 'aboutMe', icon: 'aboutMe', noCache: true}
    }]
  },
  {
    path: '/admin/qiniu',
    component: AdminLayout,
    name: 'qiniu',
    meta: { title: 'qiniu', icon: 'qiniu', noCache: true },
    redirect: 'noredirect',
    alwaysShow: true,
    children: [
      {
        path: 'imags',
        component: () => import('@/views/admin/images/index'),
        name: 'imags',
        meta: {title: 'imags', icon: 'imags', noCache: true}
      }]
  },
  {
    path: '/admin/other',
    component: AdminLayout,
    name: 'other',
    meta: { title: 'other', icon: 'other', noCache: true },
    redirect: 'noredirect',
    alwaysShow: true,
    children: [
      {
        path: 'logout',
        component: () => import('@/components/HelloWorld'),
        name: 'logout',
        meta: {title: 'logout', icon: 'logout', noCache: true}
      }]
  },
  { path: '*', redirect: '/404', hidden: true }
]
