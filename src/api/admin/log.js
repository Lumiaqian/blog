import request from '@/utils/request'

export function getLogs(pageNum, pageSize){
    return request({
        url: 'admin/log/list',
        method: 'get',
        params: {
            pageNum: pageNum,
            pageSize: pageSize
        }
    })
}