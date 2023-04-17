<template>
  <el-icon class="collapse-icon" @click="toggleSidebar">
    <component :is="isCollapse ? 'expand' : 'fold'" class="trigger" />
  </el-icon>
</template>

<script setup>
import { computed } from 'vue'
import { useSystemStore } from '@/store/modules/system'

const isCollapse = computed(() => useSystemStore().sideBar.isCollapse)

function toggleSidebar() {
  useSystemStore().setCollapse(!isCollapse.value)
}
</script>

<style lang="scss" scoped>
.collapse-icon {
  padding: 0 16px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
}

.trigger {
  transition: color 0.3s;

  &:hover {
    color: var(--el-color-primary);;
  }
}
</style>
