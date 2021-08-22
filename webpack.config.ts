import path from 'path';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
const webpack = require('webpack')
// const dotenv = require('dotenv')

const distDir = path.resolve(__dirname, 'client/dist');

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

export const config: Configuration = {
  mode: 'development',
  watch: true,
  entry: './client/src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.jsx'],
  },
  output: {
    path: distDir,
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: distDir,
    compress: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.join(__dirname, 'client/src', 'index.html') }),
    new webpack.DefinePlugin({
      'process.env': {
        'CLIENT_ID':JSON.stringify('process.env.CLIENT_ID'),
        'CLIENT_SECRET': JSON.stringify('process.env.CLIENT_SECRET')
      }
       // it will automatically pick up key values from .env file
   })
  ],
};

export default config;