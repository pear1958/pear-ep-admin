<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-menu-item v-if="!subItem.children?.length" :index="subItem.path" @click="handleClickMenu(subItem)">
      <iconify :icon="subItem.meta.icon" class="text-base mr-1.5" />

      <template #title>
        <span>{{ subItem.meta.title }}</span>
      </template>
    </el-menu-item>

    <el-sub-menu v-else :index="subItem.path">
      <template #title>
        <iconify :icon="subItem.meta.icon" class="text-base mr-1.5" />

        <span>{{ subItem.meta.title }}</span>
      </template>

      <SubMenu :menuList="subItem.children" />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import SubMenu from './index.vue'

defineProps<{ menuList: Menu.MenuOptions[] }>()

const router = useRouter()

const handleClickMenu = (subItem: Menu.MenuOptions) => {
  if (subItem.meta.isLink) return window.open(subItem.meta.isLink, '_blank')

  router.push(subItem.path)
}
</script>
