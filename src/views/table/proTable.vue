<template>
  <div>
    <com-table :columns="columns" :apiFn="getCompositionList" ref="tableRef"> </com-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, unref } from 'vue'
import comTable from '@/components/comTable.vue'
import { columns } from './columns'
import { getCompositionList } from '@/api/modules/user'

const tableRef = ref()

const params = reactive({
  current: 1,
  size: 10
})

function initTable() {
  params.current = 1
  unref(tableRef).getList(params)
}

onMounted(() => {
  initTable()
})
</script>
