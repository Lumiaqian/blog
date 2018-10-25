import request from '@/utils/request'

export function getCategories () {
  return request({
    url: '/admin/cates/list',
    method: 'get'
  })
}

export function getPosts (categoryId) {
    return request({
      url: '/admin/categories/posts/' + categoryId,
      method: 'get'
    })
}