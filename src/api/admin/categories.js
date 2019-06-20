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
export function getCates (pageNo, pageSize) {
  return request({
    url: '/admin/cates/alist',
    method: 'get',
    params: {
      pageNo: pageNo,
      pageSize: pageSize
    }
  })
}
export function getFatherCates () {
  return request({
    url: '/admin/cates/flist',
    method: 'get'
  })
}
export function saveCate (data) {
  return request({
    url: '/admin/cates/cate',
    method: 'post',
    data: data
  })
}
export function updateCate (data) {
  return request({
    url: '/admin/cates/cate',
    method: 'put',
    data: data
  })
}
export function discardCate (cateId) {
  return request({
    url: '/admin/cates/cate/' + cateId,
    method: 'delete'
  })
}
export function recoveryCate (cateId) {
  return request({
    url: '/admin/cates/cate/' + cateId,
    method: 'put'
  })
}
