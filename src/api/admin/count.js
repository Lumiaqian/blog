import request from '@/utils/request'

export function getCount () {
  return request({
    url: '/admin/count',
    method: 'get'
  })
}
