import request from '@/utils/request'

export function updateSetting (data) {
  return request({
    url: 'admin/setting',
    method: 'post',
    data: data
  })
}
export function updateSocial (user) {
  return request({
    url: 'admin/social',
    method: 'post',
    data: user
  })
}
