<template>
  <div class="flex align-center gap-2.5">
    <el-select
      v-model="province"
      placeholder="省"
      clearable
      @change="onProvinceChange"
      filterable
      :loading="provinceLoading"
      loading-text="加载中..."
    >
      <el-option
        v-for="item in provinceOptions"
        :key="item.code"
        :label="item.name"
        :value="item.code"
      />
    </el-select>

    <el-select
      v-model="city"
      placeholder="市"
      clearable
      :disabled="!province"
      @change="onCityChange"
      filterable
      :loading="cityLoading"
      loading-text="加载中..."
    >
      <el-option
        v-for="item in cityOptions"
        :key="item.code"
        :label="item.name"
        :value="item.code"
      />
    </el-select>

    <el-select
      v-model="county"
      placeholder="区"
      clearable
      :disabled="!province || !city"
      @change="onCountyChange"
      filterable
      :loading="countyLoading"
      loading-text="加载中..."
    >
      <el-option
        v-for="item in countyOptions"
        :key="item.code"
        :label="item.name"
        :value="item.code"
      />
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { deepClone } from '@/utils'
import { getOrganization } from '@/api/modules/common'
import { onMounted } from 'vue'

defineOptions({
  name: 'areaSelect'
})

interface IOption {
  code: string
  name: string
  [key: string]: any
}

const emit = defineEmits(['change'])

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  provinceKey: {
    type: String,
    default: 'provinceCode'
  },
  cityKey: {
    type: String,
    default: 'cityCode'
  },
  countyKey: {
    type: String,
    default: 'countyCode'
  }
})

// 储存剩余的参数
const restData = ref({})

const province = ref('')
const city = ref('')
const county = ref('')

const provinceOptions = ref<IOption[]>([])
const cityOptions = ref<IOption[]>([])
const countyOptions = ref<IOption[]>([])

const provinceLoading = ref(false)
const cityLoading = ref(false)
const countyLoading = ref(false)

onMounted(() => {
  getInitProvince()
})

async function getInitProvince() {
  try {
    provinceLoading.value = true

    const { code, data, msg } = await getOrganization({ level: 0 })

    if (!String(code).startsWith('2')) {
      return ElMessage.error(msg || '查询省级区域失败')
    }

    provinceOptions.value = data
  } finally {
    provinceLoading.value = false
  }
}

/**
 * 编辑时数据回填
 */
watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    if (!newVal) return

    const { provinceKey, cityKey, countyKey } = props

    if (Object.keys(newVal).length) {
      province.value = newVal[provinceKey]
      city.value = newVal[cityKey]
      county.value = newVal[countyKey]

      const tempData = deepClone(newVal)
      delete tempData[provinceKey]
      delete tempData[cityKey]
      delete tempData[countyKey]

      restData.value = tempData
    }

    if (province.value && !oldVal) {
      cityLoading.value = true

      getOrganization({ level: 1, pcode: province.value })
        .then(res => {
          if (!String(res.code).startsWith('2')) {
            return ElMessage.error(res.msg || '查询市级区域失败')
          }
          cityOptions.value = res.data
        })
        .finally(() => {
          cityLoading.value = false
        })
    }

    if (city.value && !oldVal) {
      countyLoading.value = true

      getOrganization({ level: 2, pcode: city.value })
        .then(res => {
          if (!String(res.code).startsWith('2')) {
            return ElMessage.error(res.msg || '查询区级区域失败')
          }
          countyOptions.value = res.data
        })
        .finally(() => {
          countyLoading.value = false
        })
    }
  },
  {
    immediate: true
  }
)

const onProvinceChange = async (newVal: string) => {
  if (newVal) {
    try {
      cityLoading.value = true
      cityOptions.value = []

      const { code, data, msg } = await getOrganization({ level: 1, pcode: province.value })

      if (!String(code).startsWith('2')) {
        return ElMessage.error(msg || '查询市级区域失败')
      }

      cityOptions.value = data
    } finally {
      cityLoading.value = false
    }
  }
  city.value = ''
  county.value = ''
  emitData()
}

const onCityChange = async (newVal: string) => {
  if (newVal) {
    try {
      countyLoading.value = true
      countyOptions.value = []

      const { code, data, msg } = await getOrganization({ level: 2, pcode: city.value })

      if (!String(code).startsWith('2')) {
        return ElMessage.error(msg || '查询区级区域失败')
      }

      countyOptions.value = data
    } finally {
      countyLoading.value = false
    }
  }
  county.value = ''
  emitData()
}

const onCountyChange = () => {
  emitData()
}

const emitData = () => {
  const { provinceKey, cityKey, countyKey } = props

  const data = {
    [provinceKey]: province.value,
    [cityKey]: city.value,
    [countyKey]: county.value,
    ...restData.value
  }

  props.modelValue[provinceKey] = province.value
  props.modelValue[cityKey] = city.value
  props.modelValue[countyKey] = county.value

  emit('change', data)
}
</script>

<style lang="scss" scoped></style>
