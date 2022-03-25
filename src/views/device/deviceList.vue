<template>
  <div class="main-page-content">
    <el-row class="mb-10">
      <el-col>
        <el-tooltip placement="top">
          <el-button type="primary" size="medium" @click="newDevice">
            <svg-icon icon-class="icon-add-list-button" />
          </el-button>
          <template slot="content">添加设备</template>
        </el-tooltip>
      </el-col>
    </el-row>

    <ApeTable ref="apeTable" :data="deviceList" highlight-current-row :columns="columns" :paging-data="pages" :loading="loadingStatus">
      <el-table-column label="操作" prop="">
        <template slot-scope="scope">
          <el-tooltip placement="top" class="mr-10">
            <el-button size="mini" @click="editDevice(scope.row)">
              <i class="el-icon-edit" />
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
      deviceList: [],
      deviceForm: {},
      deviceType: 0, // 0 新增， 1 编辑
      pages: {},
      currentRow: null,
      columns: [
        { title: 'ID', value: 'id' },
        { title: '编号', value: 'num' },
        { title: '设备IP', value: 'proxy_ip' },
        { title: '设备编码', value: 'hard_ware' },
        { title: '最后上线时间', value: 'last_time' }
      ]
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
    this.getDeviceList()
  },
  methods: {
    async getDeviceList() {
      this.loadingStatus = true
      const res = await this.$api.deviceList()
      if (res.code === 200) {
        this.deviceList = res.data.list || []
        this.pages = res.data.pages || {}
        this.loadingStatus = false
      }
    },
    handleCurrentChange(val) {
      this.currentRow = val
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
