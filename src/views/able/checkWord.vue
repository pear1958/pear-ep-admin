<template>
  <vue-office-docx :src="wordUrl" @rendered="rendered" />
</template>

<script setup lang="ts">
import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'

defineOptions({
  name: 'checkWord'
})

const wordUrl = 'http://static.shanhuxueyuan.com/test6.docx'

const rendered = () => {
  console.log('渲染完成')
}
</script>
