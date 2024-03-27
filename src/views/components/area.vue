<template>
  <div>
    <el-card>
      <template #header>
        <span>省市区(下拉选择)</span>
      </template>

      <div>
        <area-select v-model="form1" @change="onChange" />

        <div class="mt-2">
          <div>绑定的数据：</div>
          <div class="mt-2">{{ form1 }}</div>
        </div>
      </div>
    </el-card>

    <el-card class="mt-4">
      <template #header>
        <span>省市区(级联选择)</span>
      </template>

      <div>2222</div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import areaSelect from '@/components/areaSelect.vue'
import { reactive } from 'vue'

const form1 = reactive<Recordable>({
  key1: 'test1',
  key2: 'test2'
  // provinceCode: '230000',
  // cityCode: '230300',
  // countyCode: '230305'
})

const onChange = (data: Recordable) => {
  console.log('data', data)
}
</script>

<style lang="scss" scoped></style>
