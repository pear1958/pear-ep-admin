<template>
  <el-config-provider :locale="locale" :size="componentSize">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { getBrowserLang } from 'pear-common-utils'
import useSystemStore from '@/store/modules/system'
import { LanguageType } from '@/store/types'

const systemStore = useSystemStore()
const i18n = useI18n()

onMounted(() => {
  const lang: LanguageType = systemStore.language ?? getBrowserLang()
  // 初始化语言
  i18n.locale.value = lang
  // 首次加载可能为null, 因此需要设置
  systemStore.setState('language', lang)
})

// 设置 element-plus 的语言
const locale = computed(() => {
  if (['zh', null].includes(systemStore.language)) return zhCn
  if (systemStore.language == 'en') return en
})

const componentSize = computed(() => systemStore.componentSize)
</script>
