<template>
  <div class="h-full flex-between">
    <div class="flex items-center">
      <Collapse />
      <Breadcrumb />
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
              <Iconify icon="user-outlined" />
              <span class="ml-[5px]">个人中心</span>
            </el-dropdown-item>

            <el-dropdown-item command="1">
              <Iconify icon="poweroff-outlined" />
              <span class="ml-[5px]">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <div class="header-icon flex-c text-base">
        <Iconify icon="setting" @click="openSetDrawer" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
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
import avatarUrl from '@/assets/imgs/avatar.jpg'

const openSetDrawer = () => {
  emitter.emit('openSetDrawer')
}

function onClick(key: string) {
  switch (key) {
    case '0':
      // router.push('/userCenter/index')
      ElMessage.info('开发中...')
      break

    case '1':
      useUserStore().logout()
      break
  }
}
</script>
