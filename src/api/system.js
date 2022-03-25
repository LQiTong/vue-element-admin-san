/* eslint-disable */
import {
  fetchGet,
  fetchPost,
  fetchPatch,
  fetchPut,
  fetchDelete
} from '@/utils/request'

export default {
  // 获取菜单列表
  getMenuList() {
    return fetchPost(`menu/list`)
  }
}
