// fieldsTrs 里有 tds 字段，表示每一行里的“单元格”集合
// 每个单元格（fieldTds）可以设置合并行/列（colspan、rowspan），以及单元格里包含的表单项（list）
// 举例说明 比如你要在表单设计器里拖拽生成一个2行2列的表格，每个格子里可以放控件：
const trs = [
  {
    tds: [
      {
        colspan: 1,
        rowspan: 1,
        list: [
          /* 第一行第一个格子的控件 */
        ]
      },
      {
        colspan: 1,
        rowspan: 1,
        list: [
          /* 第一行第二个格子的控件 */
        ]
      }
    ]
  },
  {
    tds: [
      {
        colspan: 1,
        rowspan: 1,
        list: [
          /* 第二行第一个格子的控件 */
        ]
      },
      {
        colspan: 1,
        rowspan: 1,
        list: [
          /* 第二行第二个格子的控件 */
        ]
      }
    ]
  }
]

// 每个 Columns 表示一列，包含该列的宽度（span）和该列里的表单项（list）。
// 这样可以实现多列布局，比如两栏、三栏表单。
const columns = [
  { span: 12, list: [/* 第一列的控件 */] },
  { span: 12, list: [/* 第二列的控件 */] }
]

// 每个 Columns 通常有一个分组名称（如 name），和该分组下的控件列表（list）。
// 这样可以实现多个分组，每个分组里有自己的表单项。
const items = [
  { name: '分组1', list: [/* 分组1的控件 */] },
  { name: '分组2', list: [/* 分组2的控件 */] }
]
