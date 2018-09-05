import request from '@/utils/request'

export function about () {
  return request({
    url: '/lumia/posts/about',
    method: 'get'
  })
}