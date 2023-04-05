import request from '@/utils/request'

//添加用户
export function addUser(param) {
    return request({
        url: 'http://localhost:8992/addUser',
        method: 'post',
        data: param
    })
}

//取得所有用户
export function getAllPerson(param) {
    return request({
        url: 'http://localhost:8992/getAllPerson',
        method: 'post',
        data: param
    })
}


//取得所有用户密码信息
export function getAllUserPasswordInfo(param) {
    return request({
        url: 'http://localhost:8992/getAllUserPasswordInfo',
        method: 'post',
        data: param
    })
}

//删除用户
export function deleteUserBasicInfo(param) {
    return request({
        url: 'http://localhost:8992/deleteUserBasicInfo',
        method: 'post',
        data: param
    })
}

//修改用户
export function updateUser(param) {
    return request({
        url: 'http://localhost:8992/updateUserBasicInfo',
        method: 'post',
        data: param
    })
}

//修改用户状态
export function changeState(param) {
    return request({
        url: 'http://localhost:8992/changeState',
        method: 'post',
        data: param
    })
}

//取得所有司机
export function getAllDriver(param) {
    return request({
        url: 'http://localhost:8992/getAllDriver',
        method: 'post',
        data: param
    })
}


//取得某个人的所有信息
export function getPersonInfoByUserBasicInfoId(param) {
    return request({
        url: 'http://localhost:8992/getPersonInfoByUserBasicInfoId',
        method: 'post',
        data: param
    })
}