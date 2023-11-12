<template>
  <Teleport to="body">
    <Transition name="fade">
      <div class="dialog-mask" @click="clickMask" v-show="visible"></div>
    </Transition>

    <Transition :name="!alignCenter ? 'dialog' : 'dialog-y'">
      <div class="dialog" :style="styles" v-bind="$attrs" v-if="visible">
        <header>
          <slot name="title" v-if="slots.title" />

          <span class="title" v-else>{{ title }}</span>

          <span class="close-icon" @click="closeDialog">
            <i-ep-close />
          </span>
        </header>

        <main>
          <slot name="content" />
        </main>

        <footer>
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="handleOk">确认</el-button>
        </footer>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'Dialog'
})

const emit = defineEmits(['update:visible'])

const slots = useSlots()

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  closeOnClickMask: {
    type: Boolean,
    default: true
  },
  alignCenter: {
    type: Boolean,
    default: false
  },
  width: {
    type: [String, Number],
    default: 800
  },
  top: {
    type: [String, Number],
    default: 130
  },
  handleOk: {
    type: Function
  },
  cancel: {
    type: Function
  }
})

const styles = computed(() => ({
  minWidth: props.width + 'px',
  top: props.top + 'px',
  ...(props.alignCenter ? { top: '50%', transform: 'translate(-50%, -50%)' } : {})
}))

const closeDialog = () => {
  emit('update:visible', false)
}

const clickMask = () => {
  if (props.closeOnClickMask) {
    closeDialog()
  }
}

const cancel = () => {
  props.cancel && props.cancel()
  closeDialog()
}

const handleOk = () => {
  props.handleOk && props.handleOk()
  closeDialog()
}
</script>

<style lang="scss" scoped>
.dialog-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: fade_out(black, 0.5);
  z-index: 30;
}

.dialog {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 31;
  background: white;
  border-radius: 4px;
  box-shadow: 0 0 3px fade_out(black, 0.5);

  > header {
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;

    .title {
      font-size: 18px;
      color: #303133;
    }

    .close-icon {
      font-size: 16px;
      color: #000000;
      transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;

      &:hover {
        color: var(--el-color-primary);
      }
    }
  }

  > main {
    padding: 12px 16px;
  }

  > footer {
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
