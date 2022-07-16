import { createApp } from 'vue'
import { registerApp } from './global'

import App from './App.vue'

import router from './router'
import store from './store'
import './service/axios_demo'
// 全局引入element组件和样式
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import hyRequest from './service'

const app = createApp(App)

// 按需注册element-plus
registerApp(app)
app.use(router)
app.use(store)
// app.use(ElementPlus)
app.mount('#app')

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

hyRequest
  .request<DataType>({
    url: '/home/multidata',
    method: 'GET',
    showLoading: false
  })
  .then((res) => {
    console.log(res.data)
  })
