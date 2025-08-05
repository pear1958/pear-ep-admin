import { PropType, defineComponent, nextTick, ref, unref, watch } from 'vue'
import { ElTree } from 'element-plus'
import { getAllMenu } from '@/api/modules/systemManage'

export default defineComponent({
  name: 'MenuTree',
  props: {
    modelValue: {
      type: Array as PropType<number[]>,
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    const menuOptions = ref([])
    const treeRef = ref()

    const stopWatch = watch(
      () => _.modelValue,
      async newVal => {
        await nextTick()
        // 确保详情接口请求完成, 再执行
        if (!newVal?.length) return
        unref(treeRef).setCheckedKeys(newVal)
        stopWatch()
      },
      {
        immediate: true
      }
    )

    const getMenuOptions = async () => {
      const { data } = await getAllMenu()
      menuOptions.value = data
    }

    getMenuOptions()

    const defaultProps = {
      label: 'name',
      children: 'children'
    }

    const handleChange = () => {
      const checkedIds = unref(treeRef).getCheckedKeys() || []
      emit('update:modelValue', checkedIds)
    }

    return () => (
      <div
        style={{
          width: '100%',
          height: '350px',
          paddingTop: '5px',
          overflow: 'auto',
          borderRadius: '4px',
          border: '1px solid #dcdfe6',
          resize: 'vertical'
        }}
      >
        <ElTree
          data={menuOptions.value}
          props={defaultProps}
          show-checkbox
          node-key="id"
          ref={treeRef}
          onCheckChange={handleChange}
        />
      </div>
    )
  }
})
