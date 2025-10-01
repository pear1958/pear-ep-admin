/*
 * @Description: Json Props 定义
 */

import { beforeBaseFormCofig, afterBaseFormConfig, fieldsMap } from '@/consts/fieldsMap'
import type { morenFields, FormConfig, Config, FormConfigReturn } from '@/consts/fieldsMap'

function getMoren(fieldName: string, component: string, label?: string): FormConfig {
  // 所有组件的 除开通用配置以外的 私有配置
  const map: morenFields = {
    default: {
      ControlType: 'Text',
      data: {
        fieldName: 'default',
        tip: '',
        label: '默认值',
        placeholder: '',
        showRule: '{}',
        required: false,
        rule: '[]'
      }
    },
    placeholder: {
      ControlType: 'Text',
      data: {
        fieldName: 'placeholder',
        tip: '',
        label: '输入占位文字',
        placeholder: '请输入占位文字',
        showRule: '{}',
        required: false,
        rule: '[]'
      }
    },
    multiple: {
      ControlType: 'Switch',
      data: {
        fieldName: 'multiple',
        tip: '',
        label: '是否多选',
        showRule: '{}',
        required: false,
        rule: '[]'
      }
    },
    min: {
      ControlType: 'Text',
      data: {
        fieldName: 'min',
        tip: '',
        label: '最小范围',
        placeholder: '',
        showRule: '{}',
        required: false,
        rule: '[]'
      }
    },
    max: {
      ControlType: 'Text',
      data: {
        fieldName: 'max',
        tip: '',
        label: '最大范围',
        placeholder: '',
        showRule: '{}',
        required: false,
        rule: '[]'
      }
    },
    itemConfig: {
      ControlType: 'KeyValueConfigMult',
      data: {
        fieldName: 'itemConfig',
        tip: '',
        label: '默认值',
        placeholder: '',
        showRule: '{}',
        required: false,
        rule: '[]'
      }
    },
    type: {
      ControlType: 'Radio',
      data: {
        fieldName: 'type',
        tip: '',
        label: '按钮位置',
        placeholder: '',
        showRule: '{}',
        required: false,
        rule: '[]',
        itemConfig: {
          value: '1',
          id: 1,
          items: [
            {
              label: '默认',
              value: '1',
              select: true,
              id: 1
            },
            {
              label: '右边',
              value: '2',
              select: false,
              id: 2
            }
          ]
        }
      }
    },
    infotype: {
      ControlType: 'Selected',
      data: {
        fieldName: 'infotype',
        tip: '',
        label: '风格类型',
        placeholder: '',
        showRule: '{}',
        required: false,
        rule: '[]',
        itemConfig: {
          value: 'success',
          id: 1,
          items: [
            {
              label: 'success',
              value: 'success',
              select: true,
              id: 1
            },
            {
              label: 'info',
              value: 'info',
              select: false,
              id: 2
            },
            {
              label: 'warning',
              value: 'warning',
              select: false,
              id: 3
            },
            {
              label: 'error',
              value: 'error',
              select: false,
              id: 4
            }
          ]
        }
      }
    },
    effect: {
      ControlType: 'Selected',
      data: {
        fieldName: 'effect',
        tip: '',
        label: '风格类型',
        placeholder: '',
        showRule: '{}',
        required: false,
        rule: '[]',
        itemConfig: {
          value: 'light',
          id: 1,
          items: [
            {
              label: 'light',
              value: 'light',
              select: true,
              id: 1
            },
            {
              label: 'dark',
              value: 'dark',
              select: false,
              id: 2
            }
          ]
        }
      }
    },
    size: {
      ControlType: 'Radio',
      data: {
        fieldName: 'size',
        tip: '',
        label: '计数器尺寸类型',
        placeholder: '',
        showRule: '{}',
        required: false,
        rule: '[]',
        itemConfig: {
          value: 'large',
          id: 1,
          items: [
            {
              label: 'large',
              value: 'large',
              select: true,
              id: 1
            },
            {
              label: 'medium',
              value: 'medium',
              select: false,
              id: 2
            },
            {
              label: 'small',
              value: 'small',
              select: false,
              id: 3
            },
            {
              label: 'mini',
              value: 'mini',
              select: false,
              id: 4
            }
          ]
        }
      }
    },
    InputNumber: {
      ControlType: 'InputNumber',
      data: {
        fieldName: '',
        label: '标签名称',
        tip: '',
        placeholder: '',
        showRule: '{}',
        required: false,
        rule: '[]',
        default: 0,
        type: 1,
        size: 'large'
      }
    },
    gutter: {
      ControlType: 'InputNumber',
      data: {
        fieldName: 'gutter',
        label: '栅格间距',
        tip: '',
        placeholder: '',
        showRule: '{}',
        required: false,
        rule: '[]',
        default: 0,
        type: 1,
        size: 'small'
      }
    },
    columns: {
      ControlType: 'ListConfig',
      data: {
        fieldName: 'columns',
        label: '列配置项',
        tip: '',
        showRule: '{}',
        required: false,
        rule: '[]'
      }
    }
  }
  if (map[fieldName] && map[fieldName].ControlType == component) {
    return map[fieldName]
  } else if (!map[fieldName]) {
    return {
      ControlType: component,
      data: {
        fieldName,
        tip: '',
        label: label ? label : '输入占位文字',
        placeholder: '请输入占位文字',
        showRule: '{}',
        required: false,
        rule: '[]'
      }
    }
  } else {
    map[fieldName].ControlType = component
    return map[fieldName]
  }
}

/**
 *
 * @param componentName 控件类型名，比如 "Text"、"Switch" 等
 * @param config 自定义字段配置数组（可选），可以添加额外的属性项。
 * @param filterField 过滤组件不要的配置
 */
function getFormConfig(
  componentName: string,
  config: Config[] = [],
  filterField: string[] = []
): FormConfigReturn {
  if (!fieldsMap[componentName]) {
    return {
      data(): any {
        return {}
      },
      morenConfig() {
        return []
      }
    }
  }

  const configList: any = []

  if (config && config.length > 0) {
    config.forEach(item => {
      configList.push(getMoren(item.fieldName, item.component, item.label))
    })
  }

  return {
    // JSON 的 data 字段配置
    data() {
      return JSON.parse(JSON.stringify(fieldsMap[componentName]))
    },
    // 组件配置 绑定的 字段
    morenConfig() {
      // 组件配置 通用前部分
      const before = beforeBaseFormCofig().filter(item => {
        if (!filterField.includes(item.data.fieldName)) {
          return item
        }
      })

      // 组件配置 通用后部分
      const after = afterBaseFormConfig().filter(item => {
        if (!filterField.includes(item.data.fieldName)) {
          return item
        }
      })

      return [...before, ...configList, ...after]
    }
  }
}

export { getFormConfig }
