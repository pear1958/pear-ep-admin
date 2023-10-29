<template>
  <div>
    Home
    <test />
    <choose-area @change="onChange" />

    <div style="margin: 20px 0">
      <Progress isAnimate :percentage="60" />
      <br />
      <Progress isAnimate status="success" :stroke-width="20" :percentage="60" />
      <br />
      <Progress :time="5000" type="circle" isAnimate :percentage="60" />
    </div>

    <div>
      <el-table mb-1 :data="[]" />
      <el-pagination :total="100" class="mt-15" />
    </div>
  </div>
</template>

<script setup lang="ts" name="Home">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ChooseArea from '@/components/ChooseArea/index.vue'
import Progress from '@/components/Progress/index.vue'
import test from './test.vue'

function onChange(params: any) {
  console.log('params', params)
}
</script>

<style lang="scss" scoped></style>
