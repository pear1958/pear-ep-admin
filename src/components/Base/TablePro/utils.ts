import { isArray } from '@/utils/is'
import { fieldNames } from './types'

export function handleRowAccordingToProp(row: Recordable, prop: string) {
  if (!prop.includes('.')) return row[prop] ?? '--'
  prop.split('.').forEach(key => (row = row[key] ?? '--'))
  return row
}

export function findItemNested(enumData: any, callValue: any, value: string, children: string) {
  return enumData.reduce((accumulator: any, current: any) => {
    if (accumulator) return accumulator
    if (current[value] === callValue) return current
    if (current[children]) return findItemNested(current[children], callValue, value, children)
  }, null)
}

export function filterEnum(callValue: any, enumData?: any, fieldNames?: fieldNames, type?: 'tag') {
  const value = fieldNames?.value ?? 'value'
  const label = fieldNames?.label ?? 'label'
  const children = fieldNames?.children ?? 'children'

  let filterData: { [key: string]: any } = {}

  // 判断 enumData 是否为数组
  if (Array.isArray(enumData)) filterData = findItemNested(enumData, callValue, value, children)

  // 判断是否输出的结果为 tag 类型
  if (type == 'tag') {
    return filterData?.tagType ? filterData.tagType : ''
  } else {
    return filterData ? filterData[label] : '--'
  }
}

/**
 * 处理 值为数组 || 无数据
 * */
export function formatValue(value: any) {
  if (isArray(value)) return value.length ? value.join(' / ') : '--'
  return value ?? '--'
}
