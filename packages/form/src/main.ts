import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss'
import $Flex from '@/utils/_'

const utilFuns: any = {}
const files: any = import.meta.glob(
  [
    // './common/*',
    './components/*/*'
    // './layout/*',
    // '!./components/RichText/index.vue',
    // '!./components/JsonEditor/index.vue',
    // '!./components/Rule/index.vue',
    // '!./common/formAction.vue'
  ],
  { eager: true } // 同步
)

Object.keys(files).forEach(fileName => {
  const result = files[fileName].default
  if (fileName.indexOf('.vue') != -1) {
    utilFuns[result.ControlType] = result
  }
})

const app = createApp(App)

app.config.globalProperties.$formcomponents = utilFuns
app.config.globalProperties.$Flex = $Flex
window.VApp = app.config.globalProperties

app.mount('#app')
