const { resolve } = require("path");

module.exports = ({ mode }) => {
  return {
    target: "node",
    entry: {
      main: resolve(__dirname, "./index.js"),
    },
    mode: mode === "prod" ? "production" : "development",
    output: {
      filename: "bundle.js",
      path: resolve(__dirname, "./dist"),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
    resolve: {
      extensions: [".js"],
    },
    externals: {
      bufferutil: "bufferutil",
      "utf-8-validate": "utf-8-validate",
    },
  };
};
