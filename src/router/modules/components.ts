export default {
  path: '/components',
  name: 'Components',
  redirect: '/components/gkUpload',
  meta: {
    title: '常用组件',
    icon: 'ep:menu'
  },
  children: [
    {
      path: '/components/upload',
      name: 'upload',
      component: '/components/upload',
      meta: {
        title: '图片上传(支持裁剪)'
      }
    },
    {
      path: '/components/area',
      name: 'area',
      component: '/components/area',
      meta: {
        title: '省市区选择(接口数据)'
      }
    },
    {
      path: '/components/mapAddrDrawer',
      name: 'mapAddrDrawer',
      component: '/components/mapAddrDrawer',
      meta: {
        title: '地图选点'
      }
    },
    {
      path: '/components/charts',
      name: 'Charts',
      component: '/components/charts',
      meta: {
        title: '图表'
      }
    },
    {
      path: '/components/gkDrawer',
      name: 'gkDrawer',
      component: '/components/gkDrawer',
      meta: {
        title: '抽屉'
      }
    },
    {
      path: '/components/gkTabs',
      name: 'gkTabs',
      component: '/components/gkTabs',
      meta: {
        title: '标签页'
      }
    },
    {
      path: '/components/gkDialog',
      name: 'gkDialog',
      component: '/components/gkDialog',
      meta: {
        title: '对话框'
      }
    },
    {
      path: '/components/gkCollapse',
      name: 'gkCollapse',
      component: '/components/gkCollapse',
      meta: {
        title: '折叠面板'
      }
    },
    {
      path: '/components/progress',
      name: 'progress',
      component: '/components/progress',
      meta: {
        title: 'Progress动画'
      }
    },
    {
      path: '/components/chooseArea',
      name: 'chooseArea',
      component: '/components/chooseArea',
      meta: {
        title: '省市区选择(前端数据)'
      }
    },
    {
      path: '/components/wangEditor',
      name: 'wangEditor',
      component: '/components/wangEditor',
      meta: {
        title: '富文本编辑器'
      }
    },
    {
      path: '/components/gkUpload',
      name: 'gkUpload',
      component: '/components/gkUpload',
      meta: {
        title: '图片上传(自定义)'
      }
    }
  ]
}
