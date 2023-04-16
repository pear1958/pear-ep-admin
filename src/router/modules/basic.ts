export const basicRouter = [
  {
    path: '/menu',
    name: 'menu',
    redirect: '/menu/menu1',
    meta: {
      icon: 'Files',
      title: '多级菜单',
      rank: 3
    },
    children: [
      {
        path: '/menu/menu1',
        name: 'menu1',
        component: '/menu/menu1/index',
        meta: {
          title: '菜单1'
        }
      },
      {
        path: '/menu/menu2',
        name: 'menu2',
        redirect: '/menu/menu2/menu21',
        meta: {
          title: '菜单2'
        },
        children: [
          {
            path: '/menu/menu2/menu21',
            name: 'menu21',
            component: '/menu/menu2/menu21/index',
            meta: {
              title: '菜单2-1'
            }
          },
          {
            path: '/menu/menu2/menu22',
            name: 'menu22',
            redirect: '/menu/menu2/menu22/menu221',
            meta: {
              title: '菜单2-2'
            },
            children: [
              {
                path: '/menu/menu2/menu22/menu221',
                name: 'menu221',
                component: '/menu/menu2/menu22/menu221/index',
                meta: {
                  title: '菜单2-2-1'
                }
              },
              {
                path: '/menu/menu2/menu22/menu222',
                name: 'menu222',
                component: '/menu/menu2/menu22/menu222/index',
                meta: {
                  title: '菜单2-2-2'
                }
              }
            ]
          },
          {
            path: '/menu/menu2/menu23',
            name: 'menu23',
            component: '/menu/menu2/menu23/index',
            meta: {
              title: '菜单2-3'
            }
          }
        ]
      },
      {
        path: '/menu/menu3',
        name: 'menu3',
        component: '/menu/menu3/index',
        meta: {
          title: '菜单3'
        }
      }
    ]
  },
  {
    path: '/link',
    name: 'link',
    redirect: '/baidu',
    meta: {
      title: '外部链接',
      icon: 'Document',
      rank: 4
    },
    children: [
      {
        path: '/baidu',
        name: 'biadu',
        meta: {
          title: '百度',
          link: 'https://www.baidu.com'
        }
      },
      {
        path: '/taobao',
        name: 'taobao',
        meta: {
          title: '淘宝',
          link: 'https://www.taobao.com/'
        }
      },
      {
        path: '/zhihu',
        name: 'zhihu',
        meta: {
          title: '知乎',
          link: 'https://www.zhihu.com/'
        }
      }
    ]
  },
  {
    path: '/able',
    name: 'Able',
    redirect: '/able/file',
    meta: {
      title: '功能',
      icon: 'Message',
      rank: 21
    },
    children: [
      {
        path: '/able/file',
        name: 'File',
        component: '/able/file/index',
        meta: {
          title: '文件'
        }
      },
      {
        path: '/able/table',
        name: 'Table',
        component: '/able/table/index',
        meta: {
          title: '表格'
        }
      },
      {
        path: '/able/map',
        name: 'Map',
        component: '/able/map/index',
        meta: {
          title: '地图'
        }
      },
      {
        path: '/able/scroll',
        name: 'Scroll',
        component: '/able/scroll/index',
        meta: {
          title: '滚动'
        }
      }
    ]
  },
  {
    path: '/test',
    name: 'CeShi',
    redirect: '/menu/menuTest0',
    meta: {
      title: '测试滚动',
      icon: 'Notification',
      rank: 5
    },
    children: new Array(50).fill(',').map((item, index) => {
      return {
        path: `/menu/menuTest${index}`,
        name: `menuTest${index}`,
        component: '/test/index',
        meta: {
          title: `菜单Test${index}`
        }
      }
    })
  }
]
