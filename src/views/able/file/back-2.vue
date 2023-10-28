<template>
  <div>
    <div>File</div>
    <vk-button>我是 VkButton</vk-button>

    <vk-upload
      action="/dev-api/sourceData/document/uploadFile"
      :headers="{
        'Smart-Front-Authorization': '3ced7511129c4c2b801cdb8e6721acf3'
      }"
      :before-upload="beforeUpload"
      :on-change="onFileChange"
      multiple
    >
      <vk-button type="primary">点击上传</vk-button>
    </vk-upload>

    <vk-upload
      action="/dev-api/sourceData/document/uploadFile"
      :headers="{
        'Smart-Front-Authorization': '3ced7511129c4c2b801cdb8e6721acf3'
      }"
      :before-upload="beforeUpload"
      :on-change="onFileChange"
      multiple
      drag
    >
      <div>
        <el-icon :size="25">
          <UploadFilled />
        </el-icon>

        <br />

        <p style="margin: 0; margin-top: 8px">点击或者拖动到此区域进行上传</p>
      </div>
    </vk-upload>

    <div style="width: 400px">
      <VkCollapse v-model="openedValue">
        <VkCollapseItem name="a" title="Title A">
          <h1>headline title</h1>
          <div>this is content a aaa</div>
          <div>this is content a aaa</div>
          <div>this is content a aaa</div>
        </VkCollapseItem>

        <VkCollapseItem name="b" title="Title B">
          <div>this is bbbbb test</div>
          <div>this is bbbbb test</div>
          <div>this is bbbbb test</div>
          <div>this is bbbbb test</div>
        </VkCollapseItem>

        <VkCollapseItem name="c" title="Disabled Title" disabled>
          <div>this is cccc test</div>
        </VkCollapseItem>
      </VkCollapse>
    </div>

    <div class="mt-15">
      <VkIcon icon="arrow-up" size="3x" type="danger" color="#0e7a0d" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { createMessage } from '@zhangzy56/vue-ele'

// import { Button, Upload } from '@zhangzy56/vue-ele'

const beforeUpload = (file: File) => {
  const size = file.size / 1024

  console.log('beforeUpload-file-size', size)

  if (size > 12000) {
    console.log('file-to-big 超过了12M')
    return false
  }

  return true
}

const onFileChange = (file: any) => {
  console.log('onFileChange', file.size / 1024)
}

const openedValue = ref(['a'])

onMounted(() => {
  createMessage({
    message: 'hello world -----',
    duration: 0,
    showClose: true
  })

  createMessage({
    message: 'hello world again111',
    duration: 0,
    type: 'success',
    showClose: true
  })

  createMessage({
    message: 'hello world again222',
    duration: 0,
    type: 'warning',
    showClose: true
  })

  createMessage({
    message: 'hello world again333',
    duration: 0,
    type: 'danger',
    showClose: true
  })
})
</script>

<style lang="scss" scoped></style>
