import path from 'path';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';

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
    port: 4000,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.join(__dirname, 'client/src', 'index.html') }),
  ],
};

export default config;