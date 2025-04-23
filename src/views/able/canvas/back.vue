<template>
  <div class="page-box">
    <div class="canvas-box">
      <canvas id="canvasDiv" :width="500" :height="500" />
    </div>
    <div class="mt-3">
      <img :src="base64" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import rhinoImg from './rhino.jpg'

defineOptions({
  name: 'canvasPage'
})

const base64 = ref('https://mdn.github.io/shared-assets/images/examples/rhino.jpg')

onMounted(() => {
  draw()
})

function draw() {
  const canvas = document.getElementById('canvasDiv') as HTMLCanvasElement
  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingEnabled = true // 避免图片缩放以后变糊

  const img = new Image()
  img.src = rhinoImg // 300*227
  img.onload = () => {
    ctx.drawImage(img, 0, 0, 250, 250)
    // 1.裁剪圆形区域, 并导出成图片
    // 2.画布指定区域裁剪矩形, 并导出成图片
    ctx.save()
    ctx.restore()
  }
}
</script>

<style lang="scss" scoped>
.canvas-box {
  border: 1px solid black;
  display: inline-block;
}
</style>
