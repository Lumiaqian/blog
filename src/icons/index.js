import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg组件

// 注册全局组件
Vue.component('svg-icon', SvgIcon)

// 引入所有的svg的文件
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
