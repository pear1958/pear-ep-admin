import { App, Directive } from 'vue'

import auth from './modules/auth'
import waterMark from './modules/waterMark'

const directiveObj: { [key: string]: Directive } = {
  auth,
  waterMark
}

const directives = {
  install: function (app: App) {
    Object.keys(directiveObj).forEach(key => {
      app.directive(key, directiveObj[key])
    })
  }
}

export default directives
