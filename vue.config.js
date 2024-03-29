'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

// const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || '啊哦，页面崩溃了' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9527 // dev port

//! 获取版本号数据
const bpmVersion = (process.env.NODE_ENV === 'production' ? require('./public/version.json') : { version: 'dev' }).version

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  outputDir: process.env.OUT_PUT_DIR,
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  // 方便 production 环境进行错误排查
  productionSourceMap: process.env.NODE_ENV === 'production',
  devServer: {
    port: port,
    open: true,
    disableHostCheck: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/admin_api': {
        target: process.env.VUE_APP_BASE_URL, // 本地开发测试服务代理
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/admin_api': '/'
        }
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    // version: bpmVersion, // 版本号
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    config.plugin('html').tap((args) => {
      args[0].title = name
      args[0].version = bpmVersion
      return args
    })
    // it can improve the speed of the first screen, it is recommended to turn on preload
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config.when(process.env.NODE_ENV !== 'development', (config) => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      // https://webpack.js.org/configuration/optimization/#optimizationruntimechunk
      // 值 "single" 会创建一个在所有生成 chunk 之间共享的运行时文件
      config.optimization.runtimeChunk('single')
    })
  }
}
