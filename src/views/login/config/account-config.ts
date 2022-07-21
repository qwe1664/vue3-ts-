export const rules = {
  name: [
    {
      require: true,
      message: '用户名不能为空',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,9}$/,
      message: '用户名必须是5-9个数字或字母',
      trigger: 'blur'
    }
  ],
  password: [
    {
      require: true,
      message: '密码不能为空',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '密码必须是3位以上的数字或字母',
      trigger: 'blur'
    }
  ]
}
