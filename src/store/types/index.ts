export interface userState {
  token: null | string
  userInfo: null | object
}

type LayoutType = 'vertical' | 'classic' | 'transverse' | 'columns'

export interface systemState {
  layout: LayoutType
  sideBar: any
  keepAliveNameList: string[]
  tabList: any[]
  mainMaximize: boolean
  isDark: boolean
  themeColor: string
}

export interface PermissState {
  curRouteName: string
  buttonData: {
    [key: string]: string[]
  } | null
  menuList: Menu.MenuOptions[] | any
}
