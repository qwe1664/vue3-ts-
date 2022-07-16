/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 可以解决APP.vue 文件中的$ store 报错的问题
declare let $store: any
