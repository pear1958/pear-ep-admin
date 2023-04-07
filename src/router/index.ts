import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './config'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
