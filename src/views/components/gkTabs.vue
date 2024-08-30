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
import GkTabs from '@/components/UI/GkTabs/index.vue'
import GkTabItem from '@/components/UI/GkTabs/TabItem'

const title = ref('体育新闻')
</script>

<style lang="scss" scoped></style>
