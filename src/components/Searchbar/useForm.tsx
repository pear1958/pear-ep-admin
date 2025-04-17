import { DefineComponent, Reactive, computed, ref, resolveComponent, unref } from 'vue'
import { FormItem, Props } from './type'
import { BreakPoint } from '../Grid/type'

const useForm = (_: Props, formData: Reactive<Recordable>) => {
  const getComponent = (item: FormItem) => {
    const { type, childType, field } = item

    if (type === 'component') {
      return item.component
    }

    const Component = resolveComponent(`el-${type}`) as DefineComponent

    const childTypeMap = {
      select: 'option',
      'radio-group': 'radio',
      'checkbox-group': 'checkbox'
    }

    if (Object.keys(childTypeMap).includes(type)) {
      const cType = childType || childTypeMap[type]
      const ChildComponent = resolveComponent(`el-${cType}`) as DefineComponent
      return (
        <Component {...item.attrs} v-model={formData[field]}>
          {{
            ...(item.slots || {}),
            default: () =>
              item.attrs.options.map((_: LabelValue) => (
                <ChildComponent label={_.label} value={_.value} key={_.value} />
              ))
          }}
        </Component>
      )
    }

    return (
      <Component {...item.attrs} v-model={formData[field]}>
        {{
          ...(item.slots || {})
        }}
      </Component>
    )
  }

  const getFormItem = (item: FormItem) => {
    return (
      <el-form-item {...item.formItemAttrs} prop={item.field} style={item.style || {}}>
        {{
          label: () => item.label,
          default: () => getComponent(item)
        }}
      </el-form-item>
    )
  }

  // 获取响应式设置
  const getResponsive = (item: FormItem) => {
    const r = item.responsive
    return {
      span: item.span || 1,
      offset: item.offset ?? 0,
      xs: r?.xs,
      sm: r?.sm,
      md: r?.md,
      lg: r?.lg,
      xl: r?.xl
    }
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
        const r = current.responsive || {}
        const bp = breakPoint.value
        prev += (r[bp]?.span ?? current?.span ?? 1) + (r[bp]?.offset ?? current?.offset ?? 0)

        const maxColumn = typeof _.columns === 'number' ? _.columns : _.columns[bp]
        if (prev >= maxColumn) show = true

        return prev
      }, 0)

    return show
  })

  const disabled = ref(false)

  return {
    getFormItem,
    getResponsive,
    collapsed,
    gridRef,
    collapseVisible,
    disabled
  }
}

export default useForm
