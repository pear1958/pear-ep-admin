import http from '..'

export const getLoginCode = () => {
  return http.get('/auth/captcha/img')
}

export const login = (params: Recordable) => {
  return http.post('/system/user/login', params)
}

export const logout = () => {
  return http.post('/system/user/logout')
}

export const getUserInfo = () => {
  return http.get('/system/user/info')
}

// 获取菜单权限列表
export const getMenuList = () => {
  return http.get<MenuList>('/system/user/ep-admin-list')
}

// 获取按钮权限列表
export const getButtonData = () => {
  return http.get<Recordable<string[]>>('/system/user/button')
}
