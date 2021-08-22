import path from 'path';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif) (\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            limit: 100000,
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }
      },

			{
				test: /\.css$/,
				use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
					{
            loader: 'sass-loader'
					}
          ,]},
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.jsx', '.css', 'scss'],
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
   }),
   new MiniCssExtractPlugin()
  ],
};

export default config;