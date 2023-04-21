<template>
  <el-drawer v-model="showDrawer" title="项目设置" modal-class="setting-drawer">
    <el-divider>暗黑模式</el-divider>

    <div class="flex-center">
      <dark-icon />
    </div>

    <el-divider>其它功能</el-divider>

    <div class="theme-item">
      <span>主题颜色</span>
      <el-color-picker v-model="themeColor" />
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import DarkIcon from '@/components/DarkIcon/index.vue'
import emitter from '@/utils/mitt'
import { useTheme } from '@/hooks/useTheme'
import { useSystemStore } from '@/store/modules/system'

const showDrawer = ref(false)
const themeColor = ref(useSystemStore().themeColor)

watch(themeColor, newVal => {
  useTheme().changeTheme(newVal)
})

emitter.on('openSetDrawer', () => {
  showDrawer.value = true
})
</script>

<style lang="scss" scoped>
.theme-item {
  @include flex(space-between);
  margin: 14px 0;

  span {
    font-size: 14px;
  }
}
</style>

<style lang="scss">
.setting-drawer {
  .el-drawer__header {
    margin-bottom: 22px;
  }
  .el-drawer__body {
    padding-top: 5px;
    border-top: 1px solid #f0f0f0;
  }
}
</style>
