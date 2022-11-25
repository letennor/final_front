import request from '@/utils/request'

//取得所有用料
export function getAllFeed(param) {
    return request({
        url: 'http://localhost:8991/getAllFeed',
        method: 'post',
        data: param
    })
}

//取得所有批次
export function getAllBatch(param) {
    return request({
        url: 'http://localhost:8991/getAllBatch',
        method: 'post',
        data: param
    })
}

//添加用料
export function addFeedInfo(param) {
    return request({
        url: 'http://localhost:8991/addFeedInfo',
        method: 'post',
        data: param
    })
}


//添加药物
export function addMedicine(param) {
    return request({
        url: 'http://localhost:8991/addMedicine',
        method: 'post',
        data: param
    })
}

//获取药物
export function getAllMedicine(param) {
    return request({
        url: 'http://localhost:8991/getAllMedicine',
        method: 'post',
        data: param
    })
}


//获取所有货物信息
export function getAllGoodsInfo(param) {
    return request({
        url: 'http://localhost:8991/getAllGoodsInfo',
        method: 'post',
        data: param
    })
}

//添加货物信息
export function addGoodsInfo(param) {
    return request({
        url: 'http://localhost:8991/addGoodsInfo',
        method: 'post',
        data: param
    })
}

//添加批次信息
export function addBatchInfo(param) {
    return request({
        url: 'http://localhost:8991/addBatchInfo',
        method: 'post',
        data: param
    })
}


//删除药物信息
export function deleteMedicineInfo(param) {
    return request({
        url: 'http://localhost:8991/deleteMedicineInfo',
        method: 'post',
        data: param
    })
}


//删除药物信息
export function deleteGoodsInfo(param) {
    return request({
        url: 'http://localhost:8991/deleteGoodsInfo',
        method: 'post',
        data: param
    })
}

//删除喂料信息
export function deleteFeedInfo(param) {
    return request({
        url: 'http://localhost:8991/deleteFeedInfo',
        method: 'post',
        data: param
    })
}