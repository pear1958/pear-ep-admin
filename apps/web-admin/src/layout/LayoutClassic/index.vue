<template>
  <div class="layout-box">
    <div class="header-box dark:!bg-dark-main">
      <div class="logo flex-c">
        <LogoSvg />
        <span class="dark:!text-[#dadada]">梨子SaaS管理系统</span>
      </div>
      <div class="flex-1">
        <Header />
      </div>
    </div>

    <div class="body-box">
      <div class="sider" id="sider" :style="{ width: sideBarWidth }">
        <div class="menu">
          <Menu />
        </div>
        <div class="collapse-wrap">
          <Collapse />
        </div>
      </div>

      <div class="tabs-main" :style="{ width: `calc(100vw - ${sideBarWidth})` }">
        <Tabs />
        <Main />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Header from '../components/Header/index.vue'
import Tabs from '../components/Tabs/index.vue'
import Main from '../components/Main/index.vue'
import Menu from '../components/Menu/index.vue'
import Collapse from '../components/Header/components/Collapse.vue'
import LogoSvg from '@/assets/imgs/logo.svg?component'
import useSystemStore from '@/store/modules/system'

defineOptions({
  name: 'LayoutClassic'
})

const systemStore = useSystemStore()
const sideBarWidth = computed(() => systemStore.sideBar.width)
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
