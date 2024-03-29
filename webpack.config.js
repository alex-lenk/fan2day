const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
  mode: "production",
  entry: {
    "scripts": "./src/js/scripts.js",
    "scripts.min": "./src/js/scripts.js",
    "scripts-mobile": "./src/js/scripts-mobile.js",
    "scripts-mobile.min": "./src/js/scripts-mobile.js"
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  output: {
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /^_(\w+)(\.js)$|node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.min\.js$/,
        parallel: true,
        uglifyOptions: {
          output: {
            comments: false
          }
        }
      }),
    ],
  },
  plugins: []
};

module.exports = config;
