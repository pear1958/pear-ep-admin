<template>
  <div class="header-box">
    <div class="header-left">
      <Collapse />
      <Breadcrumb />
    </div>

    <div class="header-right">
      <!-- <Search /> -->
      <Fullscreen />
      <!-- <a-dropdown :trigger="['click']">
        <div class="user">
          <a-avatar :size="26" :src="avatar"></a-avatar>
          <span class="name">Admin</span>
        </div>
        <template #overlay>
          <a-menu @click="onClick">
            <a-menu-item key="0">
              <user-outlined />
              <span class="user-text">个人中心</span>
            </a-menu-item>
            <a-menu-item key="1">
              <poweroff-outlined />
              <span class="user-text">退出登录</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <setting-outlined @click="openSetDrawer" class="header-icon" /> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import Collapse from './components/Collapse.vue'
import Breadcrumb from './components/Breadcrumb.vue'
// import Search from './components/Search.vue'
// import LockScreen from './components/LockScreen.vue'
import Fullscreen from './components/Fullscreen.vue'
import emitter from '@/utils/mitt'
import { useUserStore } from '@/store/modules/user'
import { usePermissionStore } from '@/store/modules/permission'
import avatar from '@/assets/imgs/avatar.jpg'

const openSetDrawer = () => {
  emitter.emit('openSetDrawer')
}

const router = useRouter()

function onClick(data) {
  switch (data.key) {
    case '0':
      // router.push('/userCenter/index')
      break

    case '1':
      // localStorage.removeItem('token')
      localStorage.clear()
      usePermissionStore().$reset()
      useUserStore().$reset()
      router.push('/login')
      break
  }
}
</script>

<style lang="scss" scoped>
.header-box {
  @include flex(space-between);
  height: 100%;

  .header-left {
    @include flex(flex-start);
  }

  .header-right {
    @include flex();
  }
}

.user {
  padding: 0 8px;
  cursor: pointer;
  @include flex();

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
