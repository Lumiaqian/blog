import request from '@/utils/request'
import qs from 'qs'

export function login (user) {
    console.log('进入api: login')
    return request({
      url: '/login',
      method: 'post',
      data: user,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [function (data) {
        return qs.stringify(data);
      }],
    })
  }