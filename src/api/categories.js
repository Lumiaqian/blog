import request from '@/utils/request'

export function getCategories () {
  return request({
    url: '/lumia/categories/list',
    method: 'get'
  })
}

export function getPosts (categoryId) {
    return request({
      url: '/lumia/categories/posts/' + categoryId,
      method: 'get'
    })
}