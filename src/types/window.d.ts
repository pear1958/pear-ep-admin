declare global {
  interface Navigator {
    // msSaveOrOpenBlob: (blob: Blob, fileName: string) => void;
    browserLanguage: string
  }

  interface Document {
    webkitFullscreenElement: any
    mozFullScreenElement: any
    msFullscreenElement: any
    cancelFullScreen: any
    webkitCancelFullScreen: any
    mozCancelFullScreen: any
    msCancelFullScreen: any
  }

  interface CustomRouteMeta extends Record<string | number | symbol, unknown> {
    icon?: string
    title: string
    activeMenu?: string
    isLink?: string
    isHide?: boolean
    mainFull?: boolean
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

// https://blog.csdn.net/HermitSun/article/details/104104762?ydreferer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS5oay8%3D
export {}
