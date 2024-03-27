<template>
  <div>
    <el-card>
      <template #header>
        <span>省市区(下拉选择)</span>
      </template>

      <div>
        <area-select v-model="form1" @change="onChange1" />

        <div class="mt-2">
          <div>v-model绑定的数据：</div>
          <div class="mt-2">{{ form1 }}</div>
        </div>
      </div>
    </el-card>

    <el-card class="mt-4">
      <template #header>
        <span>省市区(级联选择)</span>
      </template>

      <div>
        <area-cascader v-model="form2" @change="onChange2" />

        <div class="mt-2">
          <div>v-model绑定的数据：</div>
          <div class="mt-2">{{ form2 }}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import areaSelect from '@/components/areaSelect.vue'
import areaCascader from '@/components/areaCascader.vue'

const form1 = reactive({
  key1: 'test-1',
  key2: 'test-2'
  // provinceCode: '230000',
  // cityCode: '230300',
  // countyCode: '230305'
})

const form2 = reactive({
  key1: 'test-a',
  key2: 'test-b',
  provinceCode: '230000',
  cityCode: '230300',
  countyCode: '230305'
})

const onChange1 = (data: Recordable) => {
  console.log('data1', data)
}

const onChange2 = (data: Recordable) => {
  console.log('data2', data)
}
</script>

<style lang="scss" scoped></style>
