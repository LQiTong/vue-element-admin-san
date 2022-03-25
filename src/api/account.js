/* eslint-disable */
import {
  fetchGet,
  fetchPost,
  fetchPatch,
  fetchPut,
  fetchDelete
} from '@/utils/request'

// 获取用户列表
export default {
  getUserList() {
    return fetchPost(`user/list`)
  },

  // 获取角色信息
  getRoles() {
    return fetchPost(`user/get_roles`)
  },

  // 用户编辑、新增
  userStore(data) {
    return fetchPost(`user/store`, data)
  }
}
