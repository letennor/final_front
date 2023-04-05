// 消息管理
import request from '@/utils/request'

// 消息列表
export function getMessageList(param) {
    return request({
        url: 'rest/message/list',
        method: 'post',
        data: param
    })
}

// 修改消息状态
export function refreshMessageStatus(param) {
    return request({
        url: 'rest/message/read',
        method: 'post',
        data: param
    })
}


//添加消息
export function addMessageInfo(param) {
    return request({
        url: 'http://localhost:8992/addMessageInfo',
        method: 'post',
        data: param
    })
}


//取得所有信息
export function getUserMessageInfo(param) {
    return request({
        url: 'http://localhost:8992/getUserMessageInfo',
        method: 'post',
        data: param
    })
}

//确认消息
export function confirmMessage(param) {
    return request({
        url: 'http://localhost:8992/confirmMessage',
        method: 'post',
        data: param
    })
}