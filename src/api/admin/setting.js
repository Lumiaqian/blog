import request from '@/utils/request'

export function updateSetting (data) {
  return request({
    url: 'admin/setting',
    method: 'post',
    data: data
  })
}
