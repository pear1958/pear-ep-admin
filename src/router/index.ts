import { createRouter, createWebHashHistory } from 'vue-router'
import { staticRouter } from './modules/static'
import { notFoundRouter } from './modules/error'
import NProgress from '@/config/progress'
import { useUserStore } from '@/store/modules/user'
import { usePermissionStore } from '@/store/modules/permission'
import { useTheme } from '@/hooks/useTheme'
import { AxiosCanceler } from '@/api/utils/axiosCancel'
import { check403 } from './utils'
import { useLockStore } from '@/store/modules/lock'
import { LOGIN_PATH, LOCK_PATH } from '@/config/constant'
import { useSystemStore } from '@/store/modules/system'

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob('@/views/**/*.vue')

// const whiteList = []

const axiosCanceler = new AxiosCanceler()

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...staticRouter, notFoundRouter],
  // 在页面之间导航时控制滚动的函数  https://router.vuejs.org/zh/api/#routes
  scrollBehavior: () => ({ left: 0, top: 0 })
})

function getAuthData() {
  return new Promise((resolve, reject) => {
    Promise.all([
      usePermissionStore().getMenuList(),
      usePermissionStore().getButtonData(),
      useUserStore().getUserInfo()
    ])
      .then(([res1, res2, res3]) => {
        resolve(!res1 || !res2 || !res3 ? false : true)
      })
      .catch(err => {
        console.log('err', err)
        reject(false)
      })
  })
}

// 初始化动态路由
function initRouter() {
  const flatMenuList = usePermissionStore().flatMenuListGet

  flatMenuList.forEach((item: any) => {
    item.children && delete item.children

    if (item.component && typeof item.component == 'string' && item.component !== '/iframeView') {
      item.component = modules['/src/views' + item.component + '.vue']
    }

    if (item.component == '/iframeView') {
      item.component = () => import('@/layout/iframeView.vue')
    }

    if (item.meta?.isFull) {
      // https://router.vuejs.org/zh/api/#addroute
      router.addRoute(item)
    } else {
      router.addRoute('layout', item)
    }
  })

  // 添加 404 路由: notFoundRouter
  // 并且避免报错: [Vue Router warn]: No match found for location with path "/home"
  router.removeRoute('404')
  router.addRoute(notFoundRouter)
}

// 如果第一次访问的路由是动态追加的，beforeEach 第一次执行的时候，这个路由还没追加进去，那么路由的 matched 为空，就会报这个警告
// [Vue Router warn]: No match found for location with path "/xxx"  // xxx: 当前访问的路由
// https://coding.m.imooc.com/questiondetail?cid=542&qid=262149
// https://segmentfault.com/q/1010000041657273/a-1020000042515957

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')
  const { userInfo } = useUserStore()
  const { menuList, buttonData } = usePermissionStore()
  const { isLock } = useLockStore().lockInfo || {}

  // 在路由跳转之前, 清除所有请求
  axiosCanceler.removeAllPending()

  NProgress.start()

  // 动态设置标题
  document.title = to.meta.title ? `${to.meta.title} - Ep-Admin` : 'Ep-Admin'

  if (useSystemStore().enableMainLoading) {
    useSystemStore().setMainLoading(true)
  }

  usePermissionStore().setRouteName(to.name as string)

  // 页面初始化时, 还原 主题 & 暗黑模式
  useTheme().initThemeAndDark()

  // 没有token, 访问登陆页 -> 直接放行
  // 有token, 访问登陆页 -> 留在 当前页
  // https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
  if (to.path === LOGIN_PATH) {
    if (token) {
      return next(from.fullPath)
    } else {
      resetRouter()
      return next()
    }
  }

  if (to.path === LOCK_PATH && !isLock) {
    return next({ path: from.fullPath })
  }

  // 非登录页且没有token
  if (!token) {
    return next({ path: LOGIN_PATH, replace: true })
  }

  const params403 = { path: '/error/403', replace: true, query: to.query }

  // 锁屏页面点击返回
  if (isLock && from.path === LOCK_PATH) {
    return next(false)
  }

  // 首次进入系统 || 刷新页面   获取菜单数据 & 初始化路由
  if (!userInfo || !menuList.length || !buttonData) {
    // 需要捕获 getAuthData 的reject
    try {
      const reqSucc = await getAuthData()

      // 当按钮 || 菜单请求出错, 重定向到登录页
      if (!reqSucc) {
        return next(LOGIN_PATH)
      } else {
        initRouter()

        // 第一次触发动态路由还未完全添加, 第二次动态路由才完全添加到路由列表
        // 第一次所有的路由都会被404拦截到, 这里处理第一次的路由跳转
        if (to.name === '404') {
          if (check403(to)) {
            return next(params403)
          }
          return next({ path: to.fullPath, replace: true, query: to.query })
        }

        // 首次登录, 使浏览器的后退按钮无法点击
        // hack写法: 可以确保addRoute()时动态添加的路由已经被完全加载上去
        // ...to 能保证找不到路由的时候重新执行beforeEach钩子
        // replace: true 保证刷新时不允许用户后退
        return next({ ...to, replace: true })
      }
    } catch (error) {
      console.log('error', error)
      localStorage.clear()
      return next(LOGIN_PATH)
    }
  }

  if (check403(to)) {
    return next(params403)
  }

  next()
})

export function resetRouter() {
  usePermissionStore().flatMenuListGet.forEach((route: any) => {
    const { name } = route
    if (name && router.hasRoute(name)) router.removeRoute(name)
  })
}

router.afterEach(() => {
  NProgress.done()

  if (useSystemStore().enableMainLoading) {
    useSystemStore().setMainLoading(false)
  }
})

export default router
