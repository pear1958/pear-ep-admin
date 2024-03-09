declare module 'vue' {
  export interface GlobalComponents {
    iconify: (typeof import('../components/icon'))['iconify']
    svgIcon: (typeof import('./../components/svgIcon.vue'))['default']
    imgViewer: (typeof import('./../components/imgViewer.vue'))['default']
  }
}

export {}
