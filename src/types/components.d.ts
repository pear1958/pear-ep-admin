declare module 'vue' {
  export interface GlobalComponents {
    Iconify: typeof import('../components/Icon')['Iconify']
    svgIcon: typeof import('./../components/svgIcon.vue')['default']
    imgViewer: typeof import('./../components/imgViewer')['default']
  }
}

export {}
