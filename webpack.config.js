const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    app: ["./src/index.js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "/",
    clean: true,
  },
  devServer: {
    allowedHosts: "all",
    historyApiFallback: true,
    hot: true,
    client: {
      overlay: false,
    },
    static: path.resolve(__dirname, "dist"),
    port: 8080,
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(svg)$/,
        use: ["raw-loader"],
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader",
        options: {
          runtime: path.join(__dirname, "./handlebars-helpers.js"),
          precompileOptions: {
            knownHelpersOnly: false,
          },
        },
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/utils/", to: "./" },
        { from: "./src/img/icons/", to: "./icons" },
        { from: "./src/img/logo/", to: "./logo" },
      ],
    }),
  ],
  resolve: {
    extensions: [".json", ".scss", ".svg", "", ".js"],
    modules: ["node_modules"],
  },
};
