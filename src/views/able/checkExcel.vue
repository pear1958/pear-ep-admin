<template>
  <vue-office-excel :src="excelUrl" style="height: 100vh" @rendered="rendered" />
</template>

<script setup lang="ts">
import VueOfficeExcel from '@vue-office/excel'
import '@vue-office/excel/lib/index.css'

defineOptions({
  name: 'checkExcel'
})

// const excelUrl = 'http://static.shanhuxueyuan.com/demo/excel.xlsx'

const excelUrl = localStorage.getItem('excelUrl')

const rendered = () => {
  console.log('渲染完成')
}
</script>
