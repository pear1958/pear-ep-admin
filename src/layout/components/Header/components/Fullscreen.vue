<template>
  <div class="header-icon" @click="toggle">
    <el-icon>
      <FullScreen v-if="!isFullscreen" />
      <div v-else>退出</div>
    </el-icon>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isFullscreen = ref(false)

function toggle() {
  // 判断是否是全屏  fullScreenElement: 是否是全屏状态  ie:ms
  if (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  ) {
    // 退出全屏
    if (document.cancelFullScreen) {
      document.cancelFullScreen()
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msCancelFullScreen) {
      document.msCancelFullScreen()
    }

    isFullscreen.value = false
  } else {
    // 全屏
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
  }
}
</script>
