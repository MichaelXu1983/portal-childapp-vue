'use strict'
const SERVICEID = require('../src/config.js').SERVICEID
const baseWebpackConfig = require('./webpack.base.conf')
const path = require('path')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const portfinder = require('portfinder')
const packageConfig = require('../package.json')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const env = require('../config/dev.env')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  // cheap-module-eval-source-map is faster for development
  devtool: 'cheap-source-map',
  output: {
    path: resolve(`dist`),
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    // publicPath: `/${SERVICEID}/`,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll
    }
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new VueLoaderPlugin(),
    // new CleanWebpackPlugin(['../dist/*.js', '../dist/*.map'], {
    //   allowExternal: true
    // }),
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      filename: path.resolve(__dirname, '../dist/index.html'),
      chunks: ['app'],
      title: SERVICEID,
      inject: true
    }),
    new webpack.ProvidePlugin({  //引入Jquery
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery':'jquery'
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/assets'),
        to: 'assets',
        ignore: ['.*']
      }
    ])
  ]
})

const createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`]
        },
        onErrors: createNotifierCallback()
      }))

      resolve(devWebpackConfig)
    }
  })
})
