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
          <slot name="title" v-if="slots.title" />
          <div v-else>{{ title }}</div>
        </div>

        <Iconify icon="close" class="close-icon" @click="close" />
      </div>

      <div class="body">
        <el-scrollbar>
          <div class="content-box">
            <slot />
          </div>
        </el-scrollbar>
      </div>

      <div class="footer">
        <slot name="footer" v-if="slots.footer" />

        <template v-else>
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </template>
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

const emit = defineEmits(['update:modelValue', 'beforeClose', 'close', 'confirm'])

const close = () => {
  emit('beforeClose')
  emit('update:modelValue', false)
  emit('close')
}

const cancel = () => {
  close()
}

const confirm = () => {
  close()
  emit('confirm')
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
      color: #72767b;
      cursor: pointer;
      transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        color: var(--el-color-primary);
      }
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
