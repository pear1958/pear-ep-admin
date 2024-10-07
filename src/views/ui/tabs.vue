<template>
  <div class="bg-white dark:bg-dark p-4">
    <Tabs v-model:selected="title">
      <TabItem title="体育新闻">体育新闻-xxxxxxxxx</TabItem>
      <TabItem title="财经新闻">财经新闻-yyyyyyyyy</TabItem>
      <TabItem title="普通新闻">普通新闻-zzzzzzzzz</TabItem>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Tabs, TabItem } from 'pear-view-ui'

const title = ref('体育新闻')

defineOptions({
  name: 'Tabs'
})
</script>

<style lang="scss" scoped></style>
