/* eslint-disable */
import {
  fetchGet,
  fetchPost,
  fetchPatch,
  fetchPut,
  fetchDelete
} from '@/utils/request'

export default {
  getMenu() {
    return fetchPost(`menu/user_menu`)
  }
}
