```
声明文件中，declare 表示声明的意思
js中有的类型必须加declare，js不存在的类型不用加，如：interface、type
skipLibCheck 需要设置为 false  // 忽略所有的声明文件（*.d.ts）的类型检查  默认值为false
declare let/const  // 声明全局变量
declare function   // 声明全局方法
declare class      // 声明全局类
declare enum       // 声明全局枚举类型
declare namespace  // 声明（含有子属性的）全局对象
interface/type     // 声明全局类型
.d.ts 文件中的顶级声明必须以 "declare" 或 "export" 修饰符 开头
export也可以使用, 但是 export 后面的函数是不允许重名的
let xxxx: number // 报错
type a = 'xxxx' // 正常
```
