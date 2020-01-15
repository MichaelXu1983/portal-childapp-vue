'use strict'
const SERVICEID = require('../src/config.js').SERVICEID
const baseWebpackConfig = require('./webpack.base.conf')
const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const HashedChunkidsPlugin = require('./hashed-chunkids-webpack-plugin.js')

if (!/^\w[-\w]+$/.test(SERVICEID)) {
  throw new Error('SERVICEID只能由字母和数字组成，不能使用特殊符号')
}

const faster = process.env.MODE == 'faster'
process.env.NODE_ENV = 'production'

const env = require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: false,
  output: {
    filename: SERVICEID + '-[name].js',
    chunkFilename: SERVICEID + '-[name].js',
    publicPath: `${SERVICEID}/`,
    library: SERVICEID + '_[name]',
    libraryTarget: 'umd'
  },
  optimization: {
    minimizer: faster
      ? []
      : [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              sequences: false,
              conditionals: false,
              warnings: false
            }
          },
          sourceMap: true,
          parallel: true
        })
      ]
    //   splitChunks: {
    //     cacheGroups: {
    //       vendors: {
    // @@ -31,7 +43,7 @@ const webpackConfig = merge(baseWebpackConfig, {
    //       }
    //     }
    //   }
    // },
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(['../dist/**'], {
      allowExternal: true
    }),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // new UglifyJsPlugin({
    //   uglifyOptions: {
    //     compress: {
    //       warnings: false
    //     }
    //   },
    //   sourceMap: true,
    //   parallel: true
    // }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: 'assets/css/[name].[chunkhash:8].css',
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/service.html'),
      filename: path.resolve(__dirname, `../dist/index.html`),
      chunks: ['app'],
      title: SERVICEID,
      inject: true
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),

    new HashedChunkidsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/assets'),
        to: `assets`,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = webpackConfig
