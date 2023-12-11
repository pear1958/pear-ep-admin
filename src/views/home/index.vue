<template>
  <div class="bg-white dark:bg-dark p-4">
    <div>国际化演示</div>
    <el-table mb-1 :data="[]" />
    <el-pagination :total="100" class="mt-15" />

    <el-button type="primary" class="mt-4" v-debounce="handleClick">测试</el-button>
  </div>
</template>

<script setup lang="ts">
const handleClick = () => {
  console.log('test-test')
}
</script>

<style lang="scss" scoped></style>
