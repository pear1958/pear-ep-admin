import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import pkg from './package.json'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    dts({
      outDir: 'dist/types', // 类型声明文件输出到 dist/types 目录
      include: ['src/**/*'], // 只处理 src 目录下的所有文件
      // 生成的类型声明文件（.d.ts）里，所有的类型引用都用 import 语法，而不是用三斜线引用（/// <reference ... />
      staticImport: true, // 类型声明文件使用静态 import 语法
      insertTypesEntry: true, // 在 package.json 里自动插入 types 字段入口
    })
  ],
  build: {
    cssCodeSplit: false, // 不进行 CSS 拆分，所有样式会被打包到一个文件中，方便库的分发和使用
    sourcemap: false, // 不生成 source map 文件，减少打包体积，发布时一般不需要调试源码
    minify: false, // 不压缩代码，生成的代码可读性更好，方便调试或二次开发
    target: 'esnext', // 生成的代码目标为最新的 ES 标准，适用于现代浏览器或支持 ESNext 的环境
    lib: {
      entry: 'src/main.ts',
      name: 'PearForm',
      fileName: 'pear-form',
      formats: ['es']
    },
    rollupOptions: {
      external(id: string) {
        return Object.keys(pkg.dependencies).some(k => new RegExp(`^${k}`).test(id))
      }
    }
  }
})
