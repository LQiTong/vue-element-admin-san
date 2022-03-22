module.exports = {
  /**
   * @type {string}
   * @description 页面title
   */
  title: '化三千后台管理系统',

  /**
   * @type {boolean} true | false
   * @description 是否展示侧边按钮设置
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description 是否展示标签导航
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description 是否固定页面头部
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description 是否展示侧边栏logo
   */
  sidebarLogo: true,

  /**
   * @type {boolean} true | false
   * @description 是否开启拼音搜索功能
   * Bundle size minified 47.3kb,minified + gzipped 63kb
   */
  supportPinyinSearch: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: ['production', 'development']
}
