<template>
  <div class="layout-box">
    <div class="left-menu">
      <div class="logo flex-c">
        <LogoSvg />
      </div>

      <div class="menu-list">
        <el-scrollbar>
          <div
            v-for="item in menuList"
            :class="[
              'menu-item',
              { active: activePath === item.path || `/${activePath.split('/')[1]}` === item.path }
            ]"
            @click="changeSubMenu(item)"
            :key="item.path"
          >
            <Iconify :icon="item.meta.icon" />
            <span class="ellipsis title">{{ item.meta.title }}</span>
          </div>
        </el-scrollbar>
      </div>
    </div>

    <div class="middle-menu" :style="{ width: isCollapse ? '0px !important' : '210px !important' }">
      <div class="logo flex-c">
        <span v-show="subMenuList.length" class="logo-text">{{ isCollapse ? 'E' : title }}</span>
      </div>

      <div class="sub-menu">
        <el-scrollbar>
          <el-menu
            :router="false"
            :default-active="activeKey"
            :collapse="isCollapse"
            :unique-opened="menuAccordion"
            :collapse-transition="false"
          >
            <SubMenu :menu-list="subMenuList" />
          </el-menu>
        </el-scrollbar>
      </div>
    </div>

    <div class="right-layout">
      <div class="header">
        <Header />
      </div>

      <Tabs />

      <div
        class="content"
        :style="{ padding: !route.meta?.mainFull ? '16px' : 0 }"
        v-loading="enableMainLoading && mainLoading"
      >
        <Main />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/modules/system'
import usePermissionStore from '@/store/modules/permission'
import LogoSvg from '@/assets/imgs/logo.svg?component'
import Header from '../components/Header/index.vue'
import Tabs from '../components/Tabs/index.vue'
import Main from '../components/Main/index.vue'
import SubMenu from '../components/SubMenu/index.vue'

defineOptions({
  name: 'LayoutColumns'
})

const title = import.meta.env.VITE_TITLE

const route = useRoute()
const router = useRouter()
const systemStore = useSystemStore()
const permissionStore = usePermissionStore()

const activePath = ref('')
const menuList = computed(() => permissionStore.showMenuListGet)
const subMenuList = ref<MenuList>([])
const isCollapse = computed(() => systemStore.sideBar.isCollapse)

const { enableMainLoading, mainLoading, menuAccordion } = storeToRefs(systemStore)

watch(
  () => [route, menuList],
  () => {
    if (!menuList.value.length) return

    activePath.value = route.path

    const menuItem = menuList.value.filter((item: MenuItem) => {
      return route.path === item.path || `/${route.path.split('/')[1]}` === item.path
    })

    if (!menuItem[0].children?.length) {
      subMenuList.value = []
      systemStore.setCollapse(true)
    } else {
      subMenuList.value = menuItem[0].children
      systemStore.setCollapse(false)
    }
  },
  {
    deep: true,
    immediate: true
  }
)

const activeKey = computed(() => route.path)

const changeSubMenu = (item: MenuItem) => {
  activePath.value = item.path
  systemStore.setCollapse(false)

  if (!item.children?.length) {
    subMenuList.value = []
    systemStore.setCollapse(true)
    router.push(item.path)
  } else {
    subMenuList.value = item.children
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
