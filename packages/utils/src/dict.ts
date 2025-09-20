import { isEmpty } from './is'

export interface DictItem<T = any> {
  label: string
  value: T
  cls?: string
}

export const getDictObj = (dictList: DictItem[]) =>
  dictList.reduce((prev, cur) => {
    prev[cur.value] = cur.label
    return prev
  }, {})

export const getDictClass = (dictList: DictItem[], key: string) => {
  let cls = ''
  dictList.forEach(item => {
    if (item.value === key) {
      cls = item.cls || ''
    }
  })
  return cls
}

/**
 * @description: 标签反显
 * @param val 字典label对应的值
 */
export const getLabel = (dictList: DictItem[], val: string) =>
  !isEmpty(val) ? getDictObj(dictList)[val] : '--'

// 带 class 版的
// export const getLabel = (dictList: DictItem[], val: string) =>
//   isEmpty(val) ? <span class={getDictClass(dictList, val)}>{getDictObj(dictList)[val]}</span> : '--'

// 使用示例:
// export const testList = [
//   {
//     label: '待审核',
//     value: 1
//   },
//   {
//     label: '审核通过',
//     value: 2,
//     cls: 'text-success'
//   },
//   {
//     label: '审核不通过',
//     value: 3,
//     cls: 'text-error'
//   }
// ]

// getValue(testList, record.testStatus)
