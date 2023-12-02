<template>
  <div class="main-full flex-c">
    <noExist />

    <div class="desc">
      <h2>404</h2>
      <h4>抱歉, 您访问的页面不存在。</h4>
      <el-button type="primary" @click="$router.push('/home')">返回首页</el-button>
    </div>
  </div>
</template>

<script setup>
import noExist from '@/assets/imgs/404.svg?component'
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
