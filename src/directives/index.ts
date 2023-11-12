import { App } from 'vue'
import { setupAuthDirective } from './modules/auth'

export function setupDirectives(app: App) {
  setupAuthDirective(app)
}
