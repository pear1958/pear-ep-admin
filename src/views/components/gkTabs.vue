<template>
  <div class="bg-white dark:bg-dark p-4">
    <GkTabs v-model:selected="title">
      <GkTabItem title="体育新闻">体育新闻-xxxxxxxxx</GkTabItem>
      <GkTabItem title="财经新闻">财经新闻-yyyyyyyyy</GkTabItem>
      <GkTabItem title="普通新闻">普通新闻-zzzzzzzzz</GkTabItem>
    </GkTabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import GkTabs from '@/components/Common/GkTabs/index.vue'
import GkTabItem from '@/components/Common/GkTabs/TabItem'

const title = ref('体育新闻')
</script>

<style lang="scss" scoped></style>
