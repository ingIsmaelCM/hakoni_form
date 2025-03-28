const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
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
  output: {
    filename: 'hakoni-form.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'HakoniForm',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed)
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'demo'),
    },
    compress: true,
    port: 9000,
  },
};

