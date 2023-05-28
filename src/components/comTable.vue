<template>
  <el-table
    :data="data"
    style="width: 100%"
    v-loading="loading"
    element-loading-text="数据加载中..."
    table-layout="auto"
    v-bind="$attrs"
    border
  >
    <el-table-column type="index" align="center" label="序号"></el-table-column>

    <el-table-column v-for="(item, index) in props.columns" :key="index" v-bind="{ ...item }" align="center">
      <!-- 自定义表头 -->
      <template #header>
        <slot :name="'col' + item.prop" v-if="item.cusColumn" :rowKey="item"></slot>
        <div v-else>{{ item.label }}</div>
      </template>

      <!-- 判断自定义行 -->
      <template #default="scope">
        <div>
          <!-- 判断自定义行 -->
          <slot v-if="item.syncProp" :name="item.prop" :row="scope.row" :$index="scope.$index"></slot>
          <div v-else>{{ useFormatRow(scope.row, item) }}</div>
        </div>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页 -->
  <div class="row justify-flex-end mt-15" v-if="props.isShowPage">
    <el-pagination
      @size-change="sizeChangeHandler"
      @current-change="currentChangeHandler"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      popper-class="tooltipPage"
    ></el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue'

const emit = defineEmits(['dataUpdate'])

const props = defineProps({
  columns: {
    type: Array as unknown as PropType<any>,
    default: () => []
  },
  // 传入远程获取数据的接口
  apiFn: {
    type: Function || null,
    default: () => null
  },
  isShowPage: {
    type: Boolean,
    default: () => true
  },
  // 分页参数 默认用 current：当前页面   size：当前尺    total：总条数 records：列表数据
  pageParams: {
    type: Object as unknown as PropType<any>,
    default: () => {
      return {}
    }
  }
})

// 分页器参数
const paramsMap = ref({
  current: 'current',
  size: 'size',
  records: 'records',
  total: 'total'
})

// 表格loading
const loading = ref(false)

//表格数据
const data = ref([])
const total = ref(0)

const params = ref({})

// 外部传入接口获取表格数据
const getList = async (iptParams = {}) => {
  // 合并参数映射表
  paramsMap.value = { ...paramsMap.value, ...props.pageParams }

  // 保存参数表
  params.value = iptParams

  loading.value = true

  try {
    const { data: res } = await props.apiFn(params.value)
    loading.value = false
    if (!props.isShowPage) {
      return (data.value = res)
    }

    data.value = (res && useGetValueByKey(res, paramsMap.value.records)) || []

    emit('dataUpdate', res || [])

    total.value = (res && useGetValueByKey(res, paramsMap.value.total)) || 0
  } catch (e) {
    console.log(e)
  }
}

// page-size 每页显示条目个数改变时触发
const sizeChangeHandler = (e: any) => {
  Object.assign(params.value, { [paramsMap.value['size']]: e })
  Object.assign(params.value, { [paramsMap.value['current']]: 1 })
  getList(params.value)
}

function setData(dataSource: any) {
  data.value = dataSource
}

// current-page 当前页改变时触发
const currentChangeHandler = (e: number) => {
  Object.assign(params.value, { [paramsMap.value['current']]: e })
  // Object.assign(params.value, { [paramsMap.value['current']]: e })
  getList(params.value)
}

// 工具函数
const useGetValueByKey = (data: any, key: string) => {
  let value = data
  key.split('.').map(key => (value = value[key]))
  return value
}

const useFormatRow = (row: any, item: any) => {
  let value = useGetValueByKey(row, item.prop)
  return value || '--'
}

defineExpose({
  getList,
  setData,
  params
})
</script>
