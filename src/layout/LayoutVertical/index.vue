<template>
  <el-container class="layout-box">
    <el-aside :width="sideBarWidth" class="sider" id="sider">
      <!-- Logo -->
      <div class="logo flex-c">
        <logo-svg />
        <span v-show="!isCollapse">Ep-Admin</span>
      </div>

      <div class="menu">
        <el-scrollbar>
          <!-- activeMenu: 页面加载时默认激活菜单的 index #001529 -->
          <el-menu
            :default-active="activeKey"
            :router="false"
            :collapse="isCollapse"
            :collapse-transition="false"
            unique-opened
            :background-color="!isDark ? '#001529' : '#1f1f1f'"
            text-color="#ffffffa6"
            active-text-color="#ffffff"
            @select="handleClick"
          >
            <SubMenu :menuList="menuData" />
          </el-menu>
        </el-scrollbar>
      </div>
    </el-aside>

    <el-container class="right-layout">
      <el-header class="header">
        <Header />
      </el-header>

      <Tabs />

      <el-main class="content">
        <Main />
      </el-main>
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
