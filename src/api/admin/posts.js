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
export function postList(data) {
  return request({
    url: '/admin/posts/list',
    method: 'post',
    data: data
  })
}
export function post (postId) {
  return request({
    url: '/admin/posts/' + postId,
    method: 'get'
  })
}
export function posts (pageNo, pageSize) {
  return request({
    url: '/admin/posts/list',
    method: 'get',
    params: {
      pageNo: pageNo,
      pageSize: pageSize
    }
  })
}
export function draftPosts (pageNo,pageSize) {
  return request({
    url: '/admin/posts/draftPosts',
    method: 'get',
    params: {
      pageNo: pageNo,
      pageSize: pageSize
    }
  })
}
export function deletedPosts(pageNo,pageSize) {
  return request({
    url: '/admin/posts/deletedPosts',
    method: 'get',
    params: {
      pageNo: pageNo,
      pageSize: pageSize
    }
  })
}
export function discardPost (postId) {
  return request({
    url: '/admin/posts/discard/' + postId,
    method: 'delete'
  })
}
export function pubPost (postId) {
  return request({
    url: '/admin/posts/pub/' + postId,
    method: 'put'
  })
}
export function draftPost (postId) {
  return request({
    url: '/admin/posts/draft/' + postId,
    method: 'put'
  })
}
