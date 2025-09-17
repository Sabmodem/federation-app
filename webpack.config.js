const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');

// Shared dependencies that must match the host app
const sharedDependencies = {
  vue: {
    singleton: true,
    requiredVersion: '^3.3.4',
    strictVersion: false
  },
};

module.exports = {
  mode: 'development',
  target: 'web',
  entry: './src/main.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/federationapp/',
    clean: true,
  },

  devServer: {
    port: 5173,
    hot: true,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),

    // Vue.js feature flags
    new webpack.DefinePlugin({
      '__VUE_OPTIONS_API__': JSON.stringify(true),
      '__VUE_PROD_DEVTOOLS__': JSON.stringify(false),
      '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': JSON.stringify(false),
    }),

    new HtmlWebpackPlugin({
      template: './index.html',
    }),

    // Module Federation Configuration
    new ModuleFederationPlugin({
      name: 'remote_app',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.vue',           // Full app (takes over page)
        './HelloWorld': './src/components/HelloWorld.vue', // Just the component
        './Export': './src/components/ComponentWrapper.vue',        // Wrapper component
      },
      shared: sharedDependencies,
    }),
  ],
};
