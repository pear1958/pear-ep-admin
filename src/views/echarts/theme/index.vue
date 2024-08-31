<template>
  <div class="bg-white dark:bg-dark w-full h-full">
    <ECharts :options="options" />
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import ECharts from '@/components/Base/ECharts'
import themeConfig from './wonderland.json'
import { options } from './config'

echarts.registerTheme('wonderland', themeConfig)
</script>
