<template>
  <div>
    <el-button type="primary" @click="test">测试</el-button>
    <el-button type="primary" @click="test2">测试2</el-button>
    <div v-for="item in 1000">哈哈哈</div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { getCompositionList } from '@/api/modules/user'

const params = {
  current: 1,
  size: 10
}

const test = async () => {
  const res = await getCompositionList(params)

  ElMessage.success('请求成功')

  console.log('res.data', res)

  // getCompositionList(params)
  //   .then(res => {
  //     console.log('weawea', res)
  //   })
  //   .catch(err => {
  //     console.log('err', err)
  //   })
}

const test2 = () => {
  ElMessageBox.alert('This is a message', 'Title', {
    confirmButtonText: 'OK'
  })
}
</script>

<style lang="scss" scoped></style>
