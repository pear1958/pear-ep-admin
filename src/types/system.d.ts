declare interface Window {
  _AMapSecurityConfig: {
    [key: string]: string
  }
  CESIUM_BASE_URL: string
}

declare interface MenuItem {
  path: string
  name: string
  component?: string | (() => Promise<any>)
  redirect?: string
  meta: CustomRouteMeta
  children?: MenuItem[]
}

declare type MenuList = MenuItem[]

declare interface TabItem {
  title: string
  fullPath: string
  name: string
}

declare type TabList = TabItem[]

declare const AMap: Recordable

declare type TargetContext = '_self' | '_blank'

declare interface LabelValue<T = string | number> {
  label: string
  value: T
  [key: string]: any
}

declare type LabelValueList = LabelValue[]
