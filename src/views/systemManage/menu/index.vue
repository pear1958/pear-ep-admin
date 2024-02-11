<template>
  <div>
    <div>
      <el-checkbox v-model="checked1" label="Option 1" size="large" />
      <el-checkbox v-model="checked2" label="Option 2" size="large" />
    </div>

    <el-button type="primary" @click="test">测试</el-button>
    <el-button type="primary" @click="test2">测试2</el-button>
    <div v-for="item in 1000">哈哈哈</div>

    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getCompositionList } from '@/api/modules/user'

const checked1 = ref(false)
const checked2 = ref(false)

const params = {
  current: 1,
  size: 10
}

defineOptions({
  name: 'systemManageMenu'
})

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
