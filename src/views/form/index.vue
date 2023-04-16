<template>
  <div class="page-box">
    <Form :options="options"></Form>
  </div>
</template>

<script lang="ts" setup name="formPage">
import { reactive } from 'vue'
import Form from '@/components/Form/index.vue'
import { FormOptions } from '@/components/Form/types'

const options: FormOptions[] = reactive([
  {
    type: 'input',
    label: '用户名',
    value: '',
    field: 'username',
    placeholder: '请输入用户名',
    rules: [
      {
        required: true,
        message: '用户名不能为空',
        trigger: 'blur'
      },
      {
        min: 2,
        max: 6,
        message: '用户名在2-6位之间',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'rate',
    label: '评分',
    value: 1,
    rules: [],
    field: 'rate',
    control: [
      {
        // value: '',
        handle: (val: any) => val < 3,
        rule: {
          type: 'input',
          field: 'reason',
          value: '默认信息',
          label: '差评原因',
          placeholder: '请输入用户名'
        },
        // 需要新增到哪个formItem的后面  不给默认就是当前formItem的后面
        appendField: 'rate'
      }
      // {
      //   value: 'append',
      //   child: true,
      //   rule: [
      //     {
      //       type: 'button',
      //       slot: 'append', // <template #append>.com</template>
      //       children: ['append'] // 文字名称
      //     }
      //   ],
      //  prependField: 'username',
      // }
    ]
  },
  {
    type: 'input',
    value: '',
    label: '密码',
    field: 'password',
    placeholder: '请输入密码',
    rules: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur'
      },
      {
        min: 6,
        max: 15,
        message: '密码在6-15位之间',
        trigger: 'blur'
      }
    ],
    // 透传给组件的属性
    attrs: {
      showPassword: true, // == show-password
      clearable: true
    }
  },
  {
    type: 'select',
    value: '',
    placeholder: '请选择职位',
    field: 'role',
    label: '职位',
    attrs: {
      style: {
        width: '100%'
      }
    },
    rules: [
      {
        required: true,
        message: '职位不能为空',
        trigger: 'change'
      }
    ],
    children: [
      {
        type: 'option',
        label: '经理',
        value: '1'
      },
      {
        type: 'option',
        label: '主管',
        value: '2'
      },
      {
        type: 'option',
        label: '员工',
        value: '3'
      }
    ]
  },
  {
    type: 'checkbox-group',
    value: [],
    field: 'like',
    label: '爱好',
    rules: [
      {
        required: true,
        message: '爱好不能为空',
        trigger: 'change'
      }
    ],
    children: [
      {
        type: 'checkbox',
        label: '足球',
        value: '1'
      },
      {
        type: 'checkbox',
        label: '篮球',
        value: '2'
      },
      {
        type: 'checkbox',
        label: '排球',
        value: '3'
      }
    ]
  },
  {
    type: 'radio-group',
    value: '',
    field: 'gender',
    label: '性别',
    rules: [
      {
        required: true,
        message: '性别不能为空',
        trigger: 'change'
      }
    ],
    children: [
      {
        type: 'radio',
        label: '男',
        value: 'male'
      },
      {
        type: 'radio',
        label: '女',
        value: 'female'
      },
      {
        type: 'radio',
        label: '保密',
        value: 'not'
      }
    ]
  }
])
</script>

<style lang="scss" scoped>
.page-box {
  width: 800px;
  padding: 20px;
}
</style>
