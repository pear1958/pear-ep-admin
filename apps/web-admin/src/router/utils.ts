import { RouteLocationNormalized } from 'vue-router'
import { deepClone, getFlatArr } from 'pear-common-utils'
import usePermissionStore from '@/store/modules/permission'

// 递归删除meta中 showInMenu 为false的路由
export function filterMenuData(menuData: MenuList) {
  // 处理第一层的菜单数据
  const tempData = deepClone(menuData).filter((item: MenuItem) => item.meta?.showInMenu !== false)

  tempData.forEach((item: MenuItem) => {
    if (item.children) item.children = filterMenuData(item.children)
  })

  return tempData
}

/** 自动导入全部静态路由，无需再手动引入！匹配 src/router/modules 目录（任何嵌套级别）中具有 .ts 扩展名的所有文件，除了 static.ts 文件
 * 如何匹配所有文件请看：https://github.com/mrmlnc/fast-glob#basic-syntax
 * 如何排除文件请看：https://cn.vitejs.dev/guide/features.html#negative-patterns
 */
const routeModules: Recordable<{ default: MenuItem }> =
  import.meta.glob(['./modules/**/*.ts', '!./modules/**/static.ts', '!./modules/**/error.ts'], {
    eager: true
  }) || {}

// 原始静态路由 - 未做任何处理
const routes = Object.values(routeModules).map(module => module.default)

const flatRoutes = getFlatArr<MenuItem>(routes)

export const check403 = (to: RouteLocationNormalized) => {
  const flatAuthRoutes = usePermissionStore().flatMenuListGet

  const is403 =
    flatRoutes.some((item: MenuItem) => item.path === to.path) &&
    !flatAuthRoutes.some((item: MenuItem) => item.path === to.path)

  return is403
}
