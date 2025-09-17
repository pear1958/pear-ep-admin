import { resolve } from 'path'
import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import svgLoader from 'vite-svg-loader'
import viteCompression from 'vite-plugin-compression'
import { createHtmlPlugin } from 'vite-plugin-html'
import { webUpdateNotice } from '@plugin-web-update-notification/vite'
import legacy from '@vitejs/plugin-legacy'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { viteBuildInfo } from './info'
import { isDev } from '@/utils'

export const getPlugins = (viteEnv: ViteEnv): PluginOption[] => {
  const { VITE_TITLE, VITE_OPEN_GZIP } = viteEnv
  return [
    vue(),
    vueJsx(),
    // 使用 svg 图标
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
      symbolId: 'icon-[dir]-[name]'
    }),
    // 加载SVG文件作为Vue组件
    svgLoader(),
    viteBuildInfo(),
    // 注入变量到 html 文件
    createHtmlPlugin({
      minify: true,
      inject: {
        data: { title: VITE_TITLE }
      }
    }),
    // 优化 首屏加载慢 等用户体验, 配置 Nginx 即可
    VITE_OPEN_GZIP &&
      viteCompression({
        deleteOriginFile: false, // 压缩后是否删除源文件
        threshold: 10240, // 体积大于 threshold 才会被压缩, 单位b  10kb
        algorithm: 'gzip', // 压缩算法
        ext: '.gz' // 生成的压缩后缀
      }),
    // 打包后请求 web_version_by_plugin.json 文件的代码加了 ?t=${Date.now()} 参数
    webUpdateNotice({
      logVersion: true,
      versionType: 'build_timestamp',
      notificationProps: {
        title: VITE_TITLE,
        description: '检测到新版本',
        buttonText: '刷新',
        dismissButtonText: '忽略'
      }
    }),
    legacy({
      // 基于代码按需生成 polyfill
      // defaults: > 0.5%, last 2 versions, Firefox 的长期支持版本 等
      targets: ['defaults', 'chrome 52', 'firefox 54', 'not IE 11'],
      // 提供所有可供挑选的 polyfill, 支持实验性特性
      corejs: { version: 3, proposals: true },
      // 补充  core-js 不包含的补丁
      additionalLegacyPolyfills: [
        'regenerator-runtime/runtime', // async/await 补丁 -> generator 函数
        'whatwg-fetch', // fetch API
        'url-search-params-polyfill', // URLSearchParams API
        'request-idle-callback-polyfill', // 浏览器空闲任务: requestIdleCallback 补丁
        'intersection-observer' // IntersectionObserver 补丁: 监听元素是否进入 / 离开视口
      ],
      // 给现代浏览器补必要的新特性补丁  比如 Array.prototype.at
      // modernPolyfills: true,
      // 是否忽略项目中的 browserslist 配置
      ignoreBrowserslistConfig: true,
      // 打包时如果有无法转译(无法模拟)的功能, 控制台显示警告
      warnings: true
    }),
    // 开发环境禁用，不影响热更新速度
    // Vite 在加载配置文件前会主动注入这个环境变量
    process.env.NODE_ENV !== 'development' &&
      ViteImageOptimizer({
        // 只处理常见图片格式（后台系统很少用到 gif/avif 等）
        include: /\.(png|jpe?g|svg|webp)$/i,
        exclude: /node_modules/,
        // 简化配置：优先保证压缩速度，兼顾体积
        png: { quality: 70 }, // 压缩质量, 70% 足够清晰
        jpeg: { quality: 70 }
      })
  ]
}
