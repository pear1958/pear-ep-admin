import http from '..'

export const getMenuList = (params: Recordable) => {
  return http.get('/system/menu/list', params)
}

export const getUserList = (params: Recordable) => {
  return http.get('/system/user', params)
}

export const createUser = (data: Recordable) => {
  return http.post('/system/user', data)
}

export const editUser = (params: Recordable) => {
  return http.put(`/system/user/${params.id}`, params)
}

export const deleteUser = (id: number) => {
  return http.delete(`/system/user/${id}`, { id })
}

export const getRoleList = () => {
  return http.get('/system/role')
}

export const getDeptList = () => {
  return http.get('/system/dept')
}
