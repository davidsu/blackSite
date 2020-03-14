const HtmlWebPackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const path = require("path")

module.exports = {
  mode: "development",
  devServer: {
    writeToDisk: true,
    contentBase: path.join(__dirname, "/dist"),
    port: 3000,
    hot: true,
    https: true,
    disableHostCheck: true
  },
  devtool: "inline-source-map",
  optimization: {
    minimize: false
  },
  entry: {
    main: "./src/index.jsx",
    runInPage: "./src/runInPage.js",
    background: "./src/background.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      chunks: ["main"]
    }),
    new CopyWebpackPlugin([{ from: "public", to: "public" }, './manifest.json'])
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  }
}
