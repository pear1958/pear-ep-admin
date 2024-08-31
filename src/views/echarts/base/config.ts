import { EChartsOption } from 'echarts'

export const options: EChartsOption = {
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
