<template>
  <div class="bg-white dark:bg-dark p-4">
    <ChooseArea @change="onChange" v-if="showChooseArea" />
    <el-button type="primary" @click="showChooseArea = true" v-else>异步加载组件(3s)</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { delay } from 'pear-common-utils'
import { createAsyncComponent } from '@/utils/vue/createAsyncComponent'

const showChooseArea = ref(false)

const ChooseArea = createAsyncComponent(
  async () => {
    await delay(3000)
    return import('@/components/ChooseArea/index.vue')
  },
  { loading: true }
)

function onChange(params: any) {
  console.log('params', params)
}
</script>

<style lang="scss" scoped></style>
