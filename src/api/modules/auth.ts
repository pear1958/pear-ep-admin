import http from '..'

// 获取菜单权限列表
export const getMenuList = () => {
  return http.get<MenuList>('/auth/menu')
}

// 获取按钮权限列表
export const getButtonData = () => {
  return http.get<Recordable<string[]>>('/auth/button')
}
