import request from '@/utils/request'

export function getCount () {
  return request({
    url: '/admin/count',
    method: 'get'
  })
}
export function getDeviceCount () {
  return request({
    url: '/admin/device/count',
    method: 'get'
  })
}
