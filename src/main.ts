import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import '@/style/reset.scss'
import '@/style/common.scss'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


const app = createApp(App)

app.use(router).use(ElementPlus).use(store).mount('#app')
