import request from '@/utils/request'

export function getWeather () {
  return request({
    url: '/utils/weather',
    method: 'get'
  })
}
