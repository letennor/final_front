import request from '@/utils/request'

export function unreadNum(param) {
  return request({
    url: 'rest/message/unreadNum',
    method: 'post',
    data: param
  })
}

export function sendSysMessage(param) {
  return request({
    url: 'rest/message/sendSysMessage',
    method: 'post',
    data: param
  })
}

export function readMessage(param) {
  return request({
    url: 'rest/message/read',
    method: 'post',
    data: param
  })
}

export function getMessageList(param) {
  return request({
    url: 'rest/message/list',
    method: 'post',
    data: param
  })
}

export function deleteMessage(param) {
  return request({
    url: 'rest/message/delete',
    method: 'post',
    data: param
  })
}
