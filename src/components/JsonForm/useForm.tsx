import { DefineComponent, Reactive, h } from 'vue'
import {
  ElCheckbox,
  ElCheckboxButton,
  ElCheckboxGroup,
  ElDatePicker,
  ElFormItem,
  ElInput,
  ElOption,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElSelect
} from 'element-plus'
import { FormItem } from './type'

const elMap = {
  input: ElInput,
  'date-picker': ElDatePicker
}

const useForm = (formData: Reactive<Recordable>) => {
  /**
   * 不用动态组件, 因为showDialog方法需要显示导入El组件
   * const Component = resolveComponent(`el-${type}`)
   * <Component {...item.attrs} v-model={formData[field]} v-slots={item.slots} />
   */
  const getComponent = (item: FormItem) => {
    const { type, childType, field } = item

    if (type === 'component') {
      return item.component
    }

    if (elMap[type]) {
      return h(
        elMap[type],
        {
          modelValue: formData[field],
          'onUpdate:modelValue': (value: any) => (formData[field] = value),
          ...item.attrs
        },
        item.slots || {}
      )
    }

    let component: DefineComponent

    switch (type) {
      case 'select':
        component = (
          <ElSelect {...item.attrs} v-model={formData[field]} v-slots={item.slots}>
            {item.attrs.options.map((c: LabelValue) => (
              <ElOption label={c.label} value={c.value} key={c.value} />
            ))}
          </ElSelect>
        )
        break

      case 'checkbox-group':
        component = (
          <ElCheckboxGroup {...item.attrs} v-model={formData[field]} v-slots={item.slots}>
            {item.attrs.options.map((c: LabelValue) => {
              const Compo = childType === 'checkbox-button' ? ElCheckboxButton : ElCheckbox
              return <Compo label={c.label} value={c.value} key={c.value} />
            })}
          </ElCheckboxGroup>
        )
        break

      case 'radio-group':
        component = (
          <ElRadioGroup {...item.attrs} v-model={formData[field]} v-slots={item.slots}>
            {item.attrs.options.map((c: LabelValue) => {
              const Compo = childType === 'radio-button' ? ElRadioButton : ElRadio
              return <Compo label={c.label} value={c.value} key={c.value} />
            })}
          </ElRadioGroup>
        )
        break

      default:
        component = null
        return
    }

    return component
  }

  const getFormItem = (item: FormItem) => {
    return (
      <ElFormItem
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
      </ElFormItem>
    )
  }

  return {
    getFormItem
  }
}

export default useForm
