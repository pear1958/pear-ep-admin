<template>
  <el-drawer v-model="showDrawer" title="项目设置" :size="380" class="setting-drawer">
    <div class="flex flex-col gap-[14px] box">
      <el-divider>主题设置</el-divider>

      <div>
        <span>主题颜色</span>
        <el-color-picker v-model="themeColor" :predefine="colorList" @change="changeTheme" />
      </div>

      <div>
        <span>灰色模式</span>
        <el-switch v-model="grayMode" @change="changeGrayOrWeak('gray', !!$event)" />
      </div>

      <div>
        <span>色弱模式</span>
        <el-switch v-model="weakMode" @change="changeGrayOrWeak('weak', !!$event)" />
      </div>

      <el-divider>界面设置</el-divider>

      <div>
        <span>菜单手风琴</span>
        <el-switch v-model="menuAccordion" />
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import emitter from '@/utils/mitt'
import { useTheme } from '@/hooks/useTheme'
import { useSystemStore } from '@/store/modules/system'

const systemStore = useSystemStore()
const { changeTheme, changeGrayOrWeak } = useTheme()

const showDrawer = ref(false)

const { themeColor, menuAccordion, grayMode, weakMode } = storeToRefs(systemStore)

const colorList = ref(['#1890ff', '#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#c71585'])

emitter.on('openSetDrawer', () => {
  showDrawer.value = true
})
</script>

<style lang="scss">
.setting-drawer {
  .el-drawer__body {
    padding-top: 24px;
  }

  .box > div:not(.el-divider) {
    @include flex(space-between);
  }

  .el-divider--horizontal {
    margin: 12px 0;
  }
}
</style>
