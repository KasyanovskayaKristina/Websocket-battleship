const { resolve } = require("path");


interface variants {
  mode: 'production' | 'development';
}


module.exports = ( mode : variants) => {
  return {
    target: "node",
    entry: {
      main: resolve(__dirname, "src", "ws_server", "index.ts"),
    },
   mode: mode.mode ?? 'development',
    output: {
      filename: "bundle.js",
      path: resolve(__dirname, "./dist"),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
       extensions: ['.tsx', '.ts', '.js'],
    },
    externals: {
      bufferutil: "bufferutil",
      "utf-8-validate": "utf-8-validate",
    },
  };
};
