import axios from 'axios'

export function getIp () {
  return axios.request({
    url: '/api',
    method: 'get'
  })
}
