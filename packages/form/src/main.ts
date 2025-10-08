import { createApp, App as AppType, defineAsyncComponent } from 'vue'
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

app.component(
  'draggable',
  defineAsyncComponent({
    loader: () => import('vuedraggable')
  })
)

app.mount('#app')

// -------------------------------------

// 本质是提供了一个 “组件仓库”，而不是直接注册组件。
// 这种设计允许上层调用者（如 editor 子包）根据自身需求决定如何使用这些组件：
// 可以全局注册，也可以局部注册，甚至按需动态导入
const install = (app: AppType) => {
  app.config.globalProperties.$formcomponents = utilFuns

  for (const key in utilFuns) {
    app.component(key, utilFuns[key])
  }
}

export default {
  install
}
