<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-menu-item
      v-if="!subItem.children?.length"
      :index="subItem.path"
      @click="handleClickMenu(subItem)"
    >
      <Iconify
        :icon="subItem.meta.icon"
        :class="['text-base', { 'mr-1.5': !isCollapse }]"
        v-if="subItem.meta.icon"
      />

      <template #title>
        <span :class="['ellipsis', { 'flex-1': !isCollapse }]">
          {{ subItem.meta.title }}
        </span>
      </template>
    </el-menu-item>

    <el-sub-menu v-else :index="subItem.path">
      <template #title>
        <Iconify
          :icon="subItem.meta.icon"
          :class="['text-base', { 'mr-1.5': !isCollapse }]"
          v-if="subItem.meta.icon"
        />

        <span :class="['ellipsis', { 'flex-1': !isCollapse }]">
          {{ subItem.meta.title }}
        </span>
      </template>

      <SubMenu :menuList="subItem.children" />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import SubMenu from './index.vue'
import useSystemStore from '@/store/modules/system'

defineProps<{ menuList: MenuList }>()

const router = useRouter()

const isCollapse = computed(() => useSystemStore().sideBar.isCollapse)

const handleClickMenu = (subItem: MenuItem) => {
  if (subItem.meta.isLink) return window.open(subItem.meta.isLink, '_blank')

  router.push(subItem.path)
}
</script>
