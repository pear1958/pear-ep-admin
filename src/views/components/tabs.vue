<template>
  <div class="bg-white dark:bg-dark p-4">
    <Tabs v-model:selected="title">
      <tab-item title="体育新闻">体育新闻-xxxxxxxxx</tab-item>
      <tab-item title="财经新闻">财经新闻-yyyyyyyyy</tab-item>
      <tab-item title="普通新闻">普通新闻-zzzzzzzzz</tab-item>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Tabs, TabItem } from '@/components'

defineOptions({
  name: 'TabsPage'
})

const title = ref('体育新闻')
</script>

<style lang="scss" scoped></style>
