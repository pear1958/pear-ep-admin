<template>
  <div>
    <el-button type="primary" @click="test">测试</el-button>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'

const test = () => {
  setTimeout(() => {
    ElMessage.success('成功')
  }, 5000)
}
</script>

<style lang="scss" scoped></style>
