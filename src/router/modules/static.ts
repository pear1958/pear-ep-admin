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
    // component: () => import("@/layout/indexAsync.vue"),
    // redirect: '/home',
    children: []
  }
]

// 用于动态路由最后追加404, 捕获所有未匹配的路由
// export const notFoundRouter = {
//   path: '/:pathMatch(.*)*',
//   component: () => import('@/views/error/404.vue')
//   // redirect: '/error/404'
// }

const LAYOUT = () => import('@/layout/index.vue')

export const notFoundRouter = {
  path: '/:path(.*)*',
  name: 'PageNotFound', // 必须加此字段
  component: LAYOUT,
  // meta: {
  //   hideBreadcrumb: true,
  //   showInMenu: false
  // },
  children: [
    {
      path: '/:path(.*)*',
      name: '404',
      component: () => import('@/views/error/404.vue'),
      meta: {
        title: '404',
        hideBreadcrumb: true,
        showInMenu: false
      }
    }
  ]
}
