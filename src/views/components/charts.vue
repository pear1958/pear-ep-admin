<template>
  <div class="bg-white dark:bg-dark py-10">
    <div class="w-full h-[500px]">
      <charts :options="options" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import charts from '@/components/charts'
import { ChartOption } from '@/components/charts/type'

const mockOptions: ChartOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  xAxis: {
    type: 'category',
    data: [
      '2022-05-17',
      '2022-05-18',
      '2022-05-19',
      '2022-05-20',
      '2022-05-21',
      '2022-05-22',
      '2022-05-23'
    ],
    axisTick: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  series: [
    {
      name: '数量',
      data: [320, 33, 419, 156, 256, 80, 400],
      type: 'bar',
      itemStyle: {
        color: '#2097F3'
      },
      barWidth: 30
    }
  ]
}

const options = reactive(mockOptions)
</script>

<style lang="scss" scoped></style>
