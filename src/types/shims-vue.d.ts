/// <reference types="vite/client" />

declare module '*.vue' {
  import { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>
  export default Component
}

declare module 'element-plus/dist/locale/zh-cn.mjs'
declare module 'element-plus/dist/locale/en.mjs'
declare module 'nprogress'
declare module 'hotkeys-js'
declare module 'qs'
declare module 'el-table-infinite-scroll'
declare module 'v-contextmenu'

declare module 'virtual:*' {
  const result: any
  export default result
}
