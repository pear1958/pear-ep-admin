<template>
  <div class="collapse-box">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { NameType, collapseContextKey } from './types'

defineOptions({
  name: 'Collapse'
})

const props = defineProps({
  modelValue: {
    type: Array as PropType<NameType[]>,
    required: true
  },
  accordion: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits<{
  (e: 'update:modelValue', values: NameType[]): void
  (e: 'change', values: NameType[]): void
}>()

const activeNames = ref<NameType[]>(props.modelValue)

watch(
  () => props.modelValue,
  () => {
    activeNames.value = props.modelValue
  }
)

if (props.accordion && activeNames.value.length > 1) {
  console.warn('accordion mode should only have one acitve item')
}

const handleItemClick = (item: NameType) => {
  let _activeNames = [...activeNames.value]

  if (props.accordion) {
    // 点击的是当前项 ? 关闭 : 打开
    _activeNames = [activeNames.value[0] === item ? '' : item]
    activeNames.value = _activeNames
  } else {
    const index = _activeNames.indexOf(item)

    if (index > -1) {
      // 存在，删除数组对应的一项
      _activeNames.splice(index, 1)
    } else {
      // 不存在，插入对应的name
      _activeNames.push(item)
    }

    activeNames.value = _activeNames
  }

  emits('update:modelValue', _activeNames)

  emits('change', _activeNames)
}

provide(collapseContextKey, {
  activeNames,
  handleItemClick
})
</script>

<style lang="scss" scoped>
.collapse-box {
  border-top: 1px solid #e4e7ed;
  border-bottom: 1px solid #e4e7ed;
}
</style>
