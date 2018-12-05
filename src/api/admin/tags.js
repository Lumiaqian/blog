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
export function getTagList (pageNo, pageSize) {
  return request({
    url: '/admin/tags/alist',
    method: 'get',
    params: {
      pageNo: pageNo,
      pageSize: pageSize
    }
  })
}
export function addTag (tag) {
  return request({
    url: '/admin/tags/tag',
    method: 'post',
    data: tag
  })
}
export function updateTag (tag) {
  return request({
    url: '/admin/tags/tag',
    method: 'put',
    data: tag
  })
}
export function discardTag (tagId) {
  return request({
    url: '/admin/tags/tag/' + tagId,
    method: 'delete'
  })
}
export function recoveryTag (tagId) {
  return request({
    url: '/admin/tags/tag/' + tagId,
    method: 'put'
  })
}
