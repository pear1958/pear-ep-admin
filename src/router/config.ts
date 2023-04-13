export const routes = [
  {
    path: '/',
    redirect: '/form'
  },
  {
    path: '/login',
    component: () => import('@/views/user/login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/home',
    component: () => import('@/views/home/index.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/form',
    component: () => import('@/views/form/index.vue'),
    meta: { title: '表单' }
  },
]