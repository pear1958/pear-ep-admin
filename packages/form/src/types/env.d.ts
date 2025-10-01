/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// declare module '@codemirror/lang-javascript'

interface Window {
  JSONEditor: any
  VApp: any
}
