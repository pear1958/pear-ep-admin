import { PropType, computed, defineComponent, h, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import * as echarts from 'echarts'
// import { EChartsType } from 'echarts/core'
// import echarts from './config'
import { useSystemStore } from '@/store/modules/system'
import { throttle } from '@/utils'
import { ChartOption, GeoJson } from './type'
import { isObject } from '@/utils/is'

export default defineComponent({
  name: 'ECharts',
  props: {
    options: {
      type: Object as PropType<ChartOption>,
      default: () => ({})
    },
    themeName: {
      type: String,
      default: null
    },
    themeConfig: {
      type: Object,
      default: () => null
    },
    mapName: {
      type: String,
      default: null
    },
    mapJson: {
      type: Object as PropType<GeoJson>,
      default: () => null
    }
  },
  setup(props) {
    let chart: echarts.ECharts
    const chartRef = ref()
    const isCollapse = computed(() => systemStore.sideBar.isCollapse)
    const systemStore = useSystemStore()
    const { mainMaximize } = storeToRefs(systemStore)

    const updateChart = () => {
      if (!chart) return
      chart.clear()
      chart.setOption(props.options)
    }

    const resizeChart = throttle(() => {
      if (!chart) return
      chart.resize()
    }, 200)

    window.addEventListener('resize', resizeChart)

    watch(mainMaximize, resizeChart)

    watch(isCollapse, () => {
      setTimeout(resizeChart, 300)
    })

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
      const { themeName, themeConfig, mapName, mapJson } = props

      if (themeName && isObject(themeConfig)) {
        echarts.registerTheme(themeName, themeConfig)
      }
      if (mapName && mapJson) {
        echarts.registerMap(mapName, mapJson)
      }
      chart = echarts.init(chartRef.value)
      chart.setOption(props.options)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', resizeChart)
    })

    return {
      chartRef
    }
  },
  render() {
    return h('div', { class: 'chart w-full h-full', ref: el => (this.chartRef = el) })
  }
})
