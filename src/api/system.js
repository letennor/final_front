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


//取得所有用户密码信息
export function getAllUserPasswordInfo(param) {
    return request({
        url: 'http://localhost:8991/getAllUserPasswordInfo',
        method: 'post',
        data: param
    })
}
