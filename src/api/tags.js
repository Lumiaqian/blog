import request from '@/utils/request'

export function getTags () {
  return request({
    url: '/lumia/tags/list',
    method: 'get'
  })
}

export function getPosts (tagId) {
  return request({
    url: '/lumia/tags/posts/' + tagId,
    method: 'get'
  })
}