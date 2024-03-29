/* eslint-disable */
import { fetchGet, fetchPost, fetchPatch, fetchPut, fetchDelete } from '@/utils/request'

// 获取客户列表数据
export default {
  getTargetList() {
    return fetchPost(`target/target_list`)
  },

  // 获取客户详情数据
  targetDetail(data) {
    return fetchPost(`target/target_detail`, data)
  },

  // 导入客户
  addTarget(data) {
    return fetchPost(`target/add_target`, data)
  }
}
