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
}

export default new Flex()
