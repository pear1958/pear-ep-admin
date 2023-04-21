declare type Recordable<T = any> = Record<string, T>

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
