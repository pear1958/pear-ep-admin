<template>
  <div class="bg-white dark:bg-dark w-full h-full echarts-box">
    <ECharts :options="options" />
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import ECharts from '@/components/Base/ECharts'
import { GeoJson } from '@/components/Base/ECharts/type'
import { options } from './config'
// 数据来源: https://datav.aliyun.com/portal/school/atlas/area_selector
import mapJson from './json/china-province.json'

echarts.registerMap('china', mapJson as GeoJson)
</script>

<style lang="scss" scoped>
.echarts-box {
  background-image: url('./imgs/bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
