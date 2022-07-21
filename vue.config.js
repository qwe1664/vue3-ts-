const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  transpileDependencies: true,
  // 1、配置方式一： CLI提供的属性
  outputDir: './build',

  devServer: {
    // 配置接口跨域 代理
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  // publicPath: './',
  // 2、配置方式二：和webpack属性完全一致，最后会进行合并
  configureWebpack: {
    resolve: {
      alias: {
        // 这个@表示的是 src根目录 在这里配置这个了 可以在导入文件的时候 使用 @符号 代替 ./
        components: '@/components'
      }
    },

    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }

  // 这个是已函数的方式去配置 会覆盖  第二种是区分环境的写法
  // configureWebpack: (config) => {
  //   config.plugins = [
  //     AutoImport({
  //       resolvers: [ElementPlusResolver()]
  //     }),
  //     Components({
  //       resolvers: [ElementPlusResolver()]
  //     })
  //   ]
  //   config.resolve.alias = {
  //     // 这里的就表示 当前目录下的绝对路径中的src目录
  //     '@': path.resolve(__dirname, 'src'),
  //     components: '@/components'
  //   }
  // }
  // chainWebpack: (config) => {

  // }
  // 3、配置方式三：用链式的方式去配置
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('components', '@/components')
  // }
})
