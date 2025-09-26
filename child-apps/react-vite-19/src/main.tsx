import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './router'

// 保存root实例，用于卸载
let root: ReactDOM.Root | null = null

// 应用渲染函数
function render() {
  // 先卸载旧实例（如果存在）
  if (root) root.unmount()
  // 创建新的root实例并渲染
  root = ReactDOM.createRoot(document.getElementById('root')!)
  root.render(<AppRouter />)
}

// 独立运行时直接渲染
// @ts-ignore
if (!window.__MICRO_APP_ENVIRONMENT__) {
  render()
}

// 自动触发

// 微应用模式下导出生命周期函数
export const mount = () => {
  console.log('React子应用：mount')
  render()
}

// 子应用卸载时触发。
export const unmount = () => {
  console.log('React子应用：unmount')
  // 使用React 18的方式卸载
  if (root) {
    root.unmount()
    root = null // 清空实例
  }
}

// 可选：支持应用更新
export const update = (props: any) => {
  console.log('React子应用：update', props)
  // 可根据需要处理更新逻辑
}
