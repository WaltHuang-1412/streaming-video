const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "~@/styles/app.scss";'
      }
    }
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://3.113.160.56:1688/'
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/styles/variables/_index.scss'),
        path.resolve(__dirname, './src/styles/mixins/_index.scss'),
        path.resolve(__dirname, './src/styles/functions/_index.scss')
      ]
    }
  }
})
