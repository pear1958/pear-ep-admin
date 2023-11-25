export interface userState {
  token: null | string
  userInfo: null | object
}

type LayoutType = 'vertical' | 'classic' | 'transverse' | 'columns'

export type LanguageType = 'zh' | 'en' | null

export interface SystemState {
  layout: LayoutType
  sideBar: any
  keepAliveNameList: string[]
  tabList: any[]
  mainMaximize: boolean
  isDark: boolean
  themeColor: string
  language: LanguageType
}

export interface PermissState {
  curRouteName: string
  buttonData: {
    [key: string]: string[]
  } | null
  menuList: Menu.MenuOptions[] | any
}

export interface IConfigState {
  mapConfig: {
    key: string
    securityJsCode: string
  }
}
