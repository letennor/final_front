import request from '@/utils/request'

//获取某一段时间内的产蛋记录
export function getRangeTimeEggProductionRecord(param) {
    return request({
        url: 'http://localhost:8991/getRangeTimeEggProductionRecord',
        method: 'post',
        data: param
    })
}

//获取某一段时间内的投药记录
export function getRangeTimeDosingRecord(param) {
    return request({
        url: 'http://localhost:8991/getRangeTimeDosingRecord',
        method: 'post',
        data: param
    })
}

//获取某一段时间内的喂养记录
export function getRangeTimeFeedRecord(param) {
    return request({
        url: 'http://localhost:8991/getRangeTimeFeedRecord',
        method: 'post',
        data: param
    })
}



