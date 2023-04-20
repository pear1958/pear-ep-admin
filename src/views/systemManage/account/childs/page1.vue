<template>
  <div>
    <el-button @click="goNav">点击跳转到子页面Outer</el-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goNav = () => {
  router.push({
    path: '/systemManage/account/pageOuter',
    query: {
      name: 'outer',
      number: 77
    }
  })
}
</script>

<style lang="scss" scoped></style>
