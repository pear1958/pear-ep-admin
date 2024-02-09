## Ep-Admin

## 简介

`Ep-Admin` 是一款开源免费的中后台管理系统模版, 使用最新的 `Vue3`、`Vite`、`Ts`、`element-plus`、`Pinia`、`tailwindcss` 等主流技术开发

#### 在线预览地址

[点我预览](https://v-geek.github.io/Ep-Admin)

#### 登录相关

- 开发中...
- 账号: admin
- 密码: 123456

- 说明: lint-staged v15 版本需要 Node大于18.12.0 https://github.com/lint-staged/lint-staged

#### 项目截图

- 正在开发中...
<p align="center">
  <img alt="Ep-Admin" width="100%" src="https://github.com/zhangzy56/V-Admin/blob/master/src/assets/readme/admin-1.png">
  <img alt="Ep-Admin" width="100%" src="https://github.com/zhangzy56/V-Admin/blob/master/src/assets/readme/admin-2.png">
  <img alt="Ep-Admin" width="100%" src="https://github.com/zhangzy56/V-Admin/blob/master/src/assets/readme/admin-3.png">
  <img alt="Ep-Admin" width="100%" src="https://github.com/zhangzy56/V-Admin/blob/master/src/assets/readme/admin-4.png">
  <img alt="Ep-Admin" width="100%" src="https://github.com/zhangzy56/V-Admin/blob/master/src/assets/readme/admin-5.png">
</p>

#### 项目功能

- 主题切换, 暗黑模式, 菜单栏搜索, 按钮权限指令封装
- 原生 websocket 封装, Echarts 组件
- 二次封装 el-progress 组件, 使其支持动画
- 自定义 SvgIcon、Iconify 组件, 使用 SvgLoader 插件 图标随心使用
- 自定义 Tabs、Dialog、Modal、Upload、地图选点 等常用组件, 忘记实现思路, 看一下代码便知

- 支持输入错误 url 打开 404 页面
- 使用 keepAlive 对页面进行缓存，支持多级嵌套页面缓存
- 使用 Vue3.3 + Tsx 开发, 提升代码性能
- 支持 路由权限拦截、页面按钮权限配置、路由懒加载、菜单动态权限
- 点击 Tab 和面包屑进行跳转时, query 不会丢失

- 更多功能正在持续完善中...

## 安装使用

- 获取项目代码

```
git clone git@github.com:v-geek/EP-Admin.git
```

- 安装依赖

```
cd Ep-Admin
pnpm install
```

- 运行

```
pnpm run dev
```

- 打包

```
pnpm run build:pro
```

#### todo-list

- [ ] 添加级联选择组件 & 可回填 & 多种模式
- [ ] 通用文件下载
- [ ] 多种布局模式
- [ ] 大屏和 gis Demo
- [ ] SearchTable
- [ ] 监控视频 demo
- [ ] 地图组件 & 视频组件
- [ ] 低代码平台(组件)

#### 待修复的 Bug

- [ ] keep-alive 没生效 & 指定 二级页面返回的时候 可以取消 keep-alive
- [ ] 菜单收起的时候, 图标部分被隐藏了

#### 面试宝典地址

https://www.kancloud.cn/hanxuming/realquestionsforfrontend/3213257

#### 支持

如果觉得本项目还不错或在工作中有所启发，请在 Github 帮助开发者点亮星星，这是对开发者最大的支持和鼓励！
