<template>
  <div class="h-full flex-c">
    <NoAuthImg />

    <div class="desc">
      <h2>403</h2>
      <h4>抱歉, 你无权访问该页面</h4>
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

<style lang="scss" scoped>
.desc {
  display: flex;
  flex-direction: column;
  margin-left: 120px;
  color: var(--el-text-color-primary);

  h2 {
    font-size: 26px;
  }

  h4 {
    margin: 25px 0 20px;
    font-size: 14px;
  }

  .el-btn {
    width: 100px;
  }
}
</style>
