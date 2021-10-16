const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'main': './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `[name].js`,
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        use: [
          'vue-loader',
        ],
      },
      // css-loader to bundle all the css files into one file and vue-style-loader
      // to add all the styles inside the <style> block in `.vue` file.
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: path.resolve(__dirname, 'public/index.html'),
      scriptLoading: 'blocking',
    }),
  ],
  stats: {
    modules: false,
    depth: false,
  },
  resolve: {
    alias: {
      '@modules': path.resolve(__dirname, 'src/js/modules'),
      '@components': path.resolve(__dirname, 'src/js/components'),
      '@node_modules': path.resolve(__dirname, 'node_modules'),
      vue: 'vue/dist/vue.js',
    },
  },
  devServer: {
    compress: true,
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
  optimization: {
    usedExports: false,
  },
  devtool: 'source-map',
};
