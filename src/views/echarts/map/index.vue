<template>
  <div class="bg-white dark:bg-dark w-full h-full echarts-box">
    <ECharts :options="options" mapName="china" :mapJson="mapJson" />
  </div>
</template>

<script lang="ts" setup>
import ECharts from '@/components/Base/ECharts'
// 数据来源: https://datav.aliyun.com/portal/school/atlas/area_selector
import jsonData from './json/china-province.json'
import { options } from './config'
import type { GeoJson } from '@/components/Base/ECharts/type'

const mapJson = jsonData as GeoJson
</script>

<style lang="scss" scoped>
.echarts-box {
  background-image: url('./imgs/bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
