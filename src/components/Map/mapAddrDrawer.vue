<template>
  <Drawer
    :modelValue="visible"
    @update:modelValue="(val: boolean) => emit('update:visible', val)"
    title="地址选择"
    @confirm="handleConfirm"
  >
    <div class="map-box">
      <el-select
        v-model="addr"
        placeholder="输入查询或者点击选择"
        filterable
        remote
        :remote-method="getAddrList"
        :style="{ width: '100%' }"
        @change="onChange"
      >
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>

      <div class="mt-1.5">
        <div id="mapDiv" ref="mapRef" />
      </div>
    </div>
  </Drawer>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import AMapLoader from '@amap/amap-jsapi-loader'
import { useConfigStore } from '@/store/modules/platformConfig'
import { Drawer } from '@/components'
import { isObject } from '@/utils/is'
import markerPng from '@/assets/imgs/marker.png'
import { deepClone } from '@/utils/func'

export type IMapData = {
  addr: string
  lng: number | string
  lat: number | string
}

interface AddrOption {
  label: string
  value: string
  lng: number
  lat: number
}

defineOptions({
  name: 'mapAddrDrawer'
})

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void
  (e: 'update:mapData', val: IMapData): void
}>()

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  mapData: {
    validator: () => true,
    required: true
  }
})

const mapRef = ref()
const addr = ref('')
let map: Recordable
let geocoder: Recordable

let mapData: IMapData = {
  addr: '',
  lng: '',
  lat: ''
}

const options = ref<AddrOption[]>([])

watchEffect(async () => {
  if (props.visible) {
    await initMap()

    if (!isObject(props.mapData)) return

    // 编辑: 回填数据
    mapData = deepClone(props.mapData) as Recordable as any

    // Key 若不存在, 则赋初始值, 避免第一次点击确定返回的数据格式不对
    if (!Reflect.has(mapData, 'lng')) mapData.lng = ''
    if (!Reflect.has(mapData, 'lat')) mapData.lat = ''
    if (!Reflect.has(mapData, 'addr')) mapData.addr = ''

    const { addr: address, lng, lat } = mapData
    addr.value = address
    if (lng && lat) addMarker([Number(lng), Number(lat)], address)

    return
  }

  // 关闭抽屉: 销毁地图
  map?.destroy() && map?.clearEvents('click')
  options.value.splice(0)
})

const handleConfirm = () => {
  emit('update:mapData', mapData)
}

function initMap(): Promise<void> {
  const { securityJsCode, key } = useConfigStore().mapConfig

  return new Promise((resolve, reject) => {
    window._AMapSecurityConfig = {
      securityJsCode
    }

    AMapLoader.load({
      key,
      version: '2.0',
      plugins: ['AMap.Geocoder', 'AMap.AutoComplete']
    })
      .then(AMap => {
        map = new AMap.Map(mapRef.value, {
          zoom: 15,
          layers: [new AMap.TileLayer.Satellite(), new AMap.TileLayer.RoadNet()],
          center: [(props.mapData as any)?.lng || 104.060791, (props.mapData as any)?.lat || 30.543995]
        })

        geocoder = new AMap.Geocoder()

        map.on('click', (event: Recordable) => {
          const lng = event.lnglat.getLng()
          const lat = event.lnglat.getLat()

          const lngLat = [lng, lat] as [number, number]

          if (!lng || !lat) {
            ElMessage.warning('打点失败')
            return
          }

          geocoder.getAddress(lngLat, function (status: string, result: Recordable) {
            if (status === 'complete' && result.regeocode) {
              addr.value = result.regeocode.formattedAddress

              map.clearMap()

              addMarker(lngLat, addr.value, false)

              mapData = {
                addr: addr.value,
                lng,
                lat
              }
            } else {
              ElMessage.error('根据经纬度查询地址失败')
            }
          })
        })

        resolve()
      })
      .catch(err => {
        console.log('err', err)
        reject()
      })
  })
}

const addMarker = (lngLat: [number, number], name: string | null, setCenter = true) => {
  const marker = new AMap.Marker({
    position: lngLat,
    icon: new AMap.Icon({
      image: markerPng,
      size: new AMap.Size(46, 46), // 图标所处区域大小
      imageSize: new AMap.Size(46, 46), // 图标大小
      imageOffset: new AMap.Pixel(0, 9)
    }),
    anchor: 'bottom-center'
  })

  marker.setLabel({
    direction: 'top',
    offset: new AMap.Pixel(0, 9), // 设置文本标注偏移量
    content: `<div>${name || ''}</div>` // 设置文本标注内容
  })

  map.add(marker)

  setCenter && map.setCenter(lngLat)
}

// 获取输入提示信息
const getAddrList = (query: string) => {
  if (!query) {
    options.value = []
    return
  }

  const autoComplete = new AMap.Autocomplete({
    city: '全国'
  })

  // 搜索成功时，result即是对应的匹配数据
  autoComplete.search(query, (status: string, result: Recordable) => {
    const { tips } = result

    if (!Array.isArray(tips)) return

    options.value = tips
      .filter(item => item.location?.lng && item.location?.lat)
      .map((item: Recordable) => ({
        label: item.name,
        value: item.name,
        lng: Number(item.location.lng),
        lat: Number(item.location.lat)
      }))
  })
}

const onChange = (name: string) => {
  const selectItem = unref(options).find((item: AddrOption) => item.value == name)

  if (!selectItem) return

  const { lng, lat } = selectItem

  addMarker([lng, lat], name)

  mapData = {
    addr: name,
    lng,
    lat
  }
}
</script>

<style lang="scss" scoped>
#mapDiv {
  width: 100%;
  height: 500px;

  :deep(.amap-marker-label) {
    border-radius: 3px;
    border: none;
    padding: 6px;
    width: 170px;
    white-space: normal;
  }
}
</style>
