import http from '@/api'
import { Login } from '../types'

export const getUserData = () => {
  return http.get<Recordable>('/user/info')
}

// 查询所有用户
export const getAllUser = () => http.get('/user/listAll')

// 用户登录
export const login = (params: Recordable) => {
  return http.post('/user/login', null, {
    params,
    isCustom: true
  })
  // return http.post('/user/login?username=admin&password=123456', {}, { isCustom: true })
}

// 用户登录
export const loginApi = (params: Login.reqForm) => {
  return http.post<Login.resType>('/login', params)
}

interface TableParams {
  current: number
  size: number
}

export const getCompositionList = (params: TableParams) => {
  return http.get<any>('/component/componentProduct', params)
}

// 获取用户列表
export const getUserList = (params: any) => {
  return http.post(`/user/list`, params)
  // return Promise.resolve({ list: [], total: 0 })
}

// 获取用户性别字典
export const getUserGender = () => {
  return http.get(`/user/gender`)
}

// 获取用户状态字典
export const getUserStatus = () => {
  return http.get(`/user/status`)
}

// 删除用户
export const deleteUser = (params: { id: string[] }) => {
  return http.post(`/user/delete`, params)
}
