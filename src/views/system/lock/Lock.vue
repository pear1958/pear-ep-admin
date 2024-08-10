<template>
  <div class="w-screen h-screen flex flex-col justify-center bg-black text-white select-none">
    <div class="cursor-pointer flex-c-col pt-5" @click="showLockForm = true">
      <Iconify icon="ant-design:lock-outlined" class="text-base" />
      <span class="xl:text-xl">点击解锁</span>
    </div>

    <div class="flex-1 flex-c gap-[80px] py-8">
      <div
        class="flex-c w-2/5 h-full font-bold text-[#bababa] rounded-[30px] bg-[#141313] relative"
      >
        <span
          class="text-[44px] sm:text-[90px] md:text-[160px] lg:text-[220px] xl:text-[260px] 2xl:text-[320px]"
        >
          {{ hour }}
        </span>

        <span class="absolute left-5 top-5 text-base">
          {{ meridiem }}
        </span>
      </div>

      <div class="flex-c w-2/5 h-full font-bold text-[#bababa] rounded-[30px] bg-[#141313]">
        <span
          class="text-[44px] sm:text-[90px] md:text-[160px] lg:text-[220px] xl:text-[260px] 2xl:text-[320px]"
        >
          {{ minute }}
        </span>
      </div>
    </div>

    <div class="text-center text-gray-300 pb-5">
      <div class="text-2xl">{{ year }}/{{ month }}/{{ day }} {{ week }}</div>
    </div>

    <transition name="fade-slide">
      <div class="entry fixed-lt flex-c w-screen h-screen overflow-hidden" v-show="showLockForm">
        <div class="w-[260px] flex-c-col overflow-hidden">
          <el-avatar :size="70" :src="avatarUrl">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
          </el-avatar>

          <span class="text-[18px] text-gray-300 mt-2 font-medium">Admin</span>

          <el-input
            v-model="password"
            placeholder="请输入锁屏密码或用户密码"
            type="password"
            class="mt-4"
            @keyup.enter.native="unLock"
            show-password
          />

          <div class="mt-3 flex-between w-full">
            <LinkButton color="#d1d5db" @click="back">返回</LinkButton>
            <LinkButton color="#d1d5db" @click="goLogin">返回登录</LinkButton>
            <div class="flex-c text-white">
              <el-icon class="is-loading mr-1" v-if="loading">
                <Loading />
              </el-icon>
              <LinkButton color="#d1d5db" @click="unLock">进入系统</LinkButton>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Loading } from '@element-plus/icons-vue'
import { useLockStore } from '@/store/modules/lock'
import { useUserStore } from '@/store/modules/user'
import { useNow } from './useNow'
import avatarUrl from '@/assets/imgs/avatar.jpg'

defineOptions({
  name: 'Lock'
})

const { year, month, day, hour, minute, week, meridiem } = useNow()

const route = useRoute()
const router = useRouter()
const lockStore = useLockStore()
const userStore = useUserStore()

const showLockForm = ref(false)
const password = ref('')
const loading = ref(false)

const back = () => {
  if (loading.value) return
  password.value = ''
  showLockForm.value = false
}

const goLogin = () => {
  if (loading.value) return
  lockStore.resetLockInfo()
  userStore.logout()
}

const unLock = async () => {
  if (!password.value) {
    return ElMessage.warning('请输入锁屏密码或用户密码')
  }

  try {
    loading.value = true

    const res = await lockStore.unLock(password.value)

    if (!res) {
      return ElMessage.error({
        message: '密码错误',
        grouping: true
      })
    }

    let redirect = '/'

    if (route.query?.redirect) {
      const index = route.fullPath.indexOf('redirect')
      const str = route.fullPath.slice(index)
      redirect = str.replace('redirect=', '')
    }

    router.replace(redirect)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.entry {
  background-color: rgb(0 0 0 / 50%);
  backdrop-filter: blur(8px);
}
</style>
