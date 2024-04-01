export default {
  path: '/able',
  name: 'Able',
  redirect: '/able/table',
  meta: {
    title: '功能',
    icon: 'ri:ubuntu-fill'
  },
  children: [
    {
      path: '/able/mock403',
      name: 'mock403',
      component: '/able/infiniteScroll'
    },
    {
      path: '/able/table',
      name: 'InfiniteScrollTable',
      component: '/able/infiniteScroll',
      meta: {
        title: '表格无限滚动'
      }
    },
    {
      path: '/able/contextMenu',
      name: 'contextMenu',
      component: '/able/contextMenu',
      meta: {
        title: '右键菜单'
      }
    },
    {
      path: '/able/map',
      name: 'Map',
      component: '/able/map',
      meta: {
        title: '地图'
      }
    },
    {
      path: '/able/fileDownload',
      name: 'fileDownload',
      component: '/able/fileDownload',
      meta: {
        title: '文件下载'
      }
    },
    {
      path: '/able/checkWord',
      name: 'checkWord',
      component: '/able/checkWord',
      meta: {
        title: '文件查看(word)',
        showInMenu: false
      }
    },
    {
      path: '/able/checkExcel',
      name: 'checkExcel',
      component: '/able/checkExcel',
      meta: {
        title: '文件查看(excel)',
        showInMenu: false
      }
    }
  ]
}
