import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import UserList from '../pages/users/List'
import UserDetail from '../pages/users/Detail'
// 可以创建一个布局组件用于共享导航栏等
import MainLayout from '../layout/MainLayout'

// 从microApp获取基础路由，独立运行时使用默认值
// @ts-ignore
const baseRoute = window.__MICRO_APP_BASE_ROUTE__ || '/'

// 创建路由配置
const routes = [
  {
    path: '/',
    element: <MainLayout />, // 使用布局组件
    children: [
      {
        path: '', // 根路径
        element: <Home />
      },
      {
        path: 'about', // 关于页面
        element: <About />
      },
      {
        path: 'users', // 用户模块父路由
        children: [
          {
            path: '', // 用户列表（/users）
            element: <UserList />
          },
          {
            path: ':id', // 用户详情（/users/123）
            element: <UserDetail />
          }
        ]
      }
    ]
  }
]

// 创建路由时，在第二个参数中配置basename
const router = createBrowserRouter(routes, {
  basename: baseRoute
})

// 路由提供者组件
const AppRouter = () => {
  return <RouterProvider router={router} />
}

export default AppRouter
