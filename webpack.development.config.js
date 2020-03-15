const { merge } = require("lodash")
const path = require("path")
const base = require("./webpack.config")

const result = merge(base, {
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "/dist"),
    writeToDisk: true,
    port: 3000,
    hot: true,
    https: true,
    disableHostCheck: true
  },
  optimization: {
    minimize: false
  }
})
module.exports = result
