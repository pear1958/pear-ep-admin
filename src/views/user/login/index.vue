<template>
  <div class="login">
    <div class="login-form">
      <h2 class="title">{{ title }}</h2>

      <el-form :model="formState" :rules="rules">
        <el-form-item prop="username">
          <el-input
            v-model="formState.username"
            :prefix-icon="User"
            placeholder="账号"
            size="large"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="formState.password"
            :prefix-icon="Lock"
            placeholder="密码"
            size="large"
            show-password
          />
        </el-form-item>

        <el-form-item prop="verifyCode">
          <div class="w-full flex-c gap-3">
            <div class="flex-1">
              <el-input
                v-model="formState.verifyCode"
                :prefix-icon="Aim"
                placeholder="验证码"
                size="large"
              />
            </div>

            <div @click="getCaptcha" class="code-img">
              <img :src="captchaUrl" class="size-full" v-if="captchaUrl" />
            </div>
          </div>
        </el-form-item>

        <el-form-item prop="remember" class="reme-item">
          <el-checkbox v-model="formState.remember">记住我</el-checkbox>
          <el-button type="primary" link>忘记密码?</el-button>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            :loading="loading"
            style="width: 100%"
            size="large"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="copyright-wrap">
      <p class="en">copyright@2025 ep-admin All Rights Reserved</p>
      <p class="cn">{{ title }} 版权所有</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { FormRules } from 'element-plus'
import { User, Lock, Aim } from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/user'
import { getLoginCode } from '@/api/modules/auth'
import { title } from '@/utils'

const router = useRouter()

const formState = reactive({
  username: 'Admin',
  password: 'a123456',
  remember: true,
  verifyCode: '',
  captchaId: null
})

const loading = ref(false)
const captchaUrl = ref('')

const rules = reactive<FormRules>({
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }],
  remember: [{ required: false }],
  verifyCode: [{ required: true, message: '请输入验证码' }]
})

const getCaptcha = async () => {
  const { data } = await getLoginCode({ width: 100, height: 38 })
  formState.captchaId = data.id
  captchaUrl.value = data.img
}

getCaptcha()

const handleLogin = async () => {
  loading.value = true
  try {
    const params = { ...formState }
    delete params.remember
    await useUserStore().login(params)
    if (formState.remember) {
      // xxxxxxxxxx
    }
    router.replace('/home')
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
