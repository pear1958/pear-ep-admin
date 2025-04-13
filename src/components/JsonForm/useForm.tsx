import { DefineComponent, Ref, computed, ref, resolveComponent, unref } from 'vue'
import { FormItem, JsonFormProps } from './type'
import { BreakPoint } from '../Grid/type'

const useForm = (_: JsonFormProps, formData: Ref<Recordable>) => {
  const getComponent = (item: FormItem) => {
    let res = null
    const { type, field } = item

    switch (type) {
      case 'component':
        res = <item.component v-model={formData.value[field]} />
        break

      default:
        const Component = resolveComponent(`el-${type}`) as DefineComponent
        res = (
          <Component {...item.attrs} v-model={formData.value[field]}>
            {/* eg: select-插槽-todo */}
            {type === 'select' &&
              item.attrs.options.map((_: LabelValue) => (
                <el-option label={_.label} value={_.value} />
              ))}
          </Component>
        )
        break
    }

    return res
  }

  const getFormItem = (item: FormItem) => {
    return (
      <el-form-item {...item.formItemAttrs}>
        {{
          label: () => item.label,
          default: () => getComponent(item)
        }}
      </el-form-item>
    )
  }

  // 是否默认折叠搜索项
  const collapsed = ref(false)
  // 获取响应式断点
  const gridRef = ref()
  const breakPoint = computed<BreakPoint>(() => unref(gridRef)?.breakPoint)

  // 判断是否显示 展开/收起 按钮
  const collapseVisible = computed(() => {
    let show = false

    _.formItems
      .filter(item => item.show !== false)
      .reduce((prev, current) => {
        const r = current.responsive
        const bp = breakPoint.value

        if (!r) {
          prev += 1
        } else {
          prev += (r[bp]?.span ?? r?.span ?? 1) + (r[bp]?.offset ?? r?.offset ?? 0)
        }

        const maxColumn = typeof _.columns === 'number' ? _.columns : _.columns[bp]
        if (prev >= maxColumn) show = true

        return prev
      }, 0)

    return show
  })

  return {
    getFormItem,
    collapsed,
    gridRef,
    collapseVisible
  }
}

export default useForm
