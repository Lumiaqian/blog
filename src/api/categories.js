import request from '@/utils/request'

export function getCategories () {
  return request({
    url: '/lumia/categories/list',
    method: 'get'
  })
}

export function getPosts (categoryId, pageNo, pageSize) {
  return request({
    url: '/lumia/categories/posts/' + categoryId,
    method: 'get',
    params: {
      pageNo: pageNo,
      pageSize: pageSize
    }
  })
}
