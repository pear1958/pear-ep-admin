import { defineComponent } from 'vue'
import { ElTooltip } from 'element-plus'
import { Icon } from '@iconify/vue'

export default defineComponent({
  name: 'LabelComponent',
  setup() {
    return () => (
      <div class="flex-c">
        <span>自定义标签</span>
        <ElTooltip content="这是一段描述" placement="top">
          <Icon icon="ep:question-filled" class="cursor-pointer ml-0.5" />
        </ElTooltip>
        <span>：</span>
      </div>
    )
  }
})
