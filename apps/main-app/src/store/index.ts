import { createPinia, PiniaPlugin } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate as PiniaPlugin)

export default pinia
