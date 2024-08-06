<template>
  <div class="header-box">
    <div class="header-left">
      <Collapse />
      <Breadcrumb />
    </div>

    <div class="header-right">
      <Search />
      <Fullscreen />
      <I18nIcon />

      <el-dropdown @command="onClick">
        <div class="user">
          <el-avatar :size="26" :src="avatarUrl"></el-avatar>
          <span class="name">Admin</span>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="0">
              <Iconify icon="user-outlined" />
              <span class="user-text">个人中心</span>
            </el-dropdown-item>

            <el-dropdown-item command="1">
              <Iconify icon="poweroff-outlined" />
              <span class="user-text">退出登录</span>
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
import { useRouter } from 'vue-router'
import microApp from '@micro-zoe/micro-app'
import Collapse from './components/Collapse.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import Search from './components/Search.vue'
import Fullscreen from './components/Fullscreen.vue'
import I18nIcon from './components/I18nIcon.vue'
import emitter from '@/utils/mitt'
import { useUserStore } from '@/store/modules/user'
import { usePermissionStore } from '@/store/modules/permission'
import avatarUrl from '@/assets/imgs/avatar.jpg'

const openSetDrawer = () => {
  emitter.emit('openSetDrawer')
}

const router = useRouter()

function onClick(key: string) {
  switch (key) {
    case '0':
      // router.push('/userCenter/index')
      break

    case '1':
      localStorage.clear()
      usePermissionStore().$reset()
      useUserStore().$reset()
      microApp.clearGlobalData()
      router.push('/login')
      break
  }
}
</script>

<style lang="scss" scoped>
.header-box {
  height: 100%;
  @include flex(space-between);

  .header-left {
    @include flex(flex-start);
  }

  .header-right {
    @include flex();
  }
}

.user {
  padding: 0 8px;
  padding-right: 14px;
  cursor: pointer;
  @include flex();
  outline: none;

  .name {
    padding-left: 5px;
    display: inline-block;
    max-width: 100px;
    @include ellipsis();
  }
}
</style>

<style lang="scss">
.user-text {
  margin-left: 5px;
}

.header-icon {
  display: inline-flex;
  font-size: 16px;
  padding: 0 10px;
  cursor: pointer;
  transition: color 0.3s;
  color: #000;

  &:hover {
    color: var(--el-color-primary);
  }
}
</style>
