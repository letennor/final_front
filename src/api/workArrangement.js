import request from '@/utils/request'

//取得所有人员当天的工作流信息
export function getAllPersonWorkFlowCurrentDate(param) {
    return request({
        url: 'http://localhost:8992/getAllPersonWorkFlowCurrentDate',
        method: 'post',
        data: param
    })
}

//按条件取得人员当天的工作流信息
export function getPersonWorkFlowCurrentDateByCondition(param) {
    return request({
        url: 'http://localhost:8992/getPersonWorkFlowCurrentDateByCondition',
        method: 'post',
        data: param
    })
}


//取得所有其他工作
export function getAllElseWork(param) {
    return request({
        url: 'http://localhost:8992/getAllElseWork',
        method: 'post',
        data: param
    })
}

//分配工作
export function arrangeWork(param) {
    return request({
        url: 'http://localhost:8992/arrangeWork',
        method: 'post',
        data: param
    })
}

//取得某人所有未完成的工作
export function getPersonUndoneWork(param) {
    return request({
        url: 'http://localhost:8992/getPersonUndoneWork',
        method: 'post',
        data: param
    })
}

//完成代办工作
export function finishWork(param) {
    return request({
        url: 'http://localhost:8992/finishWork',
        method: 'post',
        data: param
    })
}


//取得所有工作流
export function getPersonAllWorkFlow(param) {
    return request({
        url: 'http://localhost:8992/getPersonAllWorkFlow',
        method: 'post',
        data: param
    })
}