import request from '@/utils/request'

export function loginByUsername(mobile, password) {
  const data = {
    userName: mobile,
    password
  }
  return request({
    url: 'http://localhost:8992/login',
    method: 'post',
    data
  })
}

export function logout(param) {
  return request({
    url: 'http://localhost:8992/logout',
    method: 'post',
    data: param
  })
}

//获取token
export function testGenerateToken(param) {
  return request({
    url: 'http://localhost:8992/testGenerateToken',
    method: 'post',
    data: param
  })
}

//取得信息
export function getUserInfo(param) {
  return request({
    url: 'http://localhost:8992/getUserInfo',
    method: 'post',
    data: param
  })
}

