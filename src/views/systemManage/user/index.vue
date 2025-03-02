<template>
  <div>
    <el-button @click="handleLogin">测试登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { getAllUser, login } from '@/api/modules/user'

defineOptions({
  name: 'User'
})

// getUserList()

async function getUserList() {
  const res = await getAllUser()
  console.log('请求结果', res)
}

async function handleLogin() {
  const res = await login({
    username: 'admin',
    password: '123456'
  })
  console.log('登录结果', res)
}
</script>

<style lang="scss" scoped></style>
