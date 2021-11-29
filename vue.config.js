let externals = {}
if (process.env.NODE_ENV === 'production') {
  externals = {
    // import 时的包名称: window 全局的成员名称
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
    dayjs: 'dayjs',
    echarts: 'echarts',
    'element-ui': 'ELEMENT',
    'vue-quill-editor': 'VueQuillEditor'
  }
}
module.exports = {
  publicPath: './',
  // 增强 vue-cli 的 webpack 配置项
  configureWebpack: {
    // 打包优化
    externals: {
      // import导包的包名: window全局的成员名称
      ...externals
    }
  }
}
