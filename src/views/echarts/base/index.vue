<template>
  <div class="bg-white dark:bg-dark py-10">
    <div class="w-full h-[500px]">
      <ECharts :options="options" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import ECharts from '@/components/Base/ECharts'
import { mockOptions } from './config'

const options = reactive(mockOptions)
</script>
