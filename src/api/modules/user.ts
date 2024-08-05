import http from '@/api'
import { Login } from '../types'

import dRouter from '@/assets/json/dRouter.json'
import buttonData from '@/assets/json/buttonData.json'
import userInfo from '@/assets/json/userInfo.json'

// 用户登录
export const loginApi = (params: Login.reqForm) => {
  return http.post<Login.resType>('/login', params)
}

// 获取菜单权限列表
export const getMenuListApi = () => {
  // return http.get<MenuList>('/menu/list')
  return Promise.resolve(dRouter)
}

// 获取按钮权限列表
export const getButtonDataApi = () => {
  return Promise.resolve(buttonData)
}

export const getUserInfoApi = () => {
  return Promise.resolve(userInfo)
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
  return http.post(`/geeker/user/list`, params)
  // return Promise.resolve({ list: [], total: 0 })
}

// 获取用户性别字典
export const getUserGender = () => {
  return http.get(`/geeker/user/gender`)
}

// 获取用户状态字典
export const getUserStatus = () => {
  return http.get(`/geeker/user/status`)
}

// 删除用户
export const deleteUser = (params: { id: string[] }) => {
  return http.post(`/geeker/user/delete`, params)
}
