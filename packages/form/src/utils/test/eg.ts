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
  {
    span: 12,
    list: [
      /* 第一列的控件 */
    ]
  },
  {
    span: 12,
    list: [
      /* 第二列的控件 */
    ]
  }
]

// 每个 Columns 通常有一个分组名称（如 name），和该分组下的控件列表（list）。
// 这样可以实现多个分组，每个分组里有自己的表单项。
const items = [
  {
    name: '分组1',
    list: [
      /* 分组1的控件 */
    ]
  },
  {
    name: '分组2',
    list: [
      /* 分组2的控件 */
    ]
  }
]

const allFormList = [
  // 1. 基础组件：文本输入框
  {
    ControlType: 'Text', // 组件类型（对应具体组件）
    id: 'Text_1a2b3c', // 组件唯一ID
    nameCn: '单行文本', // 组件中文名称
    layout: false, // 是否为布局组件（基础组件为false）
    icon: 'icon-text', // 组件图标（可选）
    data: {
      // 组件核心配置
      fieldName: 'username', // 字段名（表单数据绑定的key）
      label: '用户名', // 标签显示文本
      placeholder: '请输入用户名', // 占位提示
      required: true, // 是否必填
      tip: '请输入真实姓名', // 提示信息
      showRule: '{}', // 显示条件（JSON字符串）
      default: '' // 默认值
    },
    controlItems: [
      // 组件的配置项列表（设计器中用于编辑组件属性）
      {
        ControlType: 'Text',
        data: {
          fieldName: 'label',
          label: '标签名称',
          default: '用户名'
        }
      },
      {
        ControlType: 'Switch',
        data: {
          fieldName: 'required',
          label: '是否必填',
          default: true
        }
      }
    ],
    formConfig: {
      // 组件默认配置模板
      data: () => ({ fieldName: '', label: '' }),
      morenConfig: () => [
        /* 默认配置项 */
      ]
    },
    rules: {
      // 校验规则
      username: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
    }
  },

  // 2. 基础组件：单选框组
  {
    ControlType: 'RadioGroup',
    id: 'RadioGroup_4d5e6f',
    nameCn: '单选框组',
    layout: false,
    data: {
      fieldName: 'gender',
      label: '性别',
      itemConfig: {
        // 单选框选项配置
        value: 'male', // 默认选中值
        items: [
          { label: '男', value: 'male', select: true, id: 1 },
          { label: '女', value: 'female', select: false, id: 2 }
        ]
      },
      showRule: '{}'
    },
    controlItems: [
      /* 单选框组的配置项 */
    ],
    formConfig: {
      /* ... */
    },
    rules: {}
  },

  // 3. 布局组件：栅格布局
  {
    ControlType: 'Grid',
    id: 'Grid_7g8h9i',
    nameCn: '栅格布局',
    layout: true, // 布局组件标识（可包含子组件）
    data: {
      fieldName: 'grid_1',
      label: '信息录入区',
      gutter: 10, // 栅格间隔
      columns: [
        // 栅格列配置（包含子组件）
        {
          span: 12, // 占12格（24格布局）
          list: [
            // 该列中的子组件（如另一个文本框）
            {
              ControlType: 'Text',
              id: 'Text_2j3k4l',
              data: {
                fieldName: 'phone',
                label: '手机号',
                placeholder: '请输入手机号'
              }
              // ... 其他字段（controlItems、formConfig等）
            }
          ]
        },
        {
          span: 12,
          list: [
            /* 另一列的子组件 */
          ]
        }
      ]
    },
    controlItems: [
      /* 栅格布局的配置项（如调整间隔、列数） */
    ],
    formConfig: {
      /* ... */
    },
    rules: {}
  }
]

