/* eslint-disable */
import {
  fetchGet,
  fetchPost,
  fetchPatch,
  fetchPut,
  fetchDelete
} from '@/utils/request'

export default {
  // 获取设备列表
  deviceList() {
    return fetchPost(`device/device_list`)
  },

  // 获取账号列表
  appList() {
    return fetchPost(`device/app_list`)
  },

  // 获取账号信息
  getAppInfo(data) {
    return fetchPost(`device/get_info`, data)
  }
}
