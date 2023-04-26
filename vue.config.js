const path = require('path');
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
      stylus: {
        // 引入静态 stylus 文件进行打包
        additionalData: `@import "${path.resolve(__dirname, './src/assets/css/index.styl')}";`
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        // 配置别名
        '@': path.resolve(__dirname, 'src')
      },
      fallback: {
        "path": require.resolve("path-browserify")
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('ts')
      .test(/\.ts$/)
      .use('ts-loader')
      .loader('ts-loader')
      .options({
        transpileOnly: true, // 仅转译，不进行类型检查
        appendTsSuffixTo: [/\.vue$/] // 对 .vue 文件进行类型检查
      })
  }
})
