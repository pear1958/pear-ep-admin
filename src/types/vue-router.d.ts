declare global {
  interface CustomRouteMeta extends Record<string | number | symbol, unknown> {
    icon?: string
    title: string
    activeMenu?: string
    isLink?: string
    isHide?: boolean
    isFull?: boolean
    isAffix?: boolean
    isKeepAlive?: boolean
    showInMenu?: boolean
    rank?: number
  }
}

// https://router.vuejs.org/zh/guide/advanced/meta.html#typescript
declare module 'vue-router' {
  interface RouteMeta extends CustomRouteMeta {}
}

export {}
