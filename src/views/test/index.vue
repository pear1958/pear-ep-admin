<template>
  <div class="bg-white dark:bg-dark p-4">
    <div v-for="item in 50" :key="item">{{ 'menuTest - ' + id }} - {{ item }}</div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const id = route.path.replace('/menu/menuTest', '')
</script>
