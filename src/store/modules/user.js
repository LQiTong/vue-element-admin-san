import user from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { default_avatar } from '@/settings'
import router, { resetRouter } from '@/router'
import store from '@/store'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  menus: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    console.log('userInfo --->', username, password)
    return new Promise((resolve, reject) => {
      user
        .handleLogin({
          account: username.trim(),
          password
        })
        .then(({ data }) => {
          console.log('handleLogin data --->', data)
          commit('SET_TOKEN', data.token)
          commit('SET_AVATAR', default_avatar)
          // commit('SET_AVATAR', data.avatar ? data.avatar + '' : 'https://avatars.githubusercontent.com/u/26930175?s=400&u=36be7703d7aa4e9e71c5ce9fa96c29c4c51247f1&v=4')
          commit('SET_NAME', data.nickname)
          commit('SET_INTRODUCTION', data.nickname)
          commit('SET_ROLES', 'admin')
          setToken(data.token)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  getAvatar({ commit, state }) {
    return state.avatar
  },

  setAvatar({ commit, state }, avatar) {
    commit('SET_AVATAR', avatar)
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_ROLES', 'admin')
      resolve({
        roles: 'admin'
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      store.dispatch('app/setMenus', [])
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()

      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, {
        root: true
      })
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, {
      root: true
    })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, {
      root: true
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
