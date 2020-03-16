const { merge } = require("lodash")
const path = require("path")
const base = require("./webpack.config")

const result = merge(base, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "/dist"),
    writeToDisk: true,
    port: 5001,
    hot: true,
    https: true,
    disableHostCheck: true
  },
  optimization: {
    minimize: false
  }
})
module.exports = result
