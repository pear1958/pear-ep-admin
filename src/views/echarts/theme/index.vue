<template>
  <div class="bg-white dark:bg-dark w-full h-full">
    <ECharts :options="options" themeName="wonderland" :themeConfig="themeConfig" />
  </div>
</template>

<script lang="ts" setup>
import ECharts from '@/components/Base/ECharts'
import themeConfig from './wonderland.json'
import { options } from './config'
</script>
