<template>
  <transition name="fade-bottom" mode="out-in">
    <Lock v-if="isLock" />
  </transition>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import Lock from './Lock.vue'
import { useLockStore } from '@/store/modules/lock'

const lockStore = useLockStore()

const isLock = computed(() => lockStore?.lockInfo?.isLock ?? false)
</script>
