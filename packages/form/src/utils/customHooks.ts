import { watch, getCurrentInstance, ComponentInternalInstance } from 'vue'

/**
 * @description: 监听组件的值变化  触发 onChange 事件  实现组件联动
 * @param props 组件的 props
 */
function useWatch(props: Recordable) {
  const vm = getCurrentInstance() as ComponentInternalInstance

  // 预览模式下才有效
  if (!props.data.fieldName && !props.item.controlItems) {
    watch(
      // 表单中该字段的值
      () => props.data[props.item.data.fieldName],
      (val, oldVal) => {
        if (props.item.data.action?.onChange) {
          window.VApp.$Flex.funcExec(props.item.data.action.onChange, vm.proxy, [
            val,
            oldVal,
            props.data // 整个表单的数据
          ])
        }
        vm.emit('change')
      },
      {
        deep: true
      }
    )
  }
}

export { useWatch }
