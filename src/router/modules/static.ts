import { RouteRecordRaw } from 'vue-router'

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
    children: [
      {
        path: '/error/403',
        name: '403',
        component: () => import('@/views/error/403.vue'),
        meta: {
          title: '403'
        }
      }
    ]
  }
]

const LAYOUT = () => import('@/layout/index.vue')

// 用于动态路由最后追加404, 捕获所有未匹配的路由
export const notFoundRouter = {
  path: '/:path(.*)*',
  name: 'PageNotFound', // 必须加此字段
  component: LAYOUT,
  children: [
    {
      path: '/:path(.*)*',
      name: '404',
      component: () => import('@/views/error/404.vue'),
      meta: {
        title: '404',
        showInMenu: false
      }
    }
  ]
}
