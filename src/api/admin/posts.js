import request from '@/utils/request'

export function save (data) {
  return request({
    url: '/admin/posts/save',
    method: 'post',
    data: data
  })
}
export function pub (data) {
  return request({
    url: '/admin/posts/pub',
    method: 'post',
    data: data
  })
}
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
