const HtmlWebPackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")

const getSourceMapOption = () =>
  process.env.NO_SOURCE_MAP ? "none" : "source-map"
module.exports = {
  mode: "production",
  devtool: getSourceMapOption(),
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
    // new BundleAnalyzerPlugin({
    //   generateStatsFile: true,
    //   statsFilename: "./bundleanalyzerstats",
    //   analyzerMode: "static",
    //   openAnalyzer: false
    // }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      chunks: ["main"]
    }),
    new CopyWebpackPlugin([{ from: "public", to: "public" }, "./manifest.json"])
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  }
}
