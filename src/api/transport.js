import request from '@/utils/request'

//添加运输信息
export function addTransportRecord(param) {
    return request({
        url: 'http://localhost:8992/addTransportRecord',
        method: 'post',
        data: param
    })
}

//获取所有运输信息
export function getAllTransportRecord(param) {
    return request({
        url: 'http://localhost:8992/getAllTransportRecord',
        method: 'post',
        data: param
    })
}

//添加进货信息
export function addIncomingRecord(param) {
    return request({
        url: 'http://localhost:8992/addIncomingRecord',
        method: 'post',
        data: param
    })
}

//添加出苗记录
export function addOutputRecord(param) {
    return request({
        url: 'http://localhost:8992/addOutputRecord',
        method: 'post',
        data: param
    })
}

//取得所有进货信息
export function getAllIncomingRecord(param) {
    return request({
        url: 'http://localhost:8992/getAllIncomingRecord',
        method: 'post',
        data: param
    })
}

//删除进货信息
export function deleteIncomingRecord(param) {
    return request({
        url: 'http://localhost:8992/deleteIncomingRecord',
        method: 'post',
        data: param
    })
}

//取得所有出苗信息
export function getAllOutputRecord(param) {
    return request({
        url: 'http://localhost:8992/getAllOutputRecord',
        method: 'post',
        data: param
    })
}

//删除出苗信息
export function deleteOutputRecord(param) {
    return request({
        url: 'http://localhost:8992/deleteOutputRecord',
        method: 'post',
        data: param
    })
}


//删除运输信息
export function deleteTransportRecord(param) {
    return request({
        url: 'http://localhost:8992/deleteTransportRecord',
        method: 'post',
        data: param
    })
}

//修改进货信息
export function updateIncomingRecord(param) {
    return request({
        url: 'http://localhost:8992/updateIncomingRecord',
        method: 'post',
        data: param
    })
}

//修改出苗信息
export function updateOutputRecord(param) {
    return request({
        url: 'http://localhost:8992/updateOutputRecord',
        method: 'post',
        data: param
    })
}

//修改运输信息
export function updateTransportRecord(param) {
    return request({
        url: 'http://localhost:8992/updateTransportRecord',
        method: 'post',
        data: param
    })
}


//按条件获取进货信息
export function getIncomingRecordByCondition(param) {
    return request({
        url: 'http://localhost:8992/getIncomingRecordByCondition',
        method: 'post',
        data: param
    })
}

//按条件获取出货信息
export function getOutputRecordByCondition(param) {
    return request({
        url: 'http://localhost:8992/getOutputRecordByCondition',
        method: 'post',
        data: param
    })
}


//按条件获取运输信息
export function getTransportRecordByCondition(param) {
    return request({
        url: 'http://localhost:8992/getTransportRecordByCondition',
        method: 'post',
        data: param
    })
}

//进货图示信息
export function getIncomingRecordChart(param) {
    return request({
        url: 'http://localhost:8992/getIncomingRecordChart',
        method: 'post',
        data: param
    })
}

//出苗图示信息
export function getOutputRecordChart(param) {
    return request({
        url: 'http://localhost:8992/getOutputRecordChart',
        method: 'post',
        data: param
    })
}




