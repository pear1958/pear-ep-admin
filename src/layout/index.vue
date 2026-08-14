<template>
  <component :is="LayoutComponents[layout]" />
  <Setting />
</template>

<script lang="ts" setup>
import { computed, type Component } from 'vue'
import LayoutClassic from './LayoutClassic/index.vue'
import LayoutVertical from './LayoutVertical/index.vue'
// import LayoutColumns from './LayoutColumns/index.vue'
import Setting from './components/Setting/index.vue'
import useSystemStore from '@/store/modules/system'
import { regisOfflineIcons } from '@/plugins/iconify'
import { getPlatformConfig } from '@/config/platform'
import useConfigStore from '@/store/modules/platformConfig'
import { setHeaderHeight } from '@/utils/system'

const layout = computed(() => useSystemStore().layout)

setHeaderHeight(layout.value)

const LayoutComponents: Recordable<Component> = {
  classic: LayoutClassic,
  vertical: LayoutVertical
  // columns: LayoutColumns, // 半成品, 暂不考虑继续开发
}

regisOfflineIcons()

// 注入 public/platformConfig.json 文件的配置
// 放在这里不会阻塞首次页面加载
getPlatformConfig().then(config => {
  useConfigStore().setConfig(config)
})
</script>
