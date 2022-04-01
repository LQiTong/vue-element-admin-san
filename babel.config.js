/* eslint-disable */
const prodPlugins = []
// 生产环境移除console
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push(["transform-remove-console", {
    // 保留 console.error 、 console.info 与 console.warn，相应的去除 console.log 与 console.debug
    exclude: ['info', 'error', 'warn']
  }])
}
module.exports = {
  plugins: [...prodPlugins],
  presets: [
    // https://github.com/vuejs/vue-cli/tree/master/packages/@vue/babel-preset-app
    '@vue/cli-plugin-babel/preset'
  ],
  'env': {
    'development': {
      // babel-plugin-dynamic-import-node plugin only does one thing by converting all import() to require().
      // This plugin can significantly increase the speed of hot updates, when you have a large number of pages.
      // https://panjiachen.github.io/vue-element-admin-site/guide/advanced/lazy-loading.html
      'plugins': ['dynamic-import-node']
    }
  },
}
