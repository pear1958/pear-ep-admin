declare module 'vue' {
  export interface GlobalComponents {
    IconOffline: typeof import('../components/Icon')['IconOffline']
    IconOnline: typeof import('../components/Icon')['IconOnline']
    SvgIcon: typeof import('./../components/SvgIcon.vue')['default']
  }
}

export {}
