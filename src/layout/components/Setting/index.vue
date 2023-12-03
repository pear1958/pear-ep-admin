<template>
  <el-drawer v-model="showDrawer" title="项目设置" modal-class="setting-drawer" :size="380">
    <el-divider>暗黑模式</el-divider>

    <div class="flex-c">
      <dark-icon />
    </div>

    <el-divider>其它功能</el-divider>

    <div class="theme-item">
      <span>主题颜色</span>
      <el-color-picker
        v-model="themeColor"
        :predefine="preDefineColors"
        @change="color => color && useTheme().changeTheme(color)"
      />
    </div>

    <div class="theme-item">
      <span>菜单手风琴</span>
      <el-switch
        v-model="menuAccordion"
        @change="bool => systemStore.setSystemState('menuAccordion', bool as boolean)"
      />
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DarkIcon from './DarkIcon.vue'
import emitter from '@/utils/mitt'
import { useTheme } from '@/hooks/useTheme'
import { useSystemStore } from '@/store/modules/system'

const systemStore = useSystemStore()

const showDrawer = ref(false)

// 不能使用 computed, warn: Write operation failed: computed value is readonly
const themeColor = ref(systemStore.themeColor)
const menuAccordion = ref(systemStore.menuAccordion)

const preDefineColors = ref(['#1890ff', '#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#c71585'])

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
