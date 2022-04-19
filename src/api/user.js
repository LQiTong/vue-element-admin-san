/* eslint-disable */
import { fetchGet, fetchPost, fetchPatch, fetchPut, fetchDelete } from '@/utils/request'

export default {
  handleLogin(data) {
    return fetchPost(`passport/login`, data)
  }
}
