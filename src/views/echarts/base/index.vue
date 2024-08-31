<template>
  <div class="bg-white dark:bg-dark py-10">
    <div class="w-full h-[500px]">
      <ECharts :options="options" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ECharts from '@/components/Base/ECharts'
import { options } from './config'
</script>
