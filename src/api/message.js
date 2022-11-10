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
