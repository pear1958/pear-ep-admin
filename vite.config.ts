import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import svgLoader from 'vite-svg-loader'
import viteCompression from 'vite-plugin-compression'
// 使用此插件 需要 删掉package.json 中的 "type": "module" 配置
import vueSetupExtend from 'vite-plugin-vue-setup-extend-plus'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { formatEnv } from './src/utils/env'

const pathSrc = resolve(__dirname, 'src')

// https://cn.vitejs.dev/config/#conditional-config
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // 加载 envDir 中的 .env 文件, 默认情况下只有前缀为 VITE_ 的会被加载
  const env = loadEnv(mode, process.cwd())

  // 获取当前运行模式的环境变量对象, Val 是字符串, 因此需要处理一下
  // 直接使用 import.meta.env 来获取环境变量的话, 可以在Vue文件中获取(也有数据类型的问题), 但是无法在此文件中获取
  const envConf = formatEnv(env)

  return {
    resolve: {
      alias: {
        '@': pathSrc
        // 'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      }
    },
    server: {
      open: true, // 自动开启窗口
      host: true, // 监听本地所有IP
      port: envConf.VITE_PORT,
      proxy: {
        '/api': {
          // target: 'http://10.10.10.185:9501',
          target: 'https://cdpre.tfsmy.com/smart-front-gateway',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        },
        '/dev-api': {
          target: 'https://cdpre.tfsmy.com/smart-front-gateway',
          changeOrigin: true,
          // secure: false,
          rewrite: path => {
            return path.replace('/dev-api', '')
          }
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/styles/variable.scss" as *;
            @use "@/styles/mixin.scss" as *;
          `
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      // name 可以写在 script 标签上
      vueSetupExtend(),
      // 使用 svg 图标
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
        symbolId: 'icon-[dir]-[name]'
      }),
      // 加载SVG文件作为Vue组件
      svgLoader(),
      // 优化 首屏加载慢 等用户体验, 配置 Nginx 即可
      envConf.VITE_OPEN_GZIP &&
        viteCompression({
          deleteOriginFile: false, // 压缩后是否删除源文件
          threshold: 10240, // 体积大于 threshold 才会被压缩, 单位b  10kb
          algorithm: 'gzip', // 压缩算法
          ext: '.gz' // 生成的压缩后缀
        }),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue'],
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon'
          })
        ],
        dts: resolve(pathSrc, 'types', 'auto-imports.d.ts')
      }),
      Components({
        resolvers: [
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep']
          }),
          // 自动导入 Element Plus 组件
          ElementPlusResolver()
        ],
        dts: resolve(pathSrc, 'types', 'components.d.ts')
      }),
      Icons({
        autoInstall: true
      })
    ],
    // 解决 Vite 启动完之后首页加载慢的问题
    optimizeDeps: {
      // 启动时 预加载这些包
      include: ['pinia', 'mitt']
    },
    build: {
      // 关闭source-map 减小打包后的文件体积
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000,
      // esbuild 打包更快, 但是不能去除 console.log
      minify: 'esbuild',
      rollupOptions: {
        output: {
          // 静态资源分类和打包
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      }
    }
  }
})
