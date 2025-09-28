const LAYOUT = () => import('@/layout/index.vue')

export const noAuthRouter = {
  path: '/error/403',
  name: '403',
  component: () => import('@/views/error/403.vue'),
  meta: {
    title: '403'
  }
}

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
        title: '404'
      }
    }
  ]
}
