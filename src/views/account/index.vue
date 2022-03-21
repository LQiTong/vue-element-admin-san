<template>
  <el-main class="section-container">
    <el-tooltip placement="top">
      <el-button type="primary" plain>
        <svg-icon icon-class="user_add" />
      </el-button>
      <template slot="content">添加用户</template>
    </el-tooltip>
    <el-table class="mt-20" :data="userList">
      <el-table-column label="序号" props="" width="80">
        <template slot-scope="scope">{{ scope.$index + 1 + (pages.current_page - 1) * pages.page_size }}</template>
      </el-table-column>
      <el-table-column label="用户名" prop="username" />
      <el-table-column label="昵称" prop="nickname" />
      <el-table-column label="手机号" prop="mobile" />
      <el-table-column label="邮箱" prop="email" />
      <el-table-column label="加入时间" prop="created_at" />
    </el-table>
    <pagination class="ta-r" :total="pages.total" :page="pages.current_page" :limit="pages.page_size" />
  </el-main>
</template>

<script>
import { getUserList } from '@/api/account'
export default {
  data() {
    return {
      userList: [],
      pages: {}
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const res = await getUserList()
      if (res.code === 200) {
        this.userList = res.data.list || []
        this.pages = res.data.pages || {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
