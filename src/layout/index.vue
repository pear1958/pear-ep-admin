<template>
  <component :is="LayoutComponents[layout]" />
  <Setting />
</template>

<script lang="ts" setup>
import { computed, type Component } from 'vue'
import LayoutVertical from './LayoutVertical/index.vue'
import Setting from './components/Setting/index.vue'
import { useSystemStore } from '@/store/modules/system'
import { regisOfflineIcons } from '@/components/Icon'

import { getPlatformConfig } from '@/config'
import { useConfigStore } from '@/store/modules/platformConfig'

const layout = computed(() => useSystemStore().layout)

const LayoutComponents: { [key: string]: Component } = {
  vertical: LayoutVertical
}

regisOfflineIcons()

// 注入 public/platformConfig.json 文件的配置
// 放在这里不会阻塞首次页面加载
getPlatformConfig().then(config => {
  useConfigStore().setConfig(config)
})
</script>
