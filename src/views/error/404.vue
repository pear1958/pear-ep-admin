<template>
  <div class="h-full flex-c">
    <NoExistImg />

    <div class="flex flex-col ml-[120px] text-base-color">
      <h2 class="text-[26px]">404</h2>
      <h4 class="mt-[25px] mb-5">抱歉, 你访问的页面不存在。</h4>
      <el-button type="primary" @click="$router.push('/home')">返回首页</el-button>
    </div>
  </div>
</template>

<script setup>
import NoExistImg from '@/assets/imgs/404.svg?component'

defineOptions({
  name: 'Error404'
})
</script>
