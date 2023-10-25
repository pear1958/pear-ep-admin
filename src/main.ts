import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import '@/style/index.scss'

// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import './style/tailwind.css'

// 注册使用 svg icon
// https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md
import 'virtual:svg-icons-register'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import * as Icons from '@element-plus/icons-vue'

// element-plus 内置暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'

import { registerGlobComp } from '@/components'

import errorHandler from '@/utils/errorHandler'

import VElement from '@zhangzy56/vue-ele'
import '@zhangzy56/vue-ele/dist/index.css'

// 导入 下载的 iconfont
// import './assets/iconfont/iconfont.js'
// import './assets/iconfont/iconfont.css'

const app = createApp(App)

app.config.errorHandler = errorHandler

registerGlobComp(app)

// 注册element Icons组件
for (const [key, component] of Object.entries(Icons)) {
  app.component(key, component)
}

app.use(router).use(store).use(VElement).use(ElementPlus).mount('#app')
