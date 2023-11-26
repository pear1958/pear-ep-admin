<template>
  <div class="bg-white p-4">
    <el-button type="primary" @click="test">测试</el-button>
  </div>
</template>

<script setup lang="ts">
import { copyText } from '@/utils'

function test() {
  copyText('2121wwwww12oooooooooww21')
  // ElMessage.success('复制成功222')
}
</script>

<style lang="scss" scoped></style>
