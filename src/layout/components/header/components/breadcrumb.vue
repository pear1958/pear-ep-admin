<template>
  <el-breadcrumb separator="/" class="bread-box">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
      <a @click="handleNav(item)" v-if="index < breadcrumbList.length - 1" class="link">
        {{ item.meta.title }}
      </a>
      <!-- 最后一个面包屑不能点击 -->
      <span v-else class="text">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { computed, unref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePermissionStore } from '@/store/modules/permission'

const route = useRoute()
const router = useRouter()

const breadcrumbList = computed(() => {
  const name = unref(route.name)

  // 这里必须使用 unref
  if (['403', '404'].includes(name)) {
    return [{ meta: { title: name } }]
  } else {
    return usePermissionStore().breadcrumbListGet(route.path)
  }
})

function storeQueryRoute(curRoute) {
  const oldData = JSON.parse(localStorage.getItem('queryRouteList') ?? '[]')

  const hasStore = oldData.find(item => item.name === curRoute.name)

  // 更新数据 | 重新储存数据
  const newData = hasStore
    ? oldData.map(item => {
        if (item.name === curRoute.name) item.fullPath = curRoute.fullPath
        return item
      })
    : [
        ...oldData,
        {
          name: curRoute.name,
          fullPath: curRoute.fullPath
        }
      ]

  localStorage.setItem('queryRouteList', JSON.stringify(newData))
}

// 监听fullPath, 如果有query, 则储存数据
watch(
  () => router.currentRoute.value,
  curRoute => {
    if (['403', '404'].includes(curRoute.name)) {
      return
    }

    const oldTopRoute = localStorage.getItem('topRoute')
      ? JSON.parse(localStorage.getItem('topRoute'))
      : null
    const curTopRouteName = unref(breadcrumbList)[0].name

    // 路由跳转时: 祖先变了(当前路由 的祖先元素不是 以前储存的最顶级路由), 清空数据
    if (oldTopRoute && curTopRouteName !== oldTopRoute.name) {
      localStorage.removeItem('topRoute')
      localStorage.removeItem('queryRouteList')
    }

    // 储存最顶级父级路由
    localStorage.setItem('topRoute', JSON.stringify({ name: curTopRouteName }))

    if (curRoute.fullPath.includes('?')) {
      storeQueryRoute(curRoute)
    }
  },
  { immediate: true }
)

function handleNav(routeNode) {
  // 点击面包屑进行跳转一定是相同祖先
  // 在queryRouteList中查询routeName是否存在, 并且获取其数据
  const queryRouteList = JSON.parse(localStorage.getItem('queryRouteList') ?? '[]')
  const oldRouteData = queryRouteList.find(item => item.name === routeNode.name) // object | undefined

  // 没找到说明没有query参数, 直接跳转即可
  const fullPath = oldRouteData?.fullPath ?? routeNode.path
  router.push(fullPath)
}
</script>

<style lang="scss" scoped>
.bread-box {
  .link {
    color: rgba(0, 0, 0, 0.45);
    font-weight: normal;

    &:hover {
      color: var(--el-color-primary);
    }
  }

  .text {
    color: rgba(0, 0, 0, 0.85);
  }

  :deep(.el-breadcrumb__separator) {
    color: rgba(0, 0, 0, 0.45);
    font-weight: normal;
  }
}
</style>
