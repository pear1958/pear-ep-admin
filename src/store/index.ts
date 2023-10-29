import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { PiniaColadaPlugin } from 'colada-plugin'

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
pinia.use(PiniaColadaPlugin)

export default pinia
