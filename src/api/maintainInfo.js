import request from '@/utils/request'

//取得所有用料
export function getAllFeed(param) {
    return request({
        url: 'http://localhost:8992/getAllFeed',
        method: 'post',
        data: param
    })
}

//取得所有批次
export function getAllBatch(param) {
    return request({
        url: 'http://localhost:8992/getAllBatch',
        method: 'post',
        data: param
    })
}

//添加用料
export function addFeedInfo(param) {
    return request({
        url: 'http://localhost:8992/addFeedInfo',
        method: 'post',
        data: param
    })
}


//添加药物
export function addMedicine(param) {
    return request({
        url: 'http://localhost:8992/addMedicine',
        method: 'post',
        data: param
    })
}

//获取药物
export function getAllMedicine(param) {
    return request({
        url: 'http://localhost:8992/getAllMedicine',
        method: 'post',
        data: param
    })
}


//获取所有货物信息
export function getAllGoodsInfo(param) {
    return request({
        url: 'http://localhost:8992/getAllGoodsInfo',
        method: 'post',
        data: param
    })
}

//添加货物信息
export function addGoodsInfo(param) {
    return request({
        url: 'http://localhost:8992/addGoodsInfo',
        method: 'post',
        data: param
    })
}

//添加批次信息
export function addBatchInfo(param) {
    return request({
        url: 'http://localhost:8992/addBatchInfo',
        method: 'post',
        data: param
    })
}


//删除药物信息
export function deleteMedicineInfo(param) {
    return request({
        url: 'http://localhost:8992/deleteMedicineInfo',
        method: 'post',
        data: param
    })
}


//删除药物信息
export function deleteGoodsInfo(param) {
    return request({
        url: 'http://localhost:8992/deleteGoodsInfo',
        method: 'post',
        data: param
    })
}

//删除喂料信息
export function deleteFeedInfo(param) {
    return request({
        url: 'http://localhost:8992/deleteFeedInfo',
        method: 'post',
        data: param
    })
}

//删除批次信息
export function deleteBatchInfo(param) {
    return request({
        url: 'http://localhost:8992/deleteBatchInfo',
        method: 'post',
        data: param
    })
}

//更新批次信息
export function updateBatchInfo(param) {
    return request({
        url: 'http://localhost:8992/updateBatchInfo',
        method: 'post',
        data: param
    })
}

//更新用料信息
export function updateFeedInfo(param) {
    return request({
        url: 'http://localhost:8992/updateFeedInfo',
        method: 'post',
        data: param
    })
}

//更新货物信息
export function updateGoodsInfo(param) {
    return request({
        url: 'http://localhost:8992/updateGoodsInfo',
        method: 'post',
        data: param
    })
}

//更新药物信息
export function updateMedicineInfo(param) {
    return request({
        url: 'http://localhost:8992/updateMedicineInfo',
        method: 'post',
        data: param
    })
}

//增加权限信息
export function addPrivilege(param) {
    return request({
        url: 'http://localhost:8992/addPrivilege',
        method: 'post',
        data: param
    })
}

//取得所有权限信息
export function getAllPrivilege(param) {
    return request({
        url: 'http://localhost:8992/getAllPrivilege',
        method: 'post',
        data: param
    })
}

//删除权限
export function deletePrivilege(param) {
    return request({
        url: 'http://localhost:8992/deletePrivilege',
        method: 'post',
        data: param
    })
}

//更新权限
export function updatePrivilege(param) {
    return request({
        url: 'http://localhost:8992/updatePrivilege',
        method: 'post',
        data: param
    })
}

//获取路线
export function getAllTransportRouteInfo(param) {
    return request({
        url: 'http://localhost:8992/getAllTransportRouteInfo',
        method: 'post',
        data: param
    })
}

//添加路线
export function addTransportRoute(param) {
    return request({
        url: 'http://localhost:8992/addTransportRoute',
        method: 'post',
        data: param
    })
}

//修改路线
export function updateTransportRouteInfo(param) {
    return request({
        url: 'http://localhost:8992/updateTransportRouteInfo',
        method: 'post',
        data: param
    })
}

//删除路线
export function deleteTransportRouteInfo(param) {
    return request({
        url: 'http://localhost:8992/deleteTransportRouteInfo',
        method: 'post',
        data: param
    })
}


//获得所有角色
export function getAllRole(param) {
    return request({
        url: 'http://localhost:8992/getAllRole',
        method: 'post',
        data: param
    })
}

//添加角色
export function addRole(param) {
    return request({
        url: 'http://localhost:8992/addRole',
        method: 'post',
        data: param
    })
}

//更新角色
export function updateRole(param) {
    return request({
        url: 'http://localhost:8992/updateRole',
        method: 'post',
        data: param
    })
}

// 取得所有权限列表
export function getAuthList(param) {
    return request({
        url: 'http://localhost:8992/getAuthList',
        method: 'post',
        data: param
    })
}

// 取得角色权限id
export function getRolePriId(param) {
    return request({
        url: 'http://localhost:8992/getRolePriId',
        method: 'post',
        data: param
    })
}

// 配置角色权限
export function configRole(param) {
    return request({
        url: 'http://localhost:8992/configRole',
        method: 'post',
        data: param
    })
}

