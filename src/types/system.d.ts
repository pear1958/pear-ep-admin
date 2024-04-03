import { RouteMeta } from 'vue-router'

declare interface MenuItem {
  path: string
  name: string
  component?: string | (() => Promise<any>)
  redirect?: string
  meta: RouteMeta
  children?: MenuItem[]
}

declare type MenuList = MenuItem[]

declare interface TabItem {
  title: string
  fullPath: string
  name: string
}

declare type TabList = TabItem[]

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
