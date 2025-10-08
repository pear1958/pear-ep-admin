const eg2 = {
  formConfig: {
    labelWidth: 120,
    labelAlign: 'right',
    size: 'small',
    styles: 'max-width: 800px; margin: 20px auto; padding: 20px; border: 1px solid #eee;',
    action: [
      { label: '提交', type: 'primary', action: 'submit' },
      { label: '重置', action: 'reset' }
    ]
  },
  components: [
    {
      ControlType: 'Grid',
      nameCn: '网格布局',
      layout: true,
      data: {
        columns: [
          {
            span: 12,
            list: [
              {
                ControlType: 'Text',
                nameCn: '文本输入',
                data: {
                  fieldName: 'username',
                  label: '用户名',
                  placeholder: '请输入用户名',
                  required: true,
                  rule: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3-10 之间', trigger: 'blur' }
                  ],
                  default: 'testuser'
                }
              },
              {
                ControlType: 'InputNumber',
                nameCn: '数字输入',
                data: {
                  fieldName: 'age',
                  label: '年龄',
                  min: 0,
                  max: 150,
                  default: 25,
                  showRule: {
                    type: 'data',
                    data: {
                      field: 'showAge',
                      logic: '==',
                      value: true
                    }
                  }
                }
              }
            ]
          },
          {
            span: 12,
            list: [
              {
                ControlType: 'RadioGroup',
                nameCn: '单选框组',
                data: {
                  fieldName: 'gender',
                  label: '性别',
                  itemConfig: {
                    value: 'male',
                    items: [
                      { label: '男', value: 'male', id: 1 },
                      { label: '女', value: 'female', id: 2 }
                    ]
                  }
                }
              },
              {
                ControlType: 'Switch',
                nameCn: '开关',
                data: {
                  fieldName: 'showAge',
                  label: '显示年龄',
                  default: true
                }
              }
            ]
          }
        ]
      }
    },
    {
      ControlType: 'Tabs',
      nameCn: '标签页',
      layout: true,
      data: {
        items: [
          {
            label: '基础信息',
            name: 'base',
            list: [
              {
                ControlType: 'Selected',
                nameCn: '下拉选择',
                data: {
                  fieldName: 'education',
                  label: '学历',
                  itemConfig: {
                    value: 'college',
                    items: [
                      { label: '高中', value: 'high', id: 1 },
                      { label: '大专', value: 'college', id: 2 },
                      { label: '本科', value: 'bachelor', id: 3 }
                    ]
                  }
                }
              }
            ]
          },
          {
            label: '扩展信息',
            name: 'ext',
            list: [
              {
                ControlType: 'JsonEditor',
                nameCn: 'JSON编辑器',
                data: {
                  fieldName: 'extInfo',
                  label: '扩展信息',
                  default: '{"hobby": ["reading", "sports"], "address": "Beijing"}'
                }
              }
            ]
          }
        ]
      }
    },
    {
      ControlType: 'Collapse',
      nameCn: '折叠面板',
      layout: true,
      data: {
        items: [
          {
            label: '验证规则演示',
            name: 'ruleDemo',
            list: [
              {
                ControlType: 'Text',
                nameCn: '邮箱',
                data: {
                  fieldName: 'email',
                  label: '邮箱地址',
                  rule: [
                    {
                      pattern: '^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$',
                      message: '请输入正确邮箱格式',
                      trigger: 'blur'
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    },
    {
      ControlType: 'FormStyle',
      nameCn: '表单样式',
      data: {
        fieldName: 'customStyle',
        label: '自定义样式',
        default: '.starfish-formitem { margin-bottom: 15px; }'
      }
    },
    {
      ControlType: 'Selecteds',
      nameCn: '多选框组',
      data: {
        fieldName: 'tags',
        label: '兴趣标签',
        itemConfig: {
          value: ['music', 'travel'],
          items: [
            { label: '音乐', value: 'music', id: 1 },
            { label: '旅行', value: 'travel', id: 2 },
            { label: '美食', value: 'food', id: 3 }
          ]
        }
      }
    }
  ]
}
