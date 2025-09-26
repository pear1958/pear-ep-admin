// 开发环境地址
const config: Recordable<string> = {
  angular11: 'http://localhost:4001',
  nextjs11: 'http://localhost:4002',
  nuxtjs2: 'http://localhost:4003',
  react16: 'http://localhost:4004',
  react17: 'http://localhost:4005',
  sidebar: 'http://localhost:4006',
  vite: 'http://localhost:4007',
  vue2: 'http://localhost:4008',
  vue3: 'http://localhost:4009'
}

// 线上环境地址
if (process.env.NODE_ENV === 'production') {
  // 基座应用和子应用部署在同一个域名下，这里使用location.origin进行补全
  Object.keys(config).forEach(key => {
    // 源（origin）的格式是： 协议://域名:端口
    config[key] = window.location.origin
  })
  // 只有 Next.js 和 Nuxt.js 这两个 SSR 应用因为需要独立服务器
  const { protocol, hostname } = window.location
  config.nextjs11 = `${protocol}//${hostname}:5006`
  config.nuxtjs2 = `${protocol}//${hostname}:6006`
}

export default config
