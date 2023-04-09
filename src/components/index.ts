import { App } from 'vue'
// import ChooseArea from './ChooseArea/index.vue'

const components = {
  // ChooseArea
}

type keyType = keyof typeof components

export function registerGlobComp(app: App) {
  Object.keys(components).forEach(key => {
    app.component(key, components[key as keyType])
  })
}

