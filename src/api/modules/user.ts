import http from '@/api'

export const login = (params: Recordable) => {
  return http.post('/user/login', params)
}

export const logout = () => {
  return http.post('/user/logout')
}

export const getUserInfo = () => {
  return http.get('/user/info')
}
