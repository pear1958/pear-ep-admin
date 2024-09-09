<template>
  <el-select clearable placeholder="请选择省份" v-model="province">
    <el-option
      v-for="item in chinaData"
      :key="item.code"
      :value="item.code"
      :label="item.name"
    ></el-option>
  </el-select>

  <el-select
    clearable
    :disabled="!province"
    style="margin: 0 10px"
    placeholder="请选择城市"
    v-model="city"
  >
    <el-option
      v-for="item in cityOptions"
      :key="item.code"
      :value="item.code"
      :label="item.name"
    ></el-option>
  </el-select>

  <el-select clearable :disabled="!province || !city" placeholder="请选择区域" v-model="district">
    <el-option
      v-for="item in districtOptions"
      :key="item.code"
      :value="item.code"
      :label="item.name"
    ></el-option>
  </el-select>
</template>

<script lang="ts" setup>
import { ref, unref, watch } from 'vue'
import pcaCodeJson from './pca-code.json'

// 同理 可以扩展 一个省市区街道四级联动组件 && 一个级联选择框的省市区组件

interface Data {
  name: string
  code: string
}

interface selectItem extends Data {
  children?: selectItem[]
}

const chinaData = ref(pcaCodeJson)

const province = ref('')
const city = ref('')
const district = ref('')

// 城市下拉框的所有的值
const cityOptions = ref<selectItem[]>([])

// 区域下拉框的所有的值
const districtOptions = ref<selectItem[]>([])

const emits = defineEmits(['change'])

// 监听选择省份
watch(
  () => province.value,
  newVal => {
    if (newVal) {
      cityOptions.value = unref(chinaData).find(item => item.code === newVal)!.children
    }
    city.value = ''
    district.value = ''
  }
)

// 监听选择城市
watch(
  () => city.value,
  newVal => {
    if (newVal) {
      districtOptions.value = unref(cityOptions).find(item => item.code === newVal)!.children!
    }
    district.value = ''
  }
)

// 监听选择区域   组装数据, 触发事件
watch(
  () => district.value,
  newVal => {
    if (newVal) {
      let provinceData: Data = {
        code: province.value,
        name: province.value && unref(chinaData).find(item => item.code === province.value)!.name
      }

      let cityData: Data = {
        code: city.value,
        name: city.value && unref(cityOptions).find(item => item.code === city.value)!.name
      }

      let districtData: Data = {
        code: newVal,
        name: newVal && unref(districtOptions).find(item => item.code === newVal)!.name
      }

      emits('change', {
        province: provinceData,
        city: cityData,
        district: districtData
      })
    }
  }
)
</script>
