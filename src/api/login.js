import request from '@/utils/request'
import qs from 'qs'

export function loginByUsername (username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/login',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
      return qs.stringify(data)
    }]
  })
}

export function logout () {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo (username) {
  return request({
    url: '/lumia/user/info',
    method: 'get',
    params: { username }
  })
}
