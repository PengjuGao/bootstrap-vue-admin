// vue.config.js
// https://cli.vuejs.org/zh/config/#全局-cli-配置
module.exports = {
  runtimeCompiler: true,
  lintOnSave: false,
  devServer: {
    port: 8027,
    // proxy: 'http://localhost:8027'
    proxy:{
      '/api':{
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite:{
          '^/api':'/'
        }
      }
    }
  }
};
