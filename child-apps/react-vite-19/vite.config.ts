import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join } from 'path'
import { writeFileSync } from 'fs'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    headers: {
      'Access-Control-Allow-Origin': '*', // 开发环境允许所有域访问
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  },
  build: {
    outDir: 'vite'
  },
  // base: `${process.env.NODE_ENV === 'production' ? 'http://www.micro-zoe.com' : ''}/react-vite-19/`,
  // 动态设置 base 路径
  // @ts-ignore
  // base: window.__MICRO_APP_ENVIRONMENT__
  //   ? '/react-vite-19/' // 微前端环境：匹配主应用路由前缀（与主应用挂载子应用的路由保持一致）
  //   : '/', // 独立运行：使用根路径
  base: '/react-vite-19/',
  plugins: [
    react(),
    (function () {
      let basePath = ''

      return {
        name: 'vite:micro-app',
        apply: 'build',
        configResolved(config) {
          // assetsDir - 即默认情况下，静态资源会被打包到 dist/assets 目录下
          // /assets是构建工具在开发环境中模拟的逻辑路径
          basePath = `${config.base}${config.build.assetsDir}/` // 默认为assets
        },
        // Vite插件的 writeBundle 钩子，在打包完成后、文件写入磁盘时执行
        // options: 打包输出配置（如输出目录等）；bundle: 打包生成的所有代码块集合
        writeBundle(options, bundle) {
          // 遍历bundle中所有的代码块（chunk），chunkName为代码块的唯一标识
          for (const chunkName in bundle) {
            // 安全检查：确保chunkName是bundle自身的属性（非原型链继承），避免处理无关属性
            if (Object.prototype.hasOwnProperty.call(bundle, chunkName)) {
              const chunk = bundle[chunkName]

              // 筛选出JS文件：只处理文件名存在且以.js结尾的代码块（忽略CSS、图片等其他类型）
              if (chunk.fileName && chunk.fileName.endsWith('.js')) {
                // 替换代码中相对路径的导入语句为基于 basePath 的绝对路径
                // 静态资源（图片、CSS 等）：Vite 会通过内置的资源处理逻辑，结合 config.base 配置自动转换路径，无需额外处理
                chunk.code = chunk.code.replace(
                  /(from|import\()(\s*['"])(\.\.?\/)/g,
                  (all, $1, $2, $3) => {
                    return all.replace($3, new URL($3, basePath))
                  }
                )
                const fullPath = join(options.dir, chunk.fileName)
                writeFileSync(fullPath, chunk.code)
              }
            }
          }
        }
      }
    })() as any
  ]
})
