// 1、根据 process.env.NODE_ENV区分
// 开发环境：development
// 生成环境: production
// 测试环境: test

let BASE_URL = ''
const TIME_OUT = 3000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://yxlwhy.org/prod'
} else {
  BASE_URL = 'http://yxlwhy.org/test'
}

export { BASE_URL, TIME_OUT }
