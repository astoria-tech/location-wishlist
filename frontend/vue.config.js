module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: "http://backend:3000"
  }
};
