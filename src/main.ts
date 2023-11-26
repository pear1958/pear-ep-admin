import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'

import Colada from 'colada-plugin'

import { useElementPlus } from '@/hooks/useElementPlus'

import '@/styles/index.scss'

// 注册使用 svg icon
// https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md
import 'virtual:svg-icons-register'

// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/styles/index.scss整体css文件导致热更新慢的问题
import '@/styles/tailwind.css'

import 'element-plus/dist/index.css'

// element-plus 内置暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'

import { registerGlobComp } from '@/components'

import errorHandler from '@/utils/errorHandler'

import i18n from '@/languages/index'
import { setupDirectives } from './directives'

const app = createApp(App)

app.config.errorHandler = errorHandler

registerGlobComp(app)
setupDirectives(app)
useElementPlus(app)

app.use(router).use(pinia).use(Colada).use(i18n).mount('#app')
