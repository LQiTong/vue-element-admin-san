<template>
  <div class="main-page-content">
    <el-row class="mb-10">
      <el-col>
        <el-tooltip placement="top">
          <el-button type="primary" @click="newApp">
            <svg-icon icon-class="icon-add-list-button" />
          </el-button>
          <template slot="content">添加账号</template>
        </el-tooltip>
      </el-col>
    </el-row>

    <ApeTable
      res="apeTable"
      :data="appList"
      :loading="loadingStatus"
      :columns="columns"
      :paging-data="pages"
      highlight-current-row
    >
      <el-table-column label="状态" prop="state">
        <template slot-scope="scope">{{ $appConst.appState[scope.row.state] }}</template>
      </el-table-column>
      <el-table-column label="上次登录" prop="login_time">
        <template slot-scope="scope">{{ scope.row.login_time | parseTime }}</template>
      </el-table-column>
      <el-table-column label="操作" prop>
        <template slot-scope="scope">
          <el-tooltip placement="top" class="mr-10">
            <el-button @click="editApp(scope.row)">
              <i class="el-icon-edit"></i>
            </el-button>
            <template slot="content">编辑</template>
          </el-tooltip>
        </template>
      </el-table-column>
    </ApeTable>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadingStatus: false,
      appList: [],
      appType: 0, // 0 新增， 1 编辑
      appForm: {},
      pages: {},
      currentRow: null,
      columns: [
        { title: '所属用户ID', value: 'user_id' },
        { title: '设备编码', value: 'hard_ware' },
        { title: '账户编号', value: 'app_id' },
        { title: '账户ID', value: 'account' }
      ]
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
    this.getAppList()
  },
  methods: {
    async getAppList() {
      this.loadingStatus = true
      const { data } = await this.$api.appList()
      this.appList = data.list || []
      this.pages = { ...data.pages, is_show: true } || {}
      this.loadingStatus = false
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
    newApp() { },
    editApp() { }
  }
}
</script>

<style lang="scss" scoped>
</style>
