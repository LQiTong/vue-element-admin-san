/* eslint-disable */
import { fetchGet, fetchPost, fetchPatch, fetchPut, fetchDelete } from '@/utils/request'

export default {
  // 新建群发
  addSend(data) {
    return fetchPost(`task/add_send`, data)
  },

  // 执行群发
  taskStart(task_num) {
    return fetchPost(`task/start`, {
      task_num
    })
  },
  // 群发列表
  taskList(data) {
    return fetchPost(`task/list`, data)
  },
  // 群发详情
  taskDetail(task_num) {
    return fetchPost(`task/detail`, {
      task_num
    })
  }
}
