<template>
  <template v-if="visible">
    <Teleport to="body">
      <div class="dialog-overlay" @click="clickOverlay"></div>

      <div class="dialog-fixed" :style="styles">
        <div class="dialog">
          <header>
            <slot name="title" />
            <span class="close-icon" @click="closeDialog">
              <i-ep-close />
            </span>
          </header>

          <main>
            <slot name="content" />
          </main>

          <footer>
            <div @click="cancel">取消</div>
            <div type="primary" @click="ok">确认</div>
          </footer>
        </div>
      </div>
    </Teleport>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'Dialog'
})

const emit = defineEmits(['update:visible'])

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  closeOnClickOverlay: {
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
  ok: {
    type: Function
  },
  cancel: {
    type: Function
  }
})

const styles = computed(() => ({
  minWidth: props.width + 'px',
  top: props.top + 'px'
}))

const closeDialog = () => {
  emit('update:visible', false)
}

const clickOverlay = () => {
  if (props.closeOnClickOverlay) {
    closeDialog()
  }
}

const cancel = () => {
  props.cancel && props.cancel()
  closeDialog()
}

const ok = () => {
  if (props.ok && props.ok() !== false) {
    closeDialog()
  }
}
</script>

<style lang="scss" scoped>
$radius: 4px;
$border-color: #d9d9d9;

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: fade_out(black, 0.5);
  z-index: 30;
  transition: all 2s;
}

.dialog-fixed {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 31;
}

.dialog {
  background: white;
  border-radius: $radius;
  box-shadow: 0 0 3px fade_out(black, 0.5);

  > header {
    padding: 12px 16px;
    border-bottom: 1px solid $border-color;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;

    .close-icon {
      font-size: 16px;
      color: #000000;

      &:hover {
        color: blue;
      }
    }
  }

  > main {
    padding: 12px 16px;
  }

  > footer {
    border-top: 1px solid $border-color;
    padding: 12px 2px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
  }
}
</style>
