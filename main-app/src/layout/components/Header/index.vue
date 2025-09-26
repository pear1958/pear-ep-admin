<template>
  <div class="header flex-between">
    <div class="flex items-center">
      <Collapse v-if="showCollapse" />
      <!-- <Breadcrumb v-if="showBreadcrumb" /> -->
    </div>

    <div class="flex-c pr-1.5">
      <Search />
      <ComponentSize />
      <Fullscreen />
      <DarkIcon />
      <Lock />
      <I18nIcon />

      <el-dropdown @command="onClick">
        <div class="pl-[8px] pr-[14px] cursor-pointer flex-c outline-none">
          <el-avatar :size="26" :src="avatarUrl"></el-avatar>
          <span class="pl-[5px] inline-block max-w-[100px] ellipsis">Admin</span>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="0">
              <Icon icon="user-outlined" />
              <span class="ml-[5px]">个人中心</span>
            </el-dropdown-item>

            <el-dropdown-item command="1">
              <Icon icon="poweroff-outlined" />
              <span class="ml-[5px]">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <div class="header-icon flex-c text-base">
        <Icon icon="setting" @click="openSetDrawer" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import { Icon } from '@iconify/vue'
import Collapse from './components/Collapse.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import Search from './components/Search.vue'
import ComponentSize from './components/ComponentSize.vue'
import Fullscreen from './components/Fullscreen.vue'
import DarkIcon from './components/DarkIcon.vue'
import Lock from './components/Lock.vue'
import I18nIcon from './components/I18nIcon.vue'
import emitter from '@/utils/mitt'
import useUserStore from '@/store/modules/user'
import useSystemStore from '@/store/modules/system'
import avatarUrl from '@/assets/imgs/avatar.jpg'
import { confirmModal } from '@/utils/element'

const systemStore = useSystemStore()

const { showBreadcrumb, layout } = storeToRefs(systemStore)

const showCollapse = computed(() => layout.value !== 'classic')

const openSetDrawer = () => {
  emitter.emit('openSetDrawer')
}

const onClick = async (key: string) => {
  switch (key) {
    case '0':
      // router.push('/userCenter/index')
      ElMessage.info('开发中...')
      break

    case '1':
      await confirmModal('确认退出？')
      useUserStore().logout()
      break
  }
}
</script>

<style lang="scss" scoped>
.header {
  background-color: #ffffff;
  height: $headerHeight;
  padding: 0;
}
</style>
