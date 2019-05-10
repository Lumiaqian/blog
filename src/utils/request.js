import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import { getToken, setToken, removeToken } from '@/utils/auth'
import store from '@/store'
import { Message } from 'element-ui'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 30000 // 请求超时时间
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (store.getters.token) {
    config.headers.Authorization = getToken()
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  // console.log(JSON.stringify(error)) // for debug
  Message({
    message: JSON.parse(JSON.stringify(error)).response.data.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})
export default service
