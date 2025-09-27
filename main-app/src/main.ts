import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import ElementPlus from 'element-plus'
import { registerMicroApps, setDefaultMountApp, start } from 'qiankun'

import '@/styles/index.scss'

import directives from './directives'

// 注册使用 svg icon
// https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md
import 'virtual:svg-icons-register'

// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/styles/index.scss整体css文件导致热更新慢的问题
import '@/styles/tailwind.css'

import 'element-plus/dist/index.css'
// element-plus 内置暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'

import i18n from '@/languages/index'

export const app = createApp(App)

app.use(ElementPlus).use(router).use(directives).use(pinia).use(i18n).mount('#app')

registerMicroApps([
  {
    name: 'app-vite-vue3',
    entry: '//localhost:5173',
    container: '#sub-app-container',
    activeRule: '/app-vite-vue3', // 匹配的路由规则
    // 可以传递给子应用的参数
    props: {
      mainAppName: 'Main Application'
    }
  }
])

// 设置默认进入的子应用
setDefaultMountApp('/')

start()
