declare module 'vue' {
  export interface GlobalComponents {
    iconify: (typeof import('../components/Icon'))['iconify']
    svgIcon: (typeof import('./../components/svgIcon.vue'))['default']
    imgViewer: (typeof import('./../components/imgViewer'))['default']
  }
}

export {}
