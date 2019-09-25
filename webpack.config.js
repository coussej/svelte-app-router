const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const mode = process.env.NODE_ENV || 'development'
const prod = mode === 'production'

const miniCssExtractPluginConfig = new MiniCssExtractPlugin({
  filename: '[name].css'
})

module.exports = {
  entry: {
    bundle: prod ? ['./src/Router.svelte'] : ['./src/example/main.js']
  },
  resolve: {
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
    alias: {
      svelte: path.resolve('node_modules', 'svelte')
    }
  },
  output: {
    path: prod ? path.join(__dirname, '/dist') : path.join(__dirname, '/public'),
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
    libraryTarget: prod ? 'commonjs-module' : undefined
  },
  module: {
    rules: [{
      test: /\.svelte$/,
      use: {
        loader: 'svelte-loader',
        options: {
          emitCss: true,
          hotReload: true
        }
      }
    },
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        }
      ]
    },
    {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: [
        { loader: 'file-loader' }
      ]
    },
    {
      test: /\.css$/,
      use: [
        prod ? MiniCssExtractPlugin.loader : 'style-loader',
        'css-loader'
      ]
    }
    ]
  },
  mode,
  plugins: [
    miniCssExtractPluginConfig
  ],
  devtool: prod ? false : 'source-map'
}
