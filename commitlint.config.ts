/** @type {import("@commitlint/types").UserConfig} */
export default {
  // 完整格式:
  // <type>(<scope>): <subject>
  // 空一行
  // <body>
  // 空一行
  // <footer>

  // scope: 影响范围
  // 用于说明本次 commit 的影响范围，比如: 具体功能或模块，控制器层，业务层，模型层等  route, component, utils, build

  // subject: 用一句话清楚的描述这次提交做了什么

  // eg: fix(component): 修复购物车组件商品数量可以为负数

  ignores: [commit => commit.includes('init')],
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 0: 禁用  1: warning  2: error
    // Header部分只有一行，包括三个字段：type（必需）、scope（可选）和subject（必需）
    'header-max-length': [2, 'always', 108],
    'type-empty': [2, 'never'], // type不能为空
    'subject-empty': [2, 'never'], // subject不能为空
    'body-leading-blank': [2, 'always'], // body以空行开始
    'footer-leading-blank': [1, 'always'], // footer以空行开始
    // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能 feature
        'fix', // 修复 bug
        'perf', // 性能优化
        'style', // 代码格式(不影响代码运行的变动)
        'docs', // 文档注释
        'test', // 增加测试
        'refactor', // 重构(既不增加新功能，也不是修复bug)
        'build', // 打包
        'ci', // 更改持续集成软件的配置文件和package中的scripts命令，例如scopes: Travis, Circle等
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回退
        'wip', // 开发中
        'workflow', // 工作流相关文件修改
        'types', // 类型定义文件更改
        'release' // 发布新版本
      ]
    ],
    // subject 大小写不做校验
    'subject-case': [0]
  }
}
