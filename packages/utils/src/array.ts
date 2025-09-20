import { deepClone } from './'
import type { Recordable } from './type'

export interface NodeItem {
  path: string
  children?: NodeItem[]
  [key: string]: any
}

/**
 * @description 扁平化数组对象, 他的key不剔除, 只是把所有key下的元素 提到第一级来
 */
export function getFlatArr<T = Recordable>(arr: T[], key: string = 'children'): T[] {
  const newArr = deepClone(arr)
  return newArr.reduce((pre: T[], current: T) => {
    let flatArr = [...pre, current]
    if (current[key]) flatArr = [...flatArr, ...getFlatArr(current[key])] as T[]
    return flatArr
  }, [])
}

/**
 * @description: 根据 path 获取 匹配的所有对象
 */
export function getMatchNodeList<T extends NodeItem>(path: string, arr: T[]) {
  let matchList: T[] = []
  try {
    const findPath = (node: T) => {
      matchList.push(node)
      // 找到该路径, 结束循环
      if (node.path === path) throw new Error('Find IT!')
      if (node.children?.length) node.children.forEach(item => findPath(item as T))
      // 没有找到该路径, 删除对象
      matchList.pop()
    }
    arr.forEach(item => findPath(item))
  } catch (e) {
    return matchList
  }
}
