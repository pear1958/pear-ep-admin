import { ElMessageBox, type MessageBoxState } from 'element-plus'

export function confirmModal(
  message = '当前操作存在风险, 是否继续？',
  title = '',
  type: MessageBoxState['type'] = 'warning',
  confirmButtonText = '确定',
  cancelButtonText = '取消',
  isHtml = false
) {
  return ElMessageBox.confirm(message, title, {
    type,
    confirmButtonText,
    cancelButtonText,
    dangerouslyUseHTMLString: isHtml
  })
}

export const mobileValidator = (rule: any, value: any, callback: Function) => {
  if (/^1\d{10}$/i.test(value) || /^(\d{3,4}-)?\d{7,8}$/.test(value)) {
    callback()
  } else {
    callback(new Error('请输入正确的手机号格式'))
  }
}

export const idCardValidator = (rule: any, value: any, callback: Function) => {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

  if (reg.test(value) === false) {
    callback(new Error('身份证号输入不合法'))
  } else {
    callback()
  }
}

export const cnValidator = (rule: any, value: any, callback: Function) => {
  if (/^[\u4e00-\u9fa5]+$/.test(value) == false) {
    callback(new Error('请输入中文名'))
  } else {
    callback()
  }
}

// eg: 统一社会信用代码
export const orgRule = {
  pattern: /^[0-9a-zA-Z]*$/,
  message: '仅支持大写字母和数字',
  trigger: 'change'
}
