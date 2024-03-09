<template>
  <component :is="LayoutComponents[layout]" />
  <setting />
</template>

<script lang="ts" setup>
import { computed, type Component } from 'vue'
import layoutVertical from './layoutVertical/index.vue'
import setting from './components/setting/index.vue'
import { useSystemStore } from '@/store/modules/system'
import { regisOfflineIcons } from '@/components/icon'

import { getPlatformConfig } from '@/config/platform'
import { useConfigStore } from '@/store/modules/platformConfig'

const layout = computed(() => useSystemStore().layout)

const LayoutComponents: { [key: string]: Component } = {
  vertical: layoutVertical
}

regisOfflineIcons()

// 注入 public/platformConfig.json 文件的配置
// 放在这里不会阻塞首次页面加载
getPlatformConfig().then(config => {
  useConfigStore().setConfig(config)
})
</script>
