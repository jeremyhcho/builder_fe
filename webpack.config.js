require('dotenv').config()

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const dotEnv = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('development'),
    'PUSHER_KEY': JSON.stringify(process.env.PUSHER_KEY),
    'STRIPE_KEY': JSON.stringify(process.env.STRIPE_KEY)
  }
})

const VENDOR_LIBS = [
  'axios', 'classnames', 'react', 'react-dom',
  'react-redux', 'redux', 'redux-saga', 'react-router', 'react-router-dom'
]

const config = {
  devtool: 'eval-source-map',
  entry: {
    bundle: [
      'babel-polyfill',
      'react-hot-loader/patch',
      './src/index.js'
    ],
    styleguide: ['babel-polyfill', 'react-hot-loader/patch', './src/styleguide.js'],
    vendor: VENDOR_LIBS,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: /node_modules\/react/,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'react-hot-loader/webpack'
      },
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
        query: {
          plugins: [
            'transform-react-jsx',
            [
              'react-css-modules',
              {
                webpackHotModuleReloading: true,
                exclude: 'node_modules',
                generateScopedName: '[name]__[local]___[hash:base64:5]',
                filetypes: {
                  '.scss': {
                    syntax: 'postcss-scss',
                    plugins: ['postcss-nesting', 'postcss-css-variables']
                  }
                }
              }
            ]
          ]
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader?sourceMap',
          'css-loader?importLoader=1&modules&localIdentName=[name]__[local]___[hash:base64:5]',
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          'file-loader',
          'image-webpack-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true
            }
          }
        ]
      }
    ]
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    inline: true,
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
    proxy: {
      '*': 'http://localhost:3001'
    },
    stats: {
      colors: true
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    dotEnv,
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      chunks: ['bundle', 'vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      filename: 'styleguide.html',
      template: 'src/styleguide.html',
      chunks: ['styleguide', 'vendor', 'manifest']
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'src/Components'),
      Containers: path.resolve(__dirname, 'src/Containers'),
      Helpers: path.resolve(__dirname, 'src/Helpers'),
      Actions: path.resolve(__dirname, 'src/Actions'),
      Constants: path.resolve(__dirname, 'src/Constants'),
      Reducers: path.resolve(__dirname, 'src/Reducers'),
      Sagas: path.resolve(__dirname, 'src/Sagas'),
      Apis: path.resolve(__dirname, 'src/Apis'),
      Assets: path.resolve(__dirname, 'src/Assets'),
      Config: path.resolve(__dirname, 'src/Config'),
      Layouts: path.resolve(__dirname, 'src/Layouts'),
      Routines: path.resolve(__dirname, 'src/Routines')
    },
    extensions: ['.js', '.scss', '.svg']
  }
}

module.exports = config
