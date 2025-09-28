<template>
  <el-scrollbar wrap-class="menu-box">
    <!-- activeMenu: 页面加载时默认激活菜单的 index #001529 -->
    <el-menu
      :default-active="activeKey"
      :router="false"
      :collapse="isCollapse"
      :collapse-transition="false"
      :unique-opened="menuAccordion"
      :background-color="!isDark ? '#001529' : '#1f1f1f'"
      text-color="#ffffffa6"
      active-text-color="#ffffff"
      @select="handleClick"
    >
      <SubMenu :menuList="menuData" />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter, useRoute, type RouteRecordRaw } from 'vue-router'
import { storeToRefs } from 'pinia'
import usePermissionStore from '@/store/modules/permission'
import useSystemStore from '@/store/modules/system'
import { filterMenuData } from '@/router/utils'
import SubMenu from '../SubMenu/index.vue'

const router = useRouter()
const route = useRoute()

const systemStore = useSystemStore()

const { isDark, menuAccordion } = storeToRefs(systemStore)
const isCollapse = computed(() => systemStore.sideBar.isCollapse)

const activeKey = computed(() => route.path)
const menuData = computed(() => filterMenuData(usePermissionStore().menuList))

const handleClick = (key: string) => {
  // 获取点击的路由
  const clickRoute = router.getRoutes().find(item => item.path === key) as RouteRecordRaw

  // 外部链接
  if (clickRoute.meta?.link) {
    return window.open(clickRoute.meta?.link as string, '_blank')
  }

  router.push(key)
}
</script>

<style lang="scss" scoped>
:deep(.menu-box) {
  .el-menu {
    border-right: none;

    > .el-menu-item,
    .el-sub-menu__title {
      height: 50px;
      line-height: 50px;
    }
  }

  .el-sub-menu .el-menu-item {
    background-color: #0c2135 !important;
  }

  .el-menu--vertical .el-menu .el-sub-menu__title {
    background-color: #0c2135 !important;
  }

  .el-menu-item:hover {
    color: #ffffff;
  }

  .el-menu-item.is-active {
    background-color: var(--el-color-primary) !important;
  }

  // 解决菜单收起图标不显示的bug
  .el-menu--collapse {
    .el-menu-tooltip__trigger,
    .el-sub-menu__title {
      padding: 0;
      justify-content: center;
    }
  }
}
</style>
