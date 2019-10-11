const port = 8082;
const packageName = 'app2';
module.exports = {
  lintOnSave: false,
  devServer: {
    port,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  publicPath: `http://localhost:${port}/`,
  configureWebpack: {
    devtool: "source-map",
    output: {
      library: packageName,
      libraryTarget: "umd",
      jsonpFunction: `webpackJsonp_${packageName}`
    }
  }
};
