export interface userState {
  token: null | string
  userInfo: null | object
}

type LayoutType = 'vertical' | 'classic' | 'transverse' | 'columns'

export type LanguageType = 'zh' | 'en' | null

export interface SystemState {
  layout: LayoutType
  sideBar: {
    isCollapse: boolean
  }
  keepAliveNameList: string[]
  tabList: TabList
  mainMaximize: boolean
  isDark: boolean
  themeColor: string
  language: LanguageType
  menuAccordion: boolean
}

export interface PermissState {
  curRouteName: string
  buttonData: {
    [key: string]: string[]
  } | null
  menuList: MenuList | any
}

export interface IConfigState {
  mapConfig: {
    key: string
    securityJsCode: string
  }
}
