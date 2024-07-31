<template>
  <div
    class="dragger-box"
    :class="{ 'is-dragover': isOver }"
    @dragover="handleDrag($event, true)"
    @dragleave="handleDrag($event, false)"
    @drop="handleDrop"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue'

const isOver = ref(false)

const props = defineProps({
  onFile: {
    type: Function as PropType<(files: FileList) => void>,
    required: true
  }
})

const handleDrag = (e: DragEvent, isOverVal: boolean) => {
  e.preventDefault()
  isOver.value = isOverVal
}

const handleDrop = (e: DragEvent) => {
  // 取消复制图片打开新窗口
  e.preventDefault()
  isOver.value = false
  const files = e.dataTransfer?.files || []
  props.onFile(files as FileList)
}
</script>

<style lang="scss" scoped>
.dragger-box.is-dragover {
  border: 2px dashed #22a7f2;
}
</style>
