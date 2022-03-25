/* eslint-disable */
import {
  fetchGet,
  fetchPost,
  fetchPatch,
  fetchPut,
  fetchDelete
} from '@/utils/request'

export default {
  // 新建群发
  addSend(data) {
    return fetchPost(`task/add_send`, data)
  },

  // 执行群发
  taskStart(data) {
    return fetchPost(`task/start`, data)
  }
}
