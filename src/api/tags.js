import request from '@/utils/request'

export function getTags () {
  return request({
    url: '/lumia/tags/list',
    method: 'get'
  })
}

export function getPosts (tagId, pageNo, pageSize) {
  console.log(pageNo, pageSize)
  return request({
    url: '/lumia/tags/posts/' + tagId,
    method: 'get',
    params: {
      pageNo: pageNo,
      pageSize: pageSize
    }
  })
}
