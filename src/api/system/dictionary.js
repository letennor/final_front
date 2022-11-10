import request from '@/utils/request'

export function getServerUrl(param) {
  return request({
    url: 'rest/doc/serverUrl',
    method: 'post',
    data: param
  })
}

export function getDicList(param) {
  return request({
    url: 'rest/dic/list',
    method: 'post',
    data: param
  })
}

export function deleteDic(param) {
  return request({
    url: 'rest/dic/delete',
    method: 'post',
    data: param
  })
}

export function saveDic(param) {
  return request({
    url: 'rest/dic/save',
    method: 'post',
    data: param
  })
}

// 获取所有字典map对象
export function getDictMap(param) {
  return request({
    url: 'rest/dic/getDicMap',
    method: 'post',
    data: param
  })
}
