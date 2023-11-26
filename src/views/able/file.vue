<template>
  <div class="page-box mt-3 bg-white p-4">
    <Upload
      v-model:file-list="fileList"
      v-model:active-index="activeIndex"
      action="/dev-api/sourceData/document/uploadFile"
      :before-upload="beforeUpload"
      :on-change="onFileChange"
      multiple
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Upload } from '@/components'
import { UploadFile } from '@/components/Upload/types'

defineOptions({
  name: 'File'
})

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

<style lang="scss" scoped>
.page-box {
  width: 100%;
  height: 700px;
}
</style>
