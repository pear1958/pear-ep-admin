<template>
  <div class="bg-white dark:bg-dark p-4">
    <tabs v-model:selected="title">
      <tab-item title="体育新闻">体育新闻-xxxxxxxxx</tab-item>
      <tab-item title="财经新闻">财经新闻-yyyyyyyyy</tab-item>
      <tab-item title="普通新闻">普通新闻-zzzzzzzzz</tab-item>
    </tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import tabs from '@/components/tabs/tabs.vue'
import tabItem from '@/components/tabs/tabItem'

const title = ref('体育新闻')
</script>

<style lang="scss" scoped></style>
