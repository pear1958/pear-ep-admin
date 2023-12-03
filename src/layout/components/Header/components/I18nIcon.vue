<template>
  <el-dropdown @command="changeLanguage">
    <div class="header-icon">
      <globalization />
    </div>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in languageList"
          :key="item.value"
          :command="item.value"
          :disabled="language === item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { useSystemStore } from '@/store/modules/system'
import { LanguageType } from '@/store/types'
import globalization from '@/assets/svg/globalization.svg?component'

const i18n = useI18n()
const systemStore = useSystemStore()
const language = computed(() => systemStore.language)

const languageList = [
  { label: '简体中文', value: 'zh' },
  { label: 'English', value: 'en' }
]

const changeLanguage = (lang: string) => {
  i18n.locale.value = lang
  systemStore.setSystemState('language', lang as LanguageType)
}
</script>

<style lang="scss" scoped>
// 修复El-Plus的黑色边框Bug
.header-icon {
  outline: none;
}
</style>
