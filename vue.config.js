/**
 * @Author: guijixing
 * @Date: 2019-03-28 15:25:20
 * @Last Modified by: guijixing
 * @Last Modified time: 2019-3-30 16:02:58
 * @Description: 项目VUe配置文件
 */
const path = require("path");
const resolve = dir => {
  return path.join(__dirname, dir);
};
const mockdata = require("./src/mock/index");
module.exports = {
  publicPath: "/",
  outputDir: "dist",
  // 打包时不生成.map文件
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src")) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set("_c", resolve("src/components"));
  },
  devServer: {
    before: mockdata
  }
};