// 假设这是某个表单组件的验证规则配置
const rawRules = [
  // 类型1：enum（预设枚举规则，对应 rules.js 中的预定义规则）
  {
    type: 'enum',
    title: '数字校验规则',
    // 匿名函数表达式
    value: `(rule, value, callback) => {
      if (value === "" || value == null) {
        callback(new Error("请输入数字"));
      } else if (!/^[0-9]*$/.test(value)) {
        callback(new Error("必须为数字"));
      }
      callback();
    }`
  },

  // 类型2：func（用户自定义函数规则，依赖表单其他字段）
  {
    type: 'func',
    title: '两次密码一致校验',
    value: {
      func: `if (value !== mainData.password) {
        callback(new Error("两次密码输入不一致"));
      } else {
        callback();
      }`
    }
  },

  // 类型3：high（高级模式规则，对应 ruleform.json 中的配置）
  {
    type: 'high',
    title: '数字范围校验（1-100）',
    value: {
      ruleType: 5, // 对应代码中 ruleType == 5 的特殊处理
      validor: `(rule, value, callback) => {
        if (!/(^[1-9]*$)/.test(value)) {
          callback(new Error("请输入数字值"));
        } else if (value > 100) {
          callback(new Error("不能大于100"));
        } else if (value < 1) {
          callback(new Error("不能小于1"));
        } else {
          callback();
        }
      }`,
      trigger: 'change'
    }
  },

  // 类型3：high（普通高级规则，直接使用配置）
  {
    type: 'high',
    title: '字符串长度校验',
    value: {
      min: 2,
      max: 10,
      message: '长度必须在2-10之间',
      trigger: 'blur'
    }
  }
]

const processedRules = [
  // 1. enum 类型处理结果
  {
    validator: (rule, value, callback) => {
      if (value === '' || value == null) {
        callback(new Error('请输入数字'))
      } else if (!/^[0-9]*$/.test(value)) {
        callback(new Error('必须为数字'))
      }
      callback()
    },
    trigger: 'blur'
  },
  // 2. func 类型处理结果（自动注入 mainData）
  {
    // @ts-ignore
    validator: (rule, value, callback, mainData = props.formResult) => {
      if (value !== mainData.password) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    },
    trigger: 'blur'
  },
  // 3. high 类型（ruleType == 5）处理结果
  {
    validator: (rule, value, callback) => {
      if (!/(^[1-9]*$)/.test(value)) {
        callback(new Error('请输入数字值'))
      } else if (value > 100) {
        callback(new Error('不能大于100'))
      } else if (value < 1) {
        callback(new Error('不能小于1'))
      } else {
        callback()
      }
    },
    trigger: 'change'
  },
  // 4. high 类型（普通规则）处理结果
  {
    min: 2,
    max: 10,
    message: '长度必须在2-10之间',
    trigger: 'blur'
  }
]

// 普通模式 showRule（ 数组 ）
const showRule = [
  [
    { field: 'gender', logic: '=', value: '男' }, // 条件1：性别等于男
    { field: 'age', logic: '=', value: 30 } // 条件2：年龄等于30（实际场景可能用>，这里简化）
  ],
  [
    { field: 'marriage', logic: '=', value: '已婚' } // 条件3：婚姻状况等于已婚
  ]
]

// 转换后的高级模式结构（transformData 的返回结果）
const transformedData = {
  type: 'orgroup', // 外层是“或”关系：满足任意一个子组即可
  result: [
    {
      type: 'andgroup', // 第一个子组是“与”关系：所有条件都要满足
      result: [
        { type: 'data', data: { field: 'gender', logic: '=', value: '男' } },
        { type: 'data', data: { field: 'age', logic: '=', value: 30 } }
      ]
    },
    {
      type: 'andgroup', // 第二个子组是“与”关系（只有一个条件，直接满足）
      result: [{ type: 'data', data: { field: 'marriage', logic: '=', value: '已婚' } }]
    }
  ]
}

const showRule2 = {
  type: 'andgroup', // 外层是“与”关系：所有子组都要满足
  result: [
    {
      type: 'data',
      data: { field: 'gender', logic: '=', value: '女' } // 条件1：性别为女
    },
    {
      type: 'orgroup', // 内层是“或”关系：满足任意一个条件即可
      result: [
        { type: 'data', data: { field: 'age', logic: '=', value: 24 } }, // 条件2：年龄=24（<25）
        { type: 'data', data: { field: 'marriage', logic: '=', value: '未婚' } } // 条件3：未婚
      ]
    }
  ]
}
