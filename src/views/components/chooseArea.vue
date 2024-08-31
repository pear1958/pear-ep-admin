<template>
  <div class="bg-white dark:bg-dark p-4">
    <ChooseArea @change="onChange" />
  </div>
</template>

<script setup lang="ts">
// import ChooseArea from '@/components/ChooseArea/index.vue'
import { createAsyncComponent } from '@/utils/vue/createAsyncComponent'
import { delay } from '@/utils'

const ChooseArea = createAsyncComponent(async () => {
  await delay(3000)
  return import('@/components/ChooseArea/index.vue')
})

function onChange(params: any) {
  console.log('params', params)
}
</script>

<style lang="scss" scoped></style>
