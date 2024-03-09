<template>
  <el-card>
    <template #header>
      <span class="text-[16px]">wangEditor编辑器使用示例</span>
    </template>

    <div class="wang-editor">
      <Toolbar class="toolbar" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="html"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, shallowRef, unref, watch, watchEffect } from 'vue'
import { ElMessage } from 'element-plus'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import { InsertFnType } from '@/types/wangEditor'
import { uploadHeaders, uploadUrl } from '@/config'

defineOptions({
  name: 'wangEditor'
})

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const editorRef = shallowRef()

const html = ref('')
const mode = 'default'
const toolbarConfig = {
  excludeKeys: ['group-video']
}
const editorConfig = ref({
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      // 服务端上传地址，根据实际业务改写
      server: uploadUrl,
      timeout: 12 * 1000,
      // form-data 的 fieldName，根据实际业务改写
      fieldName: 'file',
      // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
      allowedFileTypes: [],
      // 自定义增加 http-header
      headers: {
        ...uploadHeaders
      },
      // 跨域是否传递 cookie ，默认为 false
      withCredentials: true,
      // 上传之前触发
      // onBeforeUpload(file: File) {
      //   return file
      // },
      // 自定义插入图片
      customInsert(res: any, insertFn: InsertFnType) {
        const { code, msg, data } = res || {}

        if (!String(code).startsWith('2')) {
          return ElMessage.error(msg || '上传失败')
        }

        const { url, origin: alt } = data || {}

        const href = url || 'https://www.baidu.com/' // 查看链接

        insertFn(url, alt, href)
      },
      onSuccess(file: File, res: any) {
        console.log('上传成功', res)
      },
      // 上传错误, timeout | 断网 | 500 等等
      onError(file: File, err: any) {
        ElMessage.error('上传失败')
        console.log('上传失败', err)
      }
    }
  }
})

const handleCreated = editor => {
  editorRef.value = editor
}

watch(
  () => props.modelValue,
  newVal => {
    html.value = newVal
  },
  {
    immediate: true
  }
)

watchEffect(() => {
  emit('update:modelValue', html.value)
  emit('change', html.value)
})

onBeforeUnmount(() => {
  unref(editorRef)?.destroy()
})
</script>

<style lang="scss" scoped>
.wang-editor {
  border: 1px solid #ccc;

  .toolbar {
    border-bottom: 1px solid #ccc;
  }
}
</style>
