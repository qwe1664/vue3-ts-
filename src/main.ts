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

// 导入的第三方格式化全局样式的包
import 'normalize.css'
import './assets/css/index.css'

// dd
import { setupStore } from './store'

const app = createApp(App)

// 按需注册element-plus
registerApp(app)
app.use(store)
setupStore()
app.use(router)
// app.use(ElementPlus)

app.mount('#app')

interface DataType {
  data: any
  returnCode: string
  success: boolean
}
