<template>
  <el-badge :value="props.modelValue">
    <el-button @click="updateData">{{ props.text }}</el-button>
  </el-badge>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  text: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const updateData = () => {
  const num = props.modelValue + 1
  emit('update:modelValue', num)
}
</script>

<style lang="scss" scoped></style>
