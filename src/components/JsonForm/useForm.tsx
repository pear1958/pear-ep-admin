import { DefineComponent, Reactive, h } from 'vue'
import {
  ElAutocomplete,
  ElCascader,
  ElCascaderPanel,
  ElCheckbox,
  ElCheckboxButton,
  ElCheckboxGroup,
  ElColorPicker,
  ElDatePicker,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElInputTag,
  ElMention,
  ElOption,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElRate,
  ElSelect,
  ElSelectV2,
  ElSlider,
  ElSwitch,
  ElTimePicker,
  ElTimeSelect,
  ElTransfer,
  ElTreeSelect,
  ElUpload
} from 'element-plus'
import { FormItem } from './type'

const elMap = {
  autocomplete: ElAutocomplete,
  cascader: ElCascader,
  'cascader-panel': ElCascaderPanel,
  'color-picker': ElColorPicker,
  'date-picker': ElDatePicker,
  input: ElInput,
  'input-number': ElInputNumber,
  'input-tag': ElInputTag,
  mention: ElMention,
  rate: ElRate,
  'select-v2': ElSelectV2,
  slider: ElSlider,
  switch: ElSwitch,
  'time-picker': ElTimePicker,
  'time-select': ElTimeSelect,
  transfer: ElTransfer,
  'tree-select': ElTreeSelect,
  upload: ElUpload
}

/**
 * 不用动态组件, 因为showDialog方法需要显示导入El组件
 * const Component = resolveComponent(`el-${type}`)
 * <Component {...attrs} v-model={formData[field]} v-slots={slots} />
 */
const useForm = (formData: Reactive<Recordable>) => {
  const getComponent = (item: FormItem) => {
    const { type, children, field, slots } = item
    const attrs = item.attrs || {}
    const options = attrs?.options || []

    attrs.style = {
      width: '100%',
      ...attrs.style
    }

    let placeholder = ''

    if (['autocomplete', 'input', 'input-tag', 'mention'].includes(type)) {
      placeholder = '请输入'
    } else if (['cascader', 'select', 'select-v2', 'tree-select'].includes(type)) {
      placeholder = '请选择'
    }

    if (placeholder) {
      attrs.placeholder = attrs.placeholder || placeholder
    }

    if (type === 'component') return item.component

    // 非嵌套组件
    if (elMap[type]) {
      return h(
        elMap[type],
        {
          modelValue: formData[field],
          'onUpdate:modelValue': (value: any) => (formData[field] = value),
          ...attrs
        },
        slots
      )
    }

    let component: DefineComponent

    switch (type) {
      case 'select':
        component = (
          <ElSelect {...attrs} v-model={formData[field]} v-slots={slots}>
            {options.map((c: LabelValue) => (
              <ElOption label={c.label} value={c.value} key={c.value} />
            ))}
          </ElSelect>
        )
        break

      case 'checkbox-group':
        component = (
          <ElCheckboxGroup {...attrs} v-model={formData[field]} v-slots={slots}>
            {options.map((c: LabelValue) => {
              const Compo = children === 'checkbox-button' ? ElCheckboxButton : ElCheckbox
              return <Compo label={c.label} value={c.value} key={c.value} />
            })}
          </ElCheckboxGroup>
        )
        break

      case 'radio-group':
        component = (
          <ElRadioGroup {...attrs} v-model={formData[field]} v-slots={slots}>
            {options.map((c: LabelValue) => {
              const Compo = children === 'radio-button' ? ElRadioButton : ElRadio
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
