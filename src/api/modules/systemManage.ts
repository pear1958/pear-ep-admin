import http from '..'

// -------------- 菜单 ---------------------

export const getMenuList = (params?: Recordable) => {
  return http.get('/system/menu/list', params)
}

export const getAllMenu = (params?: Recordable) => {
  return http.get('/system/menu/all-list', params)
}

// -------------- 用户 ---------------------

export const getUserList = (params: Recordable) => {
  return http.get('/system/user', params)
}

export const createUser = (data: Recordable) => {
  return http.post('/system/user', data)
}

export const updateUser = (params: Recordable) => {
  return http.put(`/system/user/${params.id}`, params)
}

export const getUserDetail = (id: number) => {
  return http.get(`/system/user/${id}`)
}

export const deleteUser = (id: number) => {
  return http.delete(`/system/user/${id}`)
}

// -------------- 角色 ---------------------

export const getRoleList = (params?: Recordable) => {
  return http.get('/system/role', params)
}

export const deleteRole = (id: number) => {
  return http.delete(`/system/role/${id}`)
}

export const createRole = (data: Recordable) => {
  return http.post('/system/role', data)
}

export const updateRole = (params: Recordable) => {
  return http.put(`/system/role/${params.id}`, params)
}

export const getRoleDetail = (id: number) => {
  return http.get(`/system/role/${id}`)
}

// -------------- 部门 ---------------------

export const getDeptList = () => {
  return http.get('/system/dept')
}
