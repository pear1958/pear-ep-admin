<template>
  <div class="h-full flex-c">
    <NoAuthImg />

    <div class="flex flex-col ml-[120px] text-base-color">
      <h2 class="text-[26px]">403</h2>
      <h4 class="mt-[25px] mb-5">抱歉, 你无权访问该页面</h4>
      <el-button type="primary" @click="$router.push('/home')">返回首页</el-button>
    </div>
  </div>
</template>

<script setup>
import NoAuthImg from '@/assets/imgs/403.svg?component'

defineOptions({
  name: 'Error403'
})
</script>
