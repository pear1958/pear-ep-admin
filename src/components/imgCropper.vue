<template>
  <div class="w-[500px] h-[350px]">
    <img src="../assets/imgs/picture.jpg" ref="imgRef" class="img" />
  </div>
</template>

<script setup lang="ts">
import { ref, unref, onMounted, onUnmounted } from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { debounce } from '@/utils'

defineOptions({
  name: 'imgCropper'
})

const emit = defineEmits(['change', 'error'])

const imgRef = ref()
const cropper = ref<Cropper>()
const base64Url = ref()

onMounted(() => {
  initCropper()
})

const defaultOptions: Cropper.Options = {}

const initCropper = () => {
  if (!imgRef.value) return

  cropper.value = new Cropper(imgRef.value, {
    ...defaultOptions,
    crop() {
      debounceHandleCroped()
    },
    zoom() {
      debounceHandleCroped()
    },
    cropmove() {
      debounceHandleCroped()
    }
  })
}

const debounceHandleCroped = debounce(handleCroped, 80)

function handleCroped() {
  if (!cropper.value) return

  const canvas = unref(cropper).getCroppedCanvas()

  // https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toBlob
  canvas.toBlob(blob => {
    if (!blob) return

    const fileReader: FileReader = new FileReader()

    fileReader.readAsDataURL(blob)

    fileReader.onloadend = e => {
      if (!e.target?.result || !blob) return

      base64Url.value = e.target.result

      emit('change', {
        base64Url: e.target.result,
        blob,
        imgData: { size: blob.size, ...unref(cropper).getData() }
      })
    }

    fileReader.onerror = () => {
      emit('error')
    }
  })
}

onUnmounted(() => {
  unref(cropper)?.destroy()
  cropper.value = null
  base64Url.value = ''
})
</script>

<style lang="scss" scoped>
.img {
  display: block;
  max-width: 100%;
}
</style>
