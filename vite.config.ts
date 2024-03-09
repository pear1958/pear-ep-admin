import { type ConfigEnv, type UserConfigExport, loadEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import svgLoader from 'vite-svg-loader'
import viteCompression from 'vite-plugin-compression'
import { formatEnv } from './src/utils/env'

const pathSrc = resolve(__dirname, 'src')

// https://cn.vitejs.dev/config/#conditional-config
export default ({ mode }: ConfigEnv): UserConfigExport => {
  // 加载 envDir 中的 .env 文件, 默认情况下只有前缀为 VITE_ 的会被加载
  const env = loadEnv(mode, process.cwd())

  // 获取当前运行模式的环境变量对象, Val 是字符串, 因此需要处理一下
  // 直接使用 import.meta.env 来获取环境变量的话, 可以在Vue文件中获取(也有数据类型的问题), 但是无法在此文件中获取
  const envConf = formatEnv(env)

  return {
    base: './',
    resolve: {
      alias: {
        '@': pathSrc
      }
    },
    server: {
      open: true, // 自动开启窗口
      host: true, // 监听本地所有IP
      port: envConf.VITE_PORT,
      proxy: {
        [env.VITE_API_BASE_URL]: {
          target: 'xxxxxxx',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        },
        [env.VITE_FILE_BASE_URL]: {
          target: env.VITE_FILE_PROXY_URL,
          changeOrigin: true,
          rewrite: path => {
            return path.replace(env.VITE_FILE_BASE_URL, '')
          }
        }
      },
      // 预热文件以提前转换和缓存结果，降低启动期间的初始页面加载时长并防止转换瀑布
      warmup: {
        clientFiles: ['./index.html', './src/{views,components}/*']
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
        })
    ],
    // 解决 Vite 启动完之后首页加载慢的问题
    optimizeDeps: {
      // 启动时 预加载这些包
      include: ['pinia', 'mitt', 'axios', 'vue-i18n'],
      exclude: ['@iconify-icons/ep', '@iconify-icons/ant-design']
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
}
