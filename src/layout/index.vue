<template>
  <component :is="LayoutComponents[layout]" />
  <Setting />
</template>

<script lang="ts" setup>
import { computed, type Component } from 'vue'
import LayoutVertical from './LayoutVertical/index.vue'
import Setting from './components/Setting/index.vue'
import { useSystemStore } from '@/store/modules/system'

const layout = computed(() => useSystemStore().layout)

const LayoutComponents: { [key: string]: Component } = {
  vertical: LayoutVertical
}
</script>
