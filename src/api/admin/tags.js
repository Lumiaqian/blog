import request from '@/utils/request'

export function getTags () {
  return request({
    url: '/admin/tags/list',
    method: 'get'
  })
}

export function getPosts (tagId) {
  return request({
    url: '/admin/tags/posts/' + tagId,
    method: 'get'
  })
}