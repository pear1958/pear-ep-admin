declare module 'vue' {
  export interface GlobalComponents {
    Iconify: (typeof import('../components/Global/components/Icon'))['Iconify']
    SvgIcon: (typeof import('../components/Global/components/SvgIcon.vue'))['default']
    ImgViewer: (typeof import('../components/Global/components/ImgViewer'))['default']
  }
}

export {}
