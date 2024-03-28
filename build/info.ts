import type { Plugin } from 'vite'
import dayjs, { type Dayjs } from 'dayjs'
import gradientString from 'gradient-string'
import boxen, { type Options as BoxenOptions } from 'boxen'
// import { getPackageSize } from './utils'

// 青色 - 品红色
const startMsg = gradientString('cyan', 'magenta').multiline(`欢迎使用 ep-admin 开源项目`)

const boxenOptions: BoxenOptions = {
  padding: 0.5,
  borderColor: 'cyan',
  borderStyle: 'round'
}

export function viteBuildInfo(): Plugin {
  let config: { command: string }
  let startTime: Dayjs
  let endTime: Dayjs
  let outDir: string

  return {
    name: 'vite:buildInfo',
    // 读取最终解析的配置
    configResolved(resolvedConfig) {
      config = resolvedConfig
      outDir = resolvedConfig.build?.outDir ?? 'dist'
    },
    buildStart() {
      const boxMsg = boxen(startMsg, boxenOptions)

      console.log(boxMsg)

      if (config.command === 'build') {
        startTime = dayjs(new Date())
      }
    },
    closeBundle() {
      if (config.command === 'build') {
        endTime = dayjs(new Date())

        // const buildTime = dayjs.duration(endTime.diff(startTime)).format('mm分ss秒')
        const buildTime = '30s'

        const graStr = gradientString('cyan', 'magenta').multiline(
          `恭喜打包完成, 总用时${buildTime}, 打包后的大小为3MB`
        )

        const boxMsg = boxen(graStr, boxenOptions)

        console.log(boxMsg)

        // getPackageSize({
        //   folder: outDir,
        //   callback: (size: string) => {

        //   }
        // })
      }
    }
  }
}
