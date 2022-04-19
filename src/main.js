import Vue from 'vue'

import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const {
//     mockXHR
//   } = require('../mock')
//   mockXHR()
// }

// 全局组件注册
import Components from '@/components'

Vue.use(Components)

// mixin 混入方法
import Mixin from '@/mixin'

Vue.use(Mixin)

import api from '@/api'
import * as utils from '@/utils'
import appConst from '@/utils/const'

Vue.prototype.$api = api
Vue.prototype.$utils = utils
Vue.prototype.$app_const = appConst

// 自定义指令注册
import * as selfDirective from '@/directive'
Object.keys(selfDirective).forEach((directive) => {
  Vue.directive(directive, selfDirective[directive])
})

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // 设置 element-ui 组件默认大小
  i18n: (key, value) => i18n.t(key, value)
})

// 注册全局过滤器
import * as filters from './filters' // 全局过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

// 使用 vue-jsonp ，接入百度翻译api ， 防报跨域
import { VueJsonp } from 'vue-jsonp'
Vue.use(VueJsonp)

// 使用微信表情
import { emoji2string, genString2emoji, deleteEmoji } from '@/utils/qq-emoji'
Vue.prototype.$emoji2string = emoji2string
Vue.prototype.$string2emoji = genString2emoji(require('@/assets/qqface.png'))
Vue.prototype.$deleteEmoji = deleteEmoji

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: (h) => h(App)
})
