<template>
  <Transition name="fade">
    <div class="mask" v-if="modelValue && showMask" @click="close()"></div>
  </Transition>

  <Transition name="drawer">
    <div
      class="drawer"
      :class="{ show: modelValue }"
      :style="{ width: width + 'px' }"
      v-bind="$attrs"
      v-if="modelValue"
    >
      <div class="header">
        <div class="title">
          <div v-if="!slots.title">{{ title }}</div>
          <slot name="title" v-else></slot>
        </div>

        <i-ep-close @click="close" class="close-icon" />
      </div>

      <div class="body">
        <el-scrollbar>
          <div class="content-box">
            <slot />
          </div>
        </el-scrollbar>
      </div>

      <div class="footer" v-if="slots.footer">
        <slot name="footer" />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  width: {
    type: Number,
    default: 422
  },
  title: {
    type: String,
    default: ''
  },
  showMask: {
    type: Boolean,
    default: true
  }
})

const slots = useSlots()

const emit = defineEmits(['update:modelValue', 'beforeClose'])

const close = () => {
  emit('beforeClose')
  emit('update:modelValue', false)
}
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0px;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.drawer {
  position: fixed;
  top: 0px;
  bottom: 0px;
  background: #ffffff;
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.12);
  z-index: 1300;
  right: 0;

  .header {
    height: 55px;
    padding: 0 15px;
    color: #72767b;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;

    .title {
      color: #000000d9;
      font-size: 16px;
    }

    .close-icon {
      font-size: 18px;
      cursor: pointer;
    }
  }

  .body {
    height: calc(100vh - 110px);

    .content-box {
      padding: 20px;
    }
  }

  .footer {
    height: 55px;
    padding: 0 16px;
    border-top: 1px solid #f0f0f0;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
