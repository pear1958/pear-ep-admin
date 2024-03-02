<template>
  <div class="main">
    <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="keepAliveNameList">
          <component :is="Component" :key="route.path" v-if="routerShow" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import emitter from '@/utils/mitt'
import { useSystemStore } from '@/store/modules/system'

const { keepAliveNameList } = storeToRefs(useSystemStore())

const routerShow = ref(true)

// 刷新当前页面
emitter.on('refreshPage', val => {
  routerShow.value = val as boolean
})
</script>

<style lang="scss" scoped>
.main {
  min-height: calc(100vh - $headerHeight - $tabHeight - 32px);
  box-sizing: border-box;
}
</style>
