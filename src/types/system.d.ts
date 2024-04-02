declare namespace Menu {
  interface MenuOptions {
    path: string
    name: string
    component?: string | (() => Promise<any>)
    redirect?: string
    meta: MetaProps
    children?: MenuOptions[]
  }

  interface MetaProps {
    icon: string
    title: string
    activeMenu?: string
    isLink?: string
    isHide: boolean
    isFull: boolean
    isAffix: boolean
    isKeepAlive: boolean
    showInMenu?: boolean
    rank?: number
  }
}

declare type MenuItem = Menu.MenuOptions

declare type MenuList = MenuItem[]

declare interface tabItem {
  title: string
  fullPath: string
  name: string
}

declare interface Window {
  _AMapSecurityConfig: {
    [key: string]: string
  }
}

declare const AMap: Recordable

declare type TargetContext = '_self' | '_blank'

declare type LabelValueList = {
  label: string
  value: any
  [key: string]: any
}[]
