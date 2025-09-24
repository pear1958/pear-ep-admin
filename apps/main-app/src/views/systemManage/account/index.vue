<template>
  <div class="page-box">
    <div>账号管理</div>
    <div class="mt-4">
      <el-button @click="goNav1">点击跳转到子页面1</el-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineOptions({
  name: 'systemManageAccount'
})

const router = useRouter()

const goNav1 = () => {
  router.push({
    path: '/systemManage/account/page1',
    query: {
      name: 'page1',
      number: 22
    }
  })
}
</script>

<style lang="scss" scoped></style>
