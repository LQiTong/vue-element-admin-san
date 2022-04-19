/* eslint-disable */
import Cookies from 'js-cookie'
import Axios from 'axios'
import { parseTime } from '@/utils'
import { getLanguage } from '@/lang/index'
import { layout } from '@/settings'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  language: getLanguage(),
  size: Cookies.get('size') || 'medium',
  menus: [],
  layout: layout,
  // layout: localStorage.getItem('layout'),
  buttonType: process.env.VUE_APP_BUTTON_TYPE
}

const mutations = {
  TOGGLE_SIDEBAR: (state) => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  OPEN_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 1)
    state.sidebar.opened = true
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_LAYOUT: (state, layout) => {
    state.layout = layout
    localStorage.setItem('layout', layout)
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation = false }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  openSideBar({ commit }, { withoutAnimation = false }) {
    commit('OPEN_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  },
  setMenus({ commit }, menus) {
    commit('SET_MENUS', menus)
  },
  setLayout({ commit }, layout) {
    commit('SET_LAYOUT', layout)
  },
  getMenus({ state }) {
    return state.menus
  },
  getLayout({ state }) {
    return state.layout
  },
  checkVersion({ commit, state }) {
    //! 摘自https://juejin.cn/post/7086779205777621006
    return new Promise((resolve) => {
      Axios.get('/version.json?v=' + new Date().getTime(), {
        headers: {
          'Cache-Control': 'no-cache'
        },
        baseURL: window.location.origin
      })
        // 反正就是要请求到json文件的内容, 并且禁止缓存
        .then((res) => {
          const version = +res.data.version
          const clientVersion = Number(document.querySelector('#BPMVersion').content || '')
          // 以下是查看版本号上线时间 - start
          console.info(
            `%c Environment %c ${process.env.NODE_ENV} `,
            `padding: 1px; border-radius: 3px 0 0 3px;color: #fff; background: #606060`,
            `padding: 1px; border-radius: 0 3px 3px 0;color: # fff; background: #42c02e`
          )
          console.info(
            `%c Build Date %c ${parseTime(new Date(clientVersion), '{y}-{m}-{d} {h}:{i}:{s}')} `,
            'padding: 1px; border-radius: 3px 0 0 3px;color: #fff; background: #606060',
            'padding: 1px; border-radius: 0 3px 3px 0;color: # fff; background: #1475b2'
          )
          console.info(
            `%c Last Build Date %c ${parseTime(new Date(version), '{y}-{m}-{d} {h}:{i}:{s}')}`,
            'padding: 1px; border-radius: 3px 0 0 3px;color: # fff; background: #606060',
            'padding: 1px; border-radius: 0 3px 3px 0;color: # fff; background: #1475b2'
          )
          // -end
          resolve(version === clientVersion)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
