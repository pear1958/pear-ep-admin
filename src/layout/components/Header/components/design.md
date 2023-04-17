1.监听面包屑数据变化, 储存最顶级父级路由
topRoute {
  name: 'xxx'
}

2.监听fullPath, 如果有query, 则储存数据
queryRouteList: [
  {
    name: 'xxx',
    fullPath: 'xxxx'
  },
  // ...
]

3.路由跳转时: 当前路由 的祖先元素不是 当前储存的最顶级路由
a.是, 优先在queryRouteList中查询routeName是否存在, 并且获取其数据
b.不是: 则重新储存 topRoute & queryRouteList







