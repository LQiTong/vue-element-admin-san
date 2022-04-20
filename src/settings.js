module.exports = {
  /**
   * @type {string}
   * @description 页面title
   */
  title: 'whats-new后台管理系统',

  /**
   * @type {boolean} true | false
   * @description 是否展示侧边按钮设置
   */
  showSettings: false,

  /**
   * @type {string} classic 经典布局 topLeft 左上 top 顶部导航 cutMenu 切菜布局
   * @description 布局
   */
  layout: 'classic',

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
  errorLog: ['production', 'development'],

  /**
   * 默认头像
   */
  default_avatar:
    'https://avatars.githubusercontent.com/u/26930175?s=400&u=36be7703d7aa4e9e71c5ce9fa96c29c4c51247f1&v=4'
}
