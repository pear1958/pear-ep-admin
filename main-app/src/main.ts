import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import ElementPlus from 'element-plus'
import microApp from '@micro-zoe/micro-app'

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

microApp.start({
  plugins: {
    modules: {
      // 针对名称为 app-react-vite-19 的子应用配置插件
      'app-react-vite-19': [
        {
          // 接收的参数 code 是子应用的源代码字符串，返回处理后的代码
          loader(code) {
            if (process.env.NODE_ENV === 'development') {
              code = code.replace(/(from|import)(\s*['"])(\/child\/vite\/)/g, all => {
                return all.replace('/react-vite-19/', 'http://localhost:5173/react-vite-19/')
              })
            }
            return code
          }
        }
      ],
      // 解决 create-react-app 中 sockjs-node 报错的问题
      // create-react-app 的热更新会默认使用当前页面的端口，而子应用实际运行在 4004 端口，直接使用会导致连接错误
      'appname-react16': [
        {
          loader(code) {
            if (process.env.NODE_ENV === 'development' && code.indexOf('sockjs-node') > -1) {
              // 将代码中的 'window.location.port' 替换为子应用实际运行的端口（4004）
              code = code.replace('window.location.port', '4004')
            }
            return code
          }
        }
      ],
      // 解决 create-react-app 中 sockjs-node 报错的问题
      'appname-react17': [
        {
          loader(code) {
            if (process.env.NODE_ENV === 'development' && code.indexOf('sockjs-node') > -1) {
              code = code.replace('window.location.port', '4005')
            }
            return code
          }
        }
      ]
    }
  }
})

export const app = createApp(App)

app.use(ElementPlus).use(router).use(directives).use(pinia).use(i18n).mount('#app')
