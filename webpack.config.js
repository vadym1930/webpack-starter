const webpack = require("webpack");
const path = require("path");

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: {
    yourEntryPointName: path.resolve(__dirname, "./yourEntryPointNamePath"),
  },
  output: {
    path: path.resolve(__dirname, "yourDistFolder"),
    publicPath: "/yourPublicPath/yourDistFolder/",
    chunkFilename: "[name].js",
    filename: "[name]/[name].js"
  },
  devtool: false,
  externals: {
    jquery: "jQuery"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: "file-loader?name=assets/fonts/[name].[ext]"
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: "file-loader?name=assets/images/[name].[ext]"
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]/[name].css"
    }),
    new CleanWebpackPlugin(path.resolve(__dirname, "yourDistFolder"), {}),
    new BundleAnalyzerPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        shared: {
          test: /[\\/]yourDistFolder[\\/]shared[\\/]/,
          minSize: 0
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          minSize: 0
        }
      }
    }
  }
};
