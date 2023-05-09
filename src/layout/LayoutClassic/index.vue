<template>
  <el-container class="layout-box">
    <el-header class="header">
      <!-- Logo -->
      <div class="logo flex-center" :style="{ width: '210px' }">
        <logo-svg />
        <span>V-Admin</span>
      </div>

      <Header />
    </el-header>

    <el-container class="btm-layout">
      <el-aside :width="sideBarWidth" class="sider" id="sider">
        <div class="menu">
          <el-scrollbar>
            <!-- activeMenu: 页面加载时默认激活菜单的 index #001529 -->
            <el-menu
              :default-active="activeKey"
              :router="false"
              :collapse="isCollapse"
              :collapse-transition="false"
              unique-opened
              @select="handleClick"
            >
              <SubMenu :menuList="menuData" />
            </el-menu>
          </el-scrollbar>
        </div>
      </el-aside>

      <div class="container">
        <Tabs />

        <el-main class="content">
          <Main />
        </el-main>
      </div>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import { filterMenuData } from '@/router/utils'
import { useSystemStore } from '@/store/modules/system'
import { usePermissionStore } from '@/store/modules/permission'
import SubMenu from '../components/SubMenu/index.vue'
import Header from '../components/Header/index.vue'
import Tabs from '../components/Tabs/index.vue'
import Main from '../components/Main/index.vue'
import logoSvg from '@/assets/imgs/logo.svg?component'

const router = useRouter()
const route = useRoute()

const isCollapse = computed(() => useSystemStore().sideBar.isCollapse)
const sideBarWidth = computed(() => (isCollapse.value ? '64px' : '210px'))
const activeKey = computed(() => route.path)

const menuData = computed(() => filterMenuData(usePermissionStore().menuList))

const isDark = computed(() => useSystemStore().isDark)

function handleClick(key: string) {
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
@import './index.scss';
</style>
