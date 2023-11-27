declare module 'vue' {
  export interface GlobalComponents {
    Iconify: typeof import('../components/Icon')['Iconify']
    SvgIcon: typeof import('./../components/SvgIcon.vue')['default']
  }
}

export {}
