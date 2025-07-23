<template>
  <div class="collapse-icon" @click="toggleSidebar">
    <Icon :icon="isCollapse ? 'menu-unfold-outlined' : 'menu-fold-outlined'" class="trigger" />
  </div>
</template>

<script setup lang="ts">
import { computed, unref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import useSystemStore from '@/store/modules/system'
import usePermissionStore from '@/store/modules/permission'

const route = useRoute()
const systemStore = useSystemStore()

const menuList = computed(() => usePermissionStore().showMenuListGet)
const isCollapse = computed(() => systemStore.sideBar.isCollapse)
const { layout } = storeToRefs(systemStore)

function toggleSidebar() {
  const menuItem = unref(menuList).filter((item: MenuItem) => {
    return route.path === item.path || `/${route.path.split('/')[1]}` === item.path
  })

  // 多列布局, 没有子菜单, 则不能展开
  // if (isCollapse.value && layout.value === 'columns' && !menuItem[0].children?.length) {
  //   return
  // }

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
