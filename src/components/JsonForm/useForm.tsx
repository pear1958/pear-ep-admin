import { DefineComponent, Reactive, resolveComponent } from 'vue'
import { FormItem } from './type'

const useForm = (formData: Reactive<Recordable>) => {
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
              item.attrs.options.map((c: LabelValue) => (
                <ChildComponent label={c.label} value={c.value} key={c.value} />
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
      <el-form-item
        prop={item.field}
        style={item.style || {}}
        rules={item.rules}
        key={item.field}
        {...item.formItemAttrs}
      >
        {{
          label: () => item.label,
          default: () => getComponent(item)
        }}
      </el-form-item>
    )
  }

  return {
    getFormItem
  }
}

export default useForm
