import request from '@/utils/request'

//添加用户
export function addUser(param) {
    return request({
        url: 'http://localhost:8991/addUser',
        method: 'post',
        data: param
    })
}

//取得所有用户
export function getAllPerson(param) {
    return request({
        url: 'http://localhost:8991/getAllPerson',
        method: 'post',
        data: param
    })
}


//添加投喂记录
export function addFeedRecord(param) {
    return request({
        url: 'http://localhost:8991/addFeedRecord',
        method: 'post',
        data: param
    })
}

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

//添加产蛋记录
export function addEggProductionRecord(param) {
    return request({
        url: 'http://localhost:8991/addEggProductionRecord',
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

