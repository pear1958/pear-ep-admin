<template>
  <div class="tabs">
    <div class="tabs-nav" ref="navRef">
      <div
        class="tabs-nav-item"
        v-for="(title, index) in titleList"
        :key="index"
        :ref="
          el => {
            if (title === selected) selectedItem = el
          }
        "
        :class="{ selected: title === selected }"
        @click="select(title)"
      >
        {{ title }}
      </div>

      <div class="tabs-indicator" ref="indiRef"></div>
    </div>
  </div>

  <div class="tabs-content">
    <!-- <transition name="fade" mode="out-in" appear> -->
    <div :key="current.props.title">
      <component :is="current" :key="current.props.title" />
    </div>
    <!-- </transition> -->
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, unref, useSlots, watchEffect } from 'vue'
import tabItem from './tabItem'

defineOptions({
  name: 'tabs'
})

const props = defineProps({
  selected: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:selected'])

const navRef = ref()
const selectedItem = ref()
const indiRef = ref()

onMounted(() => {
  watchEffect(
    () => {
      const { width, left: left1 } = unref(selectedItem).getBoundingClientRect()
      const { left: left2 } = unref(navRef).getBoundingClientRect()

      // 动态设置指示器的宽度, 使其和元素的宽度一致
      // unref(indiRef).style.width = width + 'px'

      const left = left1 - left2 + (width - 20) / 2
      unref(indiRef).style.left = left + 'px'
    },
    {
      // 解决异步
      flush: 'post' // 效果更新需要缓冲时间
    }
  )
})

const slots = useSlots() as any

//  tab-item节点 - 获取插槽内容
const defaults = slots.default()

// console.log('defaults', defaults)
// console.log('tabItem', tabItem)

defaults.forEach((slot: any) => {
  if (slot.type !== tabItem) {
    throw new Error('Tabs标签内只能包含 tabItem 标签')
  }
})

// 被选择的节点
const current = computed(() => {
  return defaults.filter((slot: any) => slot.props.title === props.selected)[0]
})

const titleList = defaults.map((slot: any) => slot.props.title)

const select = (newTitle: string) => {
  emit('update:selected', newTitle)
}
</script>

<style lang="scss" scoped>
.tabs {
  &-nav {
    display: flex;
    color: #4a4a4a;
    border-bottom: 1px solid #eee;
    position: relative;

    &-item {
      cursor: pointer;
      padding: 8px 16px;

      &.selected {
        color: #485fc7;
      }
    }
  }

  &-indicator {
    height: 2px;
    width: 20px;
    position: absolute;
    left: 0;
    bottom: -1px;
    background: #485fc7;
    transition: all 0.25s ease-in-out;
  }

  &-content {
    padding: 8px 0;
  }
}
</style>
