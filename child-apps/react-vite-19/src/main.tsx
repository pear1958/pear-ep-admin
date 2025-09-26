import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './router/index.tsx'

// 保存React根实例
let root: ReactDOM.Root | null = null

// @ts-ignore
console.log('window.__MICRO_APP_ENVIRONMENT__', window?.__MICRO_APP_ENVIRONMENT__)

// 微应用挂载函数（主应用会调用）
function mount(props: any) {
  // 挂载点优先使用主应用传递的容器，否则用自身的#root
  const container = props?.container?.querySelector('#root') || document.getElementById('root')
  if (!container) return
  root = ReactDOM.createRoot(container)
  root.render(<AppRouter />)
}

// 微应用卸载函数（主应用会调用）
function unmount() {
  if (root) {
    root.unmount()
    root = null // 清空实例，避免内存泄漏
  }
}

// 独立运行时直接挂载
// @ts-ignore
if (!window.__MICRO_APP_ENVIRONMENT__) {
  mount({})
} else {
  // 微前端环境下暴露生命周期函数
  // @ts-ignore
  window[`micro-app-${window.__MICRO_APP_NAME__}`] = { mount, unmount }
}
