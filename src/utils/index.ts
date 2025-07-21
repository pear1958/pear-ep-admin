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
