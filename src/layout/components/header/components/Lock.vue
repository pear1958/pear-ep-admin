<template>
  <div>
    <div class="header-icon" @click="dialogVisible = true">
      <el-icon>
        <Lock />
      </el-icon>
    </div>

    <el-dialog v-model="dialogVisible" title="锁定屏幕" :width="600" draggable>
      <div class="flex flex-col items-center">
        <el-avatar :size="64" :src="avatarUrl">
          <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
        </el-avatar>

        <span class="text-[18px] mt-6">Admin</span>

        <div class="w-full mt-[26px]">
          <el-form ref="formRef" :model="formState" :rules="rules">
            <el-form-item label="锁屏密码" prop="password">
              <el-input
                v-model="formState.password"
                @keyup.enter.native="handleLock"
                placeholder="请输入锁屏密码"
                type="password"
                show-password
              />
            </el-form-item>
          </el-form>
        </div>

        <div class="w-full mt-3">
          <el-button type="primary" class="w-full" @click="handleLock">锁定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Lock } from '@element-plus/icons-vue'
import { useLockStore } from '@/store/modules/lock'
import avatarUrl from '@/assets/imgs/avatar.jpg'

defineOptions({
  name: 'Lock'
})

const router = useRouter()
const route = useRoute()

const lockStore = useLockStore()
const dialogVisible = ref(false)
const formRef = ref()

const formState = reactive({
  password: ''
})

const rules = reactive({
  password: [{ required: true, message: '请输入锁屏密码', trigger: ['change', 'blur'] }]
})

const handleLock = () => {
  unref(formRef).validate((valid: boolean) => {
    if (!valid) return
    lockStore.setLockInfo({ isLock: true, password: formState.password })
    dialogVisible.value = false
    router.push(`/lock?redirect=${route.fullPath}`)
  })
}
</script>
