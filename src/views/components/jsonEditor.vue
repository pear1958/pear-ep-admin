<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <span>JSON编辑器</span>
      </template>

      <div>
        <vue-json-pretty
          v-model:data="state.data"
          :deep="3"
          :show-length="true"
          :show-double-quotes="true"
          :show-line="true"
          :show-icon="true"
          :show-line-number="true"
          :editable="true"
          editable-trigger="click"
        />
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

defineOptions({
  name: 'JsonEditor'
})

const defaultData = {
  status: 200,
  text: '',
  error: null,
  config: undefined,
  data: [
    {
      news_id: 51184,
      title: 'iPhone X Review: Innovative future with real black technology',
      source: 'Netease phone'
    },
    {
      news_id: 51183,
      title: 'Traffic paradise: How to design streets for people and unmanned vehicles in the future?',
      source: 'Netease smart',
      link: 'http://netease.smart/traffic-paradise/1235'
    },
    {
      news_id: 51182,
      title: "Teslamask's American Business Relations: The government does not pay billions to build factories",
      source: 'AI Finance',
      members: ['Daniel', 'Mike', 'John']
    }
  ]
}

const state = reactive({
  data: defaultData
})
</script>

<style lang="scss" scoped></style>
