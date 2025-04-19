import { defineComponent } from 'vue'
import { ElBadge, ElButton } from 'element-plus'

export default defineComponent({
  name: 'Badge',
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    text: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    const updateData = () => {
      const num = _.modelValue + 1
      emit('update:modelValue', num)
    }

    return () => (
      <ElBadge value={_.modelValue}>
        <ElButton onClick={updateData}>{_.text}</ElButton>
      </ElBadge>
    )
  }
})
