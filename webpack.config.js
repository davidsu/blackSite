module.exports = {
  mode: "development",
  devServer: {
    writeToDisk: true,
    port: 3000,
    hot: true,
    https: true,
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" }

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
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
}
