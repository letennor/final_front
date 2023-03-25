import request from '@/utils/request'

//取得所有人员当天的工作流信息
export function getAllPersonWorkFlowCurrentDate(param) {
    return request({
        url: 'http://localhost:8992/getAllPersonWorkFlowCurrentDate',
        method: 'post',
        data: param
    })
}
