/**
 * https://cn.vite.dev/config/dep-optimization-options.html#optimizedeps-include
 * 1.依赖预构建，`vite` 启动时会将下面 include 里的模块，编译成 esm 格式并缓存到 node_modules/.vite 文件夹，
 *   页面加载到对应模块时如果浏览器有缓存就读取浏览器缓存，如果没有会读取本地缓存并按需加载
 * 2.尤其当您禁用浏览器缓存时（这种情况只应该发生在调试阶段）必须将对应模块加入到 include里，否则会遇到开发环境切换页面卡顿的问题
 *  （vite 会认为它是一个新的依赖包会重新加载并强制刷新页面），因为它既无法使用浏览器缓存，又没有在本地 node_modules/.vite 里缓存
 * 3.如果使用的第三方库是全局引入，也就是引入到 src/main.ts 文件里，就不需要再添加到 include 里了，因为 vite 会自动将它们缓存到 node_modules/.vite
 */
export const include = [
  '@amap/amap-jsapi-loader',
  '@element-plus/icons-vue',
  '@wangeditor/editor',
  '@wangeditor/editor-for-vue',
  'axios',
  'cropperjs',
  'dayjs',
  'echarts',
  'el-table-infinite-scroll',
  'hotkeys-js',
  'jszip',
  'lodash-es',
  'mitt',
  'mqtt',
  'pear-view',
  'qs',
  'sortablejs',
  'v-contextmenu'
]

/**
 * 所有以 `@iconify-icons/` 开头引入的的本地图标模块，都应该加入到下面的 `exclude` 里，
 * 哪里需要哪里引入而且都是单个的引入，不需要预构建，直接让浏览器加载就好
 */
export const exclude = ['@iconify-icons/ep', '@iconify-icons/ant-design']
