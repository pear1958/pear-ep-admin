<template>
  <div class="tabs-box" :style="{ left: sideBarWidth }">Tabs</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useSystemStore } from '@/store/modules/system'
const systemStore = useSystemStore()

const sideBarWidth = computed(() => {
  return systemStore.sideBar.isCollapse ? '64px' : '210px'
})
</script>

<style lang="scss" scoped>
.tabs-box {
  height: $tabHeight;
  position: fixed;
  right: 0;
  top: $headerHeight;
  box-sizing: border-box;
  border: 1px solid gold;
}
</style>
