<template>
  <svg aria-hidden="true" class="svg-icon">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

// 此组件 搭配 vite-plugin-svg-icons 插件使用   参见 vite.config.ts

const props = defineProps({
  prefix: { type: String, default: 'icon' },
  name: { type: String, default: '' }
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  overflow: hidden;
  fill: currentColor;
}
</style>
