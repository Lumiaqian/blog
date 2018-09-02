import request from '@/utils/request'

export function getWeather (ip) {
  return request({
    url: '/utils/weather/' + ip,
    method: 'get'
  })
}
