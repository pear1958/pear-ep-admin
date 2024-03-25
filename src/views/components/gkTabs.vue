<template>
  <div class="bg-white dark:bg-dark p-4">
    <gk-tabs v-model:selected="title">
      <gk-tab-item title="体育新闻">体育新闻-xxxxxxxxx</gk-tab-item>
      <gk-tab-item title="财经新闻">财经新闻-yyyyyyyyy</gk-tab-item>
      <gk-tab-item title="普通新闻">普通新闻-zzzzzzzzz</gk-tab-item>
    </gk-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import gkTabs from '@/components/gkTabs/tabs.vue'
import gkTabItem from '@/components/gkTabs/tabItem'

const title = ref('体育新闻')
</script>

<style lang="scss" scoped></style>
