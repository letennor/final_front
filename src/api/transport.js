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

//取得所有进货信息
export function getAllIncomingRecord(param) {
    return request({
        url: 'http://localhost:8991/getAllIncomingRecord',
        method: 'post',
        data: param
    })
}

//删除进货信息
export function deleteIncomingRecord(param) {
    return request({
        url: 'http://localhost:8991/deleteIncomingRecord',
        method: 'post',
        data: param
    })
}

//取得所有出苗信息
export function getAllOutputRecord(param) {
    return request({
        url: 'http://localhost:8991/getAllOutputRecord',
        method: 'post',
        data: param
    })
}

//删除出苗信息
export function deleteOutputRecord(param) {
    return request({
        url: 'http://localhost:8991/deleteOutputRecord',
        method: 'post',
        data: param
    })
}


//删除运输信息
export function deleteTransportRecord(param) {
    return request({
        url: 'http://localhost:8991/deleteTransportRecord',
        method: 'post',
        data: param
    })
}

//修改进货信息
export function updateIncomingRecord(param) {
    return request({
        url: 'http://localhost:8991/updateIncomingRecord',
        method: 'post',
        data: param
    })
}

//修改出苗信息
export function updateOutputRecord(param) {
    return request({
        url: 'http://localhost:8991/updateOutputRecord',
        method: 'post',
        data: param
    })
}

//修改运输信息
export function updateTransportRecord(param) {
    return request({
        url: 'http://localhost:8991/updateTransportRecord',
        method: 'post',
        data: param
    })
}

