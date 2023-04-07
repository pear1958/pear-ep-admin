import http from '@/api'
import { Login } from '../type'

// 用户登录
export const loginApi = (params: Login.reqForm) => {
  return http.post<Login.resType>('/login', params)
}
