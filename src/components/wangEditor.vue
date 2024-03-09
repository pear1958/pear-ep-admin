<template>
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
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, shallowRef, unref, watch, watchEffect } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'

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
const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

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
