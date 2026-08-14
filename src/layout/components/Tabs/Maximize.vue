<template>
  <div class="max-close-icon" @click="exitMaximize">
    <Icon icon="close" />
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import useSystemStore from '@/store/modules/system'

const systemStore = useSystemStore()

if (systemStore.mainMaximize) {
  changeClass('add')
}

const exitMaximize = () => {
  systemStore.setState('mainMaximize', false)
  changeClass('remove')
}

function changeClass(method: 'add' | 'remove') {
  const app = document.getElementById('app') as HTMLDivElement
  app.classList[method]('main-maximize')
}
</script>

<style lang="scss">
// 当前页面最大化 css
.main-maximize {
  .sider,
  .header,
  .tabs-box,
  .footer {
    display: none !important;
  }

  // Main主体部分
  .right-layout,
  .tabs-main {
    > .main {
      min-height: calc(100vh - 32px);
    }
  }
}
</style>

<style lang="scss" scoped>
.max-close-icon {
  position: fixed;
  top: -25px;
  right: -25px;
  z-index: 999;
  width: 52px;
  height: 52px;
  cursor: pointer;
  background-color: #909399;
  border-radius: 50%;
  opacity: 0.7;

  &:hover {
    background-color: #73767a;
  }

  :deep(.iconify) {
    position: relative;
    top: 68%;
    left: 32%;
    font-size: 16px;
    color: #ffffff;
    transform: translate(-50%, -50%);
  }
}
</style>
