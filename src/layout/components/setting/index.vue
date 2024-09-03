<template>
  <el-drawer v-model="showDrawer" title="项目设置" :size="290" class="setting-drawer">
    <div class="flex flex-col gap-[14px] box">
      <el-divider>布局模式</el-divider>

      <div class="layout-box">
        <el-tooltip effect="dark" content="纵向" placement="top" :show-after="200">
          <div
            :class="['layout-item layout-vertical', { 'is-active': layout == 'vertical' }]"
            @click="setLayout('vertical')"
          >
            <div class="layout-dark"></div>
            <div class="layout-container">
              <div class="layout-light"></div>
              <div class="layout-content"></div>
            </div>
            <el-icon v-if="layout == 'vertical'">
              <CircleCheckFilled />
            </el-icon>
          </div>
        </el-tooltip>

        <el-tooltip effect="dark" content="分栏" placement="top" :show-after="200">
          <div
            :class="['layout-item layout-columns', { 'is-active': layout == 'columns' }]"
            @click="setLayout('columns')"
          >
            <div class="layout-dark"></div>
            <div class="layout-light"></div>
            <div class="layout-content"></div>
            <el-icon v-if="layout == 'columns'">
              <CircleCheckFilled />
            </el-icon>
          </div>
        </el-tooltip>
      </div>

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

      <div>
        <span>切换loading</span>
        <el-switch v-model="enableMainLoading" />
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { CircleCheckFilled } from '@element-plus/icons-vue'
import emitter from '@/utils/mitt'
import { useTheme } from '@/hooks/useTheme'
import useSystemStore from '@/store/modules/system'
import { LayoutType } from '@/store/types'

const systemStore = useSystemStore()
const { changeTheme, changeGrayOrWeak } = useTheme()

const showDrawer = ref(false)

const { layout, themeColor, menuAccordion, grayMode, weakMode, enableMainLoading } =
  storeToRefs(systemStore)

const colorList = ref(['#1890ff', '#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#c71585'])

const setLayout = (val: LayoutType) => {
  systemStore.setState('layout', val)
  // setAsideTheme()
}

emitter.on('openSetDrawer', () => {
  showDrawer.value = true
})
</script>

<style lang="scss">
.setting-drawer {
  .el-drawer__body {
    padding-top: 24px;
  }

  .box > div:not(.el-divider, .layout-box) {
    @include flex(space-between);
  }

  .el-divider--horizontal {
    margin: 12px 0;
  }
}
</style>

<style lang="scss" scoped>
@import url('./index.scss');
</style>
