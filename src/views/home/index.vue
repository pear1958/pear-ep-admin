<template>
  <div>
    <choose-area @change="onChange" />

    <div style="margin: 20px 0">
      <Progress isAnimate :percentage="60" />
      <br />
      <Progress isAnimate status="success" :stroke-width="20" :percentage="60" />
      <br />
      <Progress :time="5000" type="circle" isAnimate :percentage="60" />
    </div>

    <div>
      <div class="my-4">国际化测试</div>
      <el-table mb-1 :data="[]" />
      <el-pagination :total="100" class="mt-15" />
    </div>

    <div class="mt-4">
      <Tabs v-model:selected="title">
        <tab-item title="体育新闻">体育新闻-xxxxxxxxx</tab-item>
        <tab-item title="财经新闻">财经新闻-yyyyyyyyy</tab-item>
        <tab-item title="普通新闻">普通新闻-zzzzzzzzz</tab-item>
      </Tabs>
    </div>

    <div class="mt-4">
      <el-button type="primary" @click="toggle">打开对话框</el-button>

      <Dialog v-model:visible="visible" title="测试标题" :handleOk="handleOk" :cancel="cancel">
        <template v-slot:content>
          <p>第一行</p>
          <p>第二行</p>
        </template>
      </Dialog>
    </div>

    <div class="mt-4">
      <el-button type="primary" @click="showDialog">函数式调用对话框</el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="Home">
import { ChooseArea, Progress, Tabs, TabItem, Dialog, openDialog } from '@/components'

const title = ref('体育新闻')

function onChange(params: any) {
  console.log('params', params)
}

// --------- dialog --------------

const visible = ref(false)

const toggle = () => {
  visible.value = true
}

const handleOk = () => {
  console.log('确认')
  return true
}

const cancel = () => {
  console.log('取消')
}

const showDialog = () => {
  openDialog({
    title: '标题',
    content: '这里是内容',
    visible: true,
    handleOk: () => {
      console.log('确认')
    },
    cancel: () => {
      console.log('取消')
    }
  })
}

// -------------------------------
</script>

<style lang="scss" scoped></style>
