/**
 * @Author: ZT.zhangteng
 * @Date: 2019-03-28 15:25:20
 * @Last Modified by: ZT.zhangteng
 * @Last Modified time: 2019-03-28 16:44:04
 * @Description: 项目VUe配置文件
 */
const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
const mockdata = require('./src/mock/index')
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  // 打包时不生成.map文件
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
  },
  devServer: {
    before: mockdata
  }
  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?
    loaderOptions: {
      less: {
        javascriptEnabled: true //less 配置
      }
    }, // css预设器配置项
    modules: false // 启用 CSS modules for all css / pre-processor files.
  },
}
