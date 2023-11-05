<template>
  <div class="box">
    <div>File</div>

    <GeekUpload
      v-model:file-list="fileList"
      v-model:active-index="activeIndex"
      action="/dev-api/sourceData/document/uploadFile"
      :before-upload="beforeUpload"
      :on-change="onFileChange"
      multiple
      class="mt-20"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UploadFile } from 'v-geek-design/dist/types/components/Upload'
// import { GeekUpload } from 'v-geek-design'

const fileList = ref([])
const activeIndex = ref(0)

const beforeUpload = (file: File) => {
  const size = file.size / 1024

  // console.log('beforeUpload-file-size', size)

  if (size > 12000) {
    console.log('file-to-big 超过了12M')
    return false
  }

  return true
}

const onFileChange = (file: UploadFile) => {
  console.log('onFileChange-size', file.size! / 1024)
}
</script>

<style scoped>
.box {
  width: 800px;
  height: 400px;
  background-color: #fff;
  padding: 30px;
}
</style>
