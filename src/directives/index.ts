import { App, Directive } from 'vue'

import auth from './modules/auth'
import debounce from './modules/debounce'

const directiveObj: { [key: string]: Directive } = {
  auth,
  debounce
}

const directives = {
  install: function (app: App) {
    Object.keys(directiveObj).forEach(key => {
      app.directive(key, directiveObj[key])
    })
  }
}

export default directives
