import request from '@/utils/request'

export function post (postId) {
  return request({
    url: '/lumia/posts/' + postId,
    method: 'get'
  })
}
export function posts (pageNo, pageSize) {
  return request({
    url: '/lumia/posts/list?pageNo=' + pageNo + '&pageSize=' + pageSize,
    method: 'get'
  })
}
export function search (data) {
  return request({
    url: '/lumia/posts/search',
    method: 'post',
    data: data
  })
}
