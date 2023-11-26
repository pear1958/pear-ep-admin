declare module 'vue' {
  export interface GlobalComponents {
    IconifyOffline: typeof import('../components/Icon')['IconifyOffline']
    IconifyOnline: typeof import('../components/Icon')['IconifyOnline']
    SvgIcon: typeof import('./../components/SvgIcon.vue')['default']
  }
}

export {}
