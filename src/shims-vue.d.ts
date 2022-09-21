/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 可以解决APP.vue 文件中的$ store 报错的问题
declare let $store: any

// 可以解决 导入.json文件 报红色错的问题
declare module '*.json'
