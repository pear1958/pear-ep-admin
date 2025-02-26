import { readdir, stat } from 'fs'
import { sum } from 'lodash-es'
import dayjs from 'dayjs'
import { name, version } from '../package.json'

const __APP_INFO__ = {
  pkg: { name, version },
  lastBuildTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
}

// 将属性值为 'Boolean' 和 'Number' 的进行还原 ( 属性值默认全部为String )
function formatEnv(envObj: Recordable): ViteEnv {
  const result = {}

  for (const [key, val] of Object.entries(envObj)) {
    let realVal = val === 'true' ? true : val === 'false' ? false : val

    if (key === 'VITE_PORT') {
      realVal = Number(realVal)
    }

    result[key] = realVal

    // 将环境变量顺便放到 process.env 中
    process.env[key] = realVal
  }

  return result as ViteEnv
}

const sizeList: number[] = []

// 获取指定文件夹中所有文件的总大小
const getPkgSize = (options: { folder?: string; callback: Function }) => {
  const { folder = 'dist', callback } = options
  readdir(folder, (err, files: string[]) => {
    if (err) throw err
    let count = 0
    const checkEnd = () => {
      if (++count == files.length) {
        const total = sum(sizeList)
        const formatSize = (total / 1024 / 1024).toFixed(2) + 'MB'
        callback(formatSize)
      }
    }
    files.forEach((item: string) => {
      stat(`${folder}/${item}`, async (err, stats) => {
        if (err) throw err
        if (stats.isFile()) {
          sizeList.push(stats.size)
          checkEnd()
        } else if (stats.isDirectory()) {
          getPkgSize({
            folder: `${folder}/${item}/`,
            callback: checkEnd
          })
        }
      })
    })
    files.length === 0 && callback(0)
  })
}

export { __APP_INFO__, formatEnv, getPkgSize }
