<template>
  <div v-if="visible">
    <el-image-viewer
      :url-list="imgList"
      :initial-index="initIndex"
      teleported
      :onClose="() => emit('update:visible', false)"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType, watchEffect } from 'vue'
import { ElImageViewer } from 'element-plus'

defineOptions({
  name: 'imgViewer'
})

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  imgList: {
    type: Array as PropType<string[]>,
    default: []
  },
  initIndex: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:visible'])

// 如果页面有滚动条
watchEffect(() => {
  document.querySelector('body')!.style.overflow = props.visible ? 'hidden' : ''
})
</script>
