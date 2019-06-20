import request from '@/utils/request'

export function getImages (pageNo, pageSize) {
  return request({
    url: 'qiniu/images',
    method: 'get',
    params: {
      pageNo: pageNo,
      pageSize: pageSize
    }
  })
}
