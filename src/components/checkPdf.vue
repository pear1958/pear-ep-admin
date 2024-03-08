<template>
  <iframe :src="allUrl" frameborder="0" style="width: 100vw; height: 60vh"></iframe>
</template>

<script setup lang="ts">
let resource_url = 'https://cdn.jsdelivr.net/gh/mozilla/pdf.js@c6e8ca86/test/pdfs/calrgb.pdf' // 需要科学上网

const allUrl = '/static/html/pdfJs-old/web/viewer.html' + '?file=' + encodeURIComponent(resource_url)
</script>

<style lang="scss" scoped></style>
