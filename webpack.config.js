const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "index.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    open: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
      },
      {
        test: /\.(png|jpg)$/i,
        loader: "url-loader",
      },
    ],
  },
};
