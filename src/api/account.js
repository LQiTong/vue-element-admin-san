/* eslint-disable */
import {
  fetchGet,
  fetchPost,
  fetchPatch,
  fetchPut,
  fetchDelete
} from '@/utils/request'

// 获取用户列表
export function getUserList() {
  return fetchPost(`user/list`)
}
