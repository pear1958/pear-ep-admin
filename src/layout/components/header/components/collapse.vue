<template>
  <div class="collapse-icon" @click="toggleSidebar">
    <Iconify :icon="isCollapse ? 'menu-unfold-outlined' : 'menu-fold-outlined'" class="trigger" />
  </div>
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
    color: var(--el-color-primary);
  }
}
</style>
