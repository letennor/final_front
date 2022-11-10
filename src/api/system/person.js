import request from '@/utils/request'

export function deleteUser(query) {
  return request({
    url: '/rest/user/delete',
    method: 'post',
    data: query
  })
}

export function saveUser(query) {
  return request({
    url: '/rest/user/save',
    method: 'post',
    data: query
  })
}

export function getUserList(query) {
  return request({
    url: '/rest/user/list',
    method: 'post',
    data: query
  })
}

export function privilegesList(query) {
  return request({
    url: '/rest/user/privileges',
    method: 'post',
    data: query
  })
}

export function configUserPrivileges(query) {
  return request({
    url: '/rest/user/configPrivileges',
    method: 'post',
    data: query
  })
}

export function enabledUser(query) {
  return request({
    url: '/rest/user/enabled',
    method: 'post',
    data: query
  })
}

export function resetPassword(query) {
  return request({
    url: '/rest/user/resetPassword',
    method: 'post',
    data: query
  })
}

export function getRoleList(query) {
  return request({
    url: '/rest/user/roles',
    method: 'post',
    data: query
  })
}

export function configRoles(query) {
  return request({
    url: '/rest/user/configRoles',
    method: 'post',
    data: query
  })
}

export function updatePassword(query) {
  return request({
    url: '/rest/user/updatePassword',
    method: 'post',
    data: query
  })
}

export function userTreeData(query) {
  return request({
    url: '/rest/user/userTreeData',
    method: 'post',
    data: query
  })
}
