<template>
  <el-card>
    <template #header>
      <span>表格无限滚动</span>
      <span class="ml-6">( 插件地址: https://github.com/yujinpan/el-table-infinite-scroll )</span>
    </template>

    <div>
      <p class="mb-2">
        <span>loaded page(total: {{ total }}): {{ pageIndex }}, </span>
        disabled:
        <el-switch v-model="disabled" :disabled="pageIndex >= total" />
      </p>

      <el-table v-el-table-infinite-scroll="load" :data="data" :infinite-scroll-disabled="disabled" height="435px">
        <el-table-column type="index" />
        <el-table-column prop="date" label="date" />
        <el-table-column prop="name" label="name" />
        <el-table-column prop="age" label="age" />
      </el-table>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { default as vElTableInfiniteScroll } from 'el-table-infinite-scroll'

defineOptions({
  name: 'InfiniteScroll'
})

const mockData = new Array(10).fill({
  date: '2023-10-29',
  name: 'RealityBoy',
  age: '18'
})

const data = ref([])
const disabled = ref(false)
const pageIndex = ref(0)
const total = ref(10)

const load = () => {
  if (disabled.value) return

  pageIndex.value++

  if (pageIndex.value <= total.value) {
    data.value = data.value.concat(mockData as [])
  }

  if (pageIndex.value === total.value) {
    disabled.value = true
  }
}
</script>

<style lang="scss" scoped></style>
