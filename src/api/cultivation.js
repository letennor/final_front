import request from '@/utils/request'

//添加投喂记录
export function addFeedRecord(param) {
    return request({
        url: 'http://localhost:8991/addFeedRecord',
        method: 'post',
        data: param
    })
}

//添加产蛋记录
export function addEggProductionRecord(param) {
    return request({
        url: 'http://localhost:8991/addEggProductionRecord',
        method: 'post',
        data: param
    })
}


//添加投药记录
export function addDosingRecord(param) {
    return request({
        url: 'http://localhost:8991/addDosingRecord',
        method: 'post',
        data: param
    })
}

//添加死亡记录
export function addDeathRecord(param) {
    return request({
        url: 'http://localhost:8991/addDeathRecord',
        method: 'post',
        data: param
    })
}


//获取所有死亡记录
export function getAllDeathRecord(param) {
    return request({
        url: 'http://localhost:8991/getAllDeathRecord',
        method: 'post',
        data: param
    })
}

//添加个体死亡记录
export function addIndividualDeathRecord(param) {
    return request({
        url: 'http://localhost:8991/addIndividualDeathRecord',
        method: 'post',
        data: param
    })
}

//添加受精信息
export function addFertilizationRecord(param) {
    return request({
        url: 'http://localhost:8991/addFertilizationRecord',
        method: 'post',
        data: param
    })
}

//取得所有喂养信息
export function getAllFeedRecord(param) {
    return request({
        url: 'http://localhost:8991/getAllFeedRecord',
        method: 'post',
        data: param
    })
}

//删除喂养信息
export function deleteFeedRecord(param) {
    return request({
        url: 'http://localhost:8991/deleteFeedRecord',
        method: 'post',
        data: param
    })
}

//取得所有产蛋量信息
export function getAllEggProductionRecord(param) {
    return request({
        url: 'http://localhost:8991/getAllEggProductionRecord',
        method: 'post',
        data: param
    })
}

//删除产蛋量信息
export function deleteEggProductionRecord(param) {
    return request({
        url: 'http://localhost:8991/deleteEggProductionRecord',
        method: 'post',
        data: param
    })
}

//取得所有个体死亡信息
export function getAllIndividualDeathRecord(param) {
    return request({
        url: 'http://localhost:8991/getAllIndividualDeathRecord',
        method: 'post',
        data: param
    })
}

//删除个体死亡信息
export function deleteIndividualDeathRecord(param) {
    return request({
        url: 'http://localhost:8991/deleteIndividualDeathRecord',
        method: 'post',
        data: param
    })
}

//取得所有投药信息
export function getAllDosingRecord(param) {
    return request({
        url: 'http://localhost:8991/getAllDosingRecord',
        method: 'post',
        data: param
    })
}

//删除投药信息
export function deleteDosingRecord(param) {
    return request({
        url: 'http://localhost:8991/deleteDosingRecord',
        method: 'post',
        data: param
    })
}

//取得所有受精信息
export function getAllFertilizationRecord(param) {
    return request({
        url: 'http://localhost:8991/getAllFertilizationRecord',
        method: 'post',
        data: param
    })
}

//删除受精信息
export function deleteFertilizationRecord(param) {
    return request({
        url: 'http://localhost:8991/deleteFertilizationRecord',
        method: 'post',
        data: param
    })
}
