export default {
  path: '/link',
  name: 'link',
  redirect: '/link/bing',
  meta: {
    title: '外部页面',
    icon: 'ep:monitor'
  },
  children: [
    {
      path: '/link/vue',
      name: 'vue',
      component: '/iframeView',
      meta: {
        title: 'Vue官方文档 ( 内嵌 )',
        iframeSrc: 'https://cn.vuejs.org/guide/introduction.html',
        mainFull: true
      }
    },
    {
      path: '/link/bing',
      name: 'bing',
      component: '/iframeView',
      meta: {
        title: '必应 ( 内嵌 )',
        iframeSrc: 'https://cn.bing.com/',
        mainFull: true
      }
    },
    {
      path: '/link/checkPdf',
      name: 'linkCheckPdf',
      component: '/iframeView',
      meta: {
        title: '查看PDF ( 内嵌 )',
        iframeSrc: 'http://static.shanhuxueyuan.com/test.pdf',
        mainFull: true
      }
    },
    {
      path: '/link/baidu',
      name: 'baidu',
      meta: {
        title: '百度 ( 外链 )',
        link: 'https://www.baidu.com'
      }
    }
  ]
}
