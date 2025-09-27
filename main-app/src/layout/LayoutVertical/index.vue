<template>
  <div class="layout-box">
    <div :style="{ width: sideBarWidth }" class="sider" id="sider">
      <div class="logo flex-c">
        <LogoSvg />
        <span v-show="!isCollapse">Ep-Admin</span>
      </div>

      <div class="menu">
        <Menu />
      </div>
    </div>

    <div class="right-layout">
      <Header />
      <Tabs />
      <Main />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import Header from '../components/Header/index.vue'
import Tabs from '../components/Tabs/index.vue'
import Main from '../components/Main/index.vue'
import Menu from '../components/Menu/index.vue'
import LogoSvg from '@/assets/imgs/logo.svg?component'
import useSystemStore from '@/store/modules/system'

defineOptions({
  name: 'LayoutVertical'
})

const systemStore = useSystemStore()

const sideBarWidth = computed(() => systemStore.sideBar.width)
const isCollapse = computed(() => systemStore.sideBar.isCollapse)
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
