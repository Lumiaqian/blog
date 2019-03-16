import request from '@/utils/request'

export function postComment (data) {
  return request({
    url: '/lumia/comment',
    method: 'post',
    data: data
  })
}

export function getComments (postId) {
  return request({
    url: '/lumia/comments',
    method: 'get',
    params: {
      postId: postId
    }
  })
}
