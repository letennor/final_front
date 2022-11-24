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