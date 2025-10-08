import { AllFormItem } from '@/consts/editor'
import type { ComponentPublicInstance } from 'vue'

class Flex {
  public getField(methods: string) {
    if (methods == 'onChange') {
      return 'value, oldValue, subFormData'
    } else if (['onForce', 'onBlur', 'onClick'].includes(methods)) {
      return 'field'
    } else {
      return ''
    }
  }
  // 表单项 action 配置
  // const action = JSON.stringify({ methods: 'onBlur', funcStr: 'console.log('失去焦点字段:', field)'})
  // 或者 funcStr: 'console.log('新值:', value, '旧值:', oldValue)'

  // 调用处
  // window.VApp.$Flex.funcExec(props.item.data.action, vm.proxy, ['username'])
  // 或者 ["新内容", "旧内容", { /* subFormData */ }]

  // 得到 ->
  // (function(field) { console.log('失去焦点字段:', field) }).apply(proxy, ['username'])
  public funcExec(action: string, _proxy: ComponentPublicInstance, _argus: any[] = []) {
    const actionObj = JSON.parse(action || '{}')
    const funcStr = actionObj.funcStr
    eval(`( function(${this.getField(actionObj.methods)}) { ${funcStr} } ).apply(_proxy, _argus)`)
  }

  public tryParseJson(json: string) {
    try {
      return JSON.parse(json)
    } catch (E) {
      if (json && json.startsWith && json.startsWith('"[')) {
        return []
      }
      return {}
    }
  }

  public deepClone(target: any): any {
    // 定义一个变量
    let result: any
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === 'object') {
      // 如果是一个数组的话
      if (Array.isArray(target)) {
        result = [] // 将result赋值为一个数组，并且执行遍历
        for (let i = 0; i < target.length; i++) {
          // 递归克隆数组中的每一项
          if (Object.prototype.hasOwnProperty.call(target, i)) {
            result.push(this.deepClone(target[i]))
          }
        }
        // 判断如果当前的值是null的话；直接赋值为null
      } else if (target === null) {
        result = null
        // 判断如果当前的值是一个RegExp对象的话，直接赋值
      } else if (target.constructor === RegExp) {
        result = target
      } else {
        // 否则是普通对象，直接for in循环，递归赋值对象的所有值
        result = {}
        for (const i in target) {
          if (Object.prototype.hasOwnProperty.call(target, i)) {
            result[i] = this.deepClone(target[i])
          }
        }
      }
      // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
      result = target
    }
    // 返回最终结果
    return result
  }

  public getJsonValidate() {
    return this.deepClone([
      {
        validator: (rule: any, value: any, callback: (a?: any | undefined) => any) => {
          try {
            JSON.parse(value)
            callback()
          } catch (e) {
            console.error(e)
            return callback(new Error('请输入正确的json格式'))
          }
        },
        trigger: 'blur'
      }
    ])
  }

  /**
   * json转标准数据格式进行收口
   */
  public jsonToForm(item: AllFormItem) {
    if (!item.data || !item.controlItems) {
      item = this.deepClone(item)
      const currentComponent = window.VApp.$formcomponents[item.ControlType as any]
      item.formConfig = window.VApp.$formcomponents[item.ControlType as any]?.formConfig || {}
      if (!item.data) {
        item.data = item.formConfig.data()
      }

      if (!item.data.fieldName) {
        item.data.fieldName = item.ControlType + '_' + this.generateMixed()
      }
      if (item.layout) {
        if (item.ControlType == 'Grid' && item.data.columns && item.data.columns.length > 0) {
          item.data.columns = item.data.columns.map((colItem: any) => {
            if (colItem.list && colItem.list.length > 0) {
              colItem.list = this.jsonToForm(colItem.list)
            }
            return colItem
          })
        } else if (item.ControlType == 'TableLayout' && item.data.trs && item.data.trs.length > 0) {
          /**
           * 需要自测一下
           */
          item.data.trs = item.data.trs.map((trItem: any) => {
            trItem.tds.forEach((tdItem: any) => {
              if (tdItem.list && tdItem.list.length > 0) {
                tdItem.list = this.jsonToForm(tdItem.list)
              }
              return tdItem
            })
            return trItem
          })
        } else if (
          (item.ControlType == 'Collapse' || item.ControlType == 'Tabs') &&
          item.data.items &&
          item.data.items.length > 0
        ) {
          item.data.items = item.data.items.map((colItem: any) => {
            if (colItem.list && colItem.list.length > 0) {
              colItem.list = this.jsonToForm(colItem.list)
            }
            return colItem
          })
        }
      }
      /**
       * 全局动态配置
       */
      const dynamicList = formStore?.get('globalFormList')?.filter((item: any) => {
        if (item.dynamic) {
          return item
        }
      })
      item.id = this.generateMixed()
      let controlItems = item.formConfig.morenConfig().concat(dynamicList)
      /**
       * 兼容动作面板,不同表单可能需要的事件不一样
       */
      if (currentComponent.actionType && currentComponent.actionType.length > 0) {
        console.log(controlItems)
        controlItems.find((item: any) => {
          if (item.ControlType == 'Action') {
            item.data.formConfig = {
              value: {},
              items: []
            }
            currentComponent.actionType.forEach((action: string, index: number) => {
              item.data.formConfig.items.push({
                label: action,
                value: action,
                id: index + 1
              })
            })
          }
        })
      } else {
        controlItems = controlItems.filter((item: any) => {
          if (item.ControlType !== 'Action') {
            return item
          }
        })
      }
      item.rules = this.controlFormRule(controlItems)
      item.controlItems = controlItems
    }
    return item
  }
}

export default new Flex()
