const HtmlWebPackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")

const mode = process.env.NODE_ENV || "production"
module.exports = {
  mode,
  devtool: "source-map",
  entry: {
    main: "./src/index.jsx",
    runInPage: "./src/runInPage.js"
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
    new CopyWebpackPlugin([
      { from: "public", to: "public" },
      "./manifest.json"
    ]),
    // new BundleAnalyzerPlugin({
    //   generateStatsFile: true,
    //   statsFilename: "./bundleanalyzerstats",
    //   analyzerMode: "static",
    //   openAnalyzer: false
    // })
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  }
}
