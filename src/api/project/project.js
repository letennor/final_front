import request from '@/utils/request'

export function getProjectList(param) {
  return request({
    url: 'rest/project/list',
    method: 'post',
    data: param
  })
}

export function deleteProject(param) {
  return request({
    url: 'rest/project/delete',
    method: 'post',
    data: param
  })
}

export function saveProject(param) {
  return request({
    url: 'rest/project/save',
    method: 'post',
    data: param
  })
}

export function structureTreeData(param) {
  return request({
    url: 'rest/project/structureTreeData',
    method: 'post',
    data: param
  })
}

export function saveStructure(param) {
  return request({
    url: 'rest/project/saveStructure',
    method: 'post',
    data: param
  })
}

export function deleteStructure(param) {
  return request({
    url: 'rest/project/deleteStructure',
    method: 'post',
    data: param
  })
}

export function getStructureList(param) {
  return request({
    url: 'rest/project/structureList',
    method: 'post',
    data: param
  })
}

// 懒加载树型结构（带设备测点号）
export function getAsynTreeStructure(param) {
  return request({
    url: 'rest/project/getAsynTreeStructure',
    method: 'post',
    data: param
  })
}

// 单项目树查询
export function singleTreeData(param) {
  return request({
    url: 'rest/project/singleTreeData',
    method: 'post',
    data: param
  })
}

// 获取单项目所拥有的权限
export function projectPrivileges(param) {
  return request({
    url: 'rest/projectPrivilege/projectPrivileges',
    method: 'post',
    data: param
  })
}

// 配置单项目权限
export function configProjectPrivileges(param) {
  return request({
    url: 'rest/projectPrivilege/configProjectPrivileges',
    method: 'post',
    data: param
  })
}

// 获取当前用户参与的顶级项目列表
export function singleProjectList(param) {
  return request({
    url: 'rest/projectAuth/projectList',
    method: 'post',
    data: param
  })
}

// 获取用户的项目信息
export function projectUserInfo(param) {
  return request({
    url: 'rest/projectAuth/projectUserInfo',
    method: 'post',
    data: param
  })
}

export function projectUserPrivileges(param) {
  return request({
    url: 'rest/projectAuth/projectUserPrivileges',
    method: 'post',
    data: param
  })
}

export function configProjectUserPrivileges(param) {
  return request({
    url: 'rest/projectAuth/configProjectUserPrivileges',
    method: 'post',
    data: param
  })
}
