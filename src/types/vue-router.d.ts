declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
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

export {}
