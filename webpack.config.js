/* eslint-env node */
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/main.ts'),
  output: {
    filename: 'launcher.js',
    library: 'launcher',
    libraryTarget: 'amd',
    path: path.resolve(__dirname, '../../build/launcher'),
  },
  mode: 'production',
  module: {
    rules: [
      { parser: { System: false } },
      {
        test: /\.(|ts)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // Needed for <script lang="ts"> to work in *.vue files; see https://github.com/vuejs/vue-loader/issues/109
              // appendTsSuffixTo: [/\.vue$/],
            },
          },
          {
            loader: 'tslint-loader',
            // Enabling the typeCheck option here causes builds to fail:
            // "Ensure that the files supplied to lint have a .ts, .tsx, .d.ts, .js or .jsx extension."
            // Commented out like this, the build runs, but all lines of *.vue files are linted, including
            // <template> and <script> blocks.
            // , options: {
            //     typeCheck: true
            // }
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            ts: 'babel-loader',
          },
          esModule: true,
        },
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.css'],
    modules: [__dirname, 'node_modules'],
  },
  plugins: [
    new CleanWebpackPlugin(['build/launcher']),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, 'src/main.ts') },
      // {from: path.resolve(__dirname, 'src/assets/styles.css')},
    ]),
    new VueLoaderPlugin(),
  ],
  devtool: 'source-map',
  externals: [/^@platafoor\/*/, /^lodash$/, /^single-spa$/],
};
