import dayjs from 'dayjs'
import { downloadByData } from 'pear-common-utils'
import { downloadFile } from '@/api/modules/common'

export const isDev = import.meta.env.MODE === 'development'

export const title = import.meta.env.VITE_TITLE

export const openCrypto = import.meta.env.VITE_OPEN_CRYPTO === 'true'

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

export interface DownloadParams {
  url: string
  params?: Recordable
  fileName?: string
  preferApiName?: Boolean
}

/*
 * fileName: 默认文件名
 */
export const download = async ({
  url,
  params = {},
  fileName,
  preferApiName = true
}: DownloadParams) => {
  // 接口直接返回流
  const res = await downloadFile(url, params)

  const contentDisposition = res.headers['content-disposition']
  if (preferApiName && contentDisposition) {
    // 同时配两种格式：filename="xxx" 或 filename*=UTF-8''编码后的文件名
    const match = contentDisposition.match(/filename="(.*?)"|filename\*=UTF-8''(.*?)(;|$)/i)
    if (match) {
      // 优先取 filename*=UTF-8 的值，没有则取 filename 的值
      fileName = match[2] ? decodeURIComponent(match[2]) : match[1]
    }
  }

  downloadByData(res.data, fileName, res.headers['content-type'])
}
