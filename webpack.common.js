const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  entry: "./src/index.tsx",
  output:{
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    clean:true
  },
  plugins:[
    new HTMLWebpackPlugin({
      title:"webpack-learn",
      template:"./public/index.html"
    }),
    // new BundleAnalyzerPlugin()
  ],
  resolve:{
    extensions:[".ts", ".tsx", ".js", ".css", ".scss"]
  },
  optimization: {
    // minimizer: [
    //   (compiler) => {
    //     const TerserPlugin = require('terser-webpack-plugin');
    //     new TerserPlugin({
    //       parallel: true, // 是否开启多进程并发打包，默认是true
    //       terserOptions: {
    //         output: {
    //           comments: false,
    //         },
    //       },
    //       extractComments: true, // 是否保留剥离的注释，默认是true
    //     }).apply(compiler);
    //   },
    // ],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          "file-loader"
        ]
      },
      {
        test:/\.(woff|woff2|eot|ttf|otf)$/,
        use:[
          "file-loader"
        ]
      },
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: "/node_modules/"
      }
    ]
  }
};