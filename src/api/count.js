import request from '@/utils/request'

export function getCount () {
  return request({
    url: '/lumia/count',
    method: 'get'
  })
}
