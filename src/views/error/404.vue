<template>
  <div class="page-box-404 flex-center">
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
.page-box-404 {
  width: 100%;
  // height: 100%;
  height: calc(100vh - 48px - 42px - 40px);

  .desc {
    display: flex;
    flex-direction: column;
    margin-left: 120px;

    h2 {
      font-size: 26px;
      color: rgba(0, 0, 0, 0.85);
    }

    h4 {
      margin: 25px 0 20px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
    }

    .el-btn {
      width: 100px;
    }
  }
}
</style>
