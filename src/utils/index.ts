import dayjs from 'dayjs'

export const isDev = import.meta.env.MODE === 'development'

export const title = import.meta.env.VITE_TITLE

/**
 * @param {*} format https://day.js.org/docs/zh-CN/parse/string-format
 */
export const formatDate = (date: string | undefined, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!date) return '--'
  return dayjs(date).format(format)
}

export const convertToTree = (data: Recordable[]) => {
  const transformNode = (node: Recordable) => {
    const transformed: Recordable = {
      label: node.name,
      value: node.id
    }

    // 如果有子节点，递归转换
    if (node.children?.length > 0) {
      transformed.children = node.children.map((item: Recordable) => transformNode(item))
    }

    return transformed
  }

  return data.map(item => transformNode(item))
}
