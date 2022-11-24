import request from '@/utils/request'

//添加运输信息
export function addTransportRecord(param) {
    return request({
        url: 'http://localhost:8991/addTransportRecord',
        method: 'post',
        data: param
    })
}

//获取所有运输信息
export function getAllTransportRecord(param) {
    return request({
        url: 'http://localhost:8991/getAllTransportRecord',
        method: 'post',
        data: param
    })
}

//添加进货信息
export function addIncomingRecord(param) {
    return request({
        url: 'http://localhost:8991/addIncomingRecord',
        method: 'post',
        data: param
    })
}

//添加出苗记录
export function addOutputRecord(param) {
    return request({
        url: 'http://localhost:8991/addOutputRecord',
        method: 'post',
        data: param
    })
}
