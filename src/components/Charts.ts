import * as echarts from 'echarts'
import type { ECharts } from 'echarts'

export default defineComponent({
  name: 'Charts',
  props: {
    options: {
      type: Object as PropType<any>
    }
  },
  setup(props) {
    let chart: ECharts
    const chartRef = ref()

    const updateChart = () => {
      if (!chart) return
      chart.clear()
      chart.setOption(props.options)
    }

    const resizeChart = () => {
      if (!chart) return
      chart.resize()
    }

    window.addEventListener('resize', resizeChart)

    watch(
      () => props.options,
      () => {
        updateChart()
      },
      {
        immediate: true,
        deep: true
      }
    )

    onMounted(() => {
      chart = echarts.init(chartRef.value)
      chart.setOption(props.options)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', resizeChart)
    })

    return () => h('div', { class: 'chart w-full h-full', ref: chartRef })
  }
})
