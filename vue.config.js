const port = 8080;
module.exports = {
  lintOnSave: false,
  devServer: {
    port,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }
};
