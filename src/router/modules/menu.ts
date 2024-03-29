export default {
  path: '/menu',
  name: 'menu',
  redirect: '/menu/menu1',
  meta: {
    icon: 'ep:histogram',
    title: '多级菜单'
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
}
