<template>
  <el-container class="layout">
    <el-aside :width="isCollapse ? '64px' : '210px'" class="sider">
      <!-- Logo -->
      <div class="logo flex-center">
        <logo-svg />
        <span v-show="!isCollapse">V-Admin</span>
      </div>

      <div class="menu">
        <el-scrollbar>
          <!-- activeMenu: 页面加载时默认激活菜单的 index #001529 -->
          <el-menu
            :default-active="activeMenu"
            :router="false"
            :collapse="isCollapse"
            :collapse-transition="false"
            unique-opened
            background-color="#001529"
            text-color="#ffffffa6"
            active-text-color="#ffffff"
          >
            <SubMenu :menuList="menuData" />
          </el-menu>
        </el-scrollbar>
      </div>
    </el-aside>

    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useSystemStore } from '@/store/modules/system'
import { filterMenuData } from '@/router/utils'
import { usePermissionStore } from '@/store/modules/permission'
import SubMenu from '../components/SubMenu/index.vue'
import logoSvg from '@/assets/imgs/logo.svg?component'

const isCollapse = computed(() => useSystemStore().sideBar.isCollapse)

const route = useRoute()

const activeMenu = computed(() => route.path)

const menuData = computed(() => filterMenuData(usePermissionStore().menuList))

console.log('menuData', menuData)
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
