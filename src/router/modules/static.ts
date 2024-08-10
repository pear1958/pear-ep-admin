import { RouteRecordRaw } from 'vue-router'
import { noAuthRouter } from './error'

export const staticRouter: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/user/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    children: [noAuthRouter]
  },
  {
    path: '/lock',
    name: 'lock',
    component: () => import('@/views/system/lock/index.vue'),
    meta: {
      title: '锁屏'
    }
  }
]
