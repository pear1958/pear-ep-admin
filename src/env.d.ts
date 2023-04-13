/// <reference types="vite/client" />

declare module '*.vue' {
  import { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>
  export default Component
}


declare module 'JqueryTest' {
  type cssSelector = {
    css: (key: string, value: string) => cssSelector
  }

  function $(ready: () => void): void

  function $(selector: any): cssSelector

  namespace $ {
    function ajax(url: string, settings?: any): void
    function get(url: string, settings?: any): void
    function post(url: string, settings?: any): void
  }

  // export default $

  // 兼容 amd commonJs
  export = $
}

// 外界用法: 
// import $ from 'JqueryTest'
// $('div').css('display', 'none').css('display', 'blovk')
// $.ajax()
