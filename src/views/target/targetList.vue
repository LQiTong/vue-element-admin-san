<template>
  <div class="main-page-content">
    <el-card shadow="always" :body-style="{ padding: '20px' }" border>
      <el-form inline class="query-form">
        <el-row :gutter="24">
          <el-col :xl="8" :lg="12" :md="24">
            <el-form-item label="客户名称" size="normal" label-width="150px">
              <el-input v-model="queryParam.label_name" placeholder="请输入" size="normal" clearable />
            </el-form-item>
          </el-col>
          <el-col :xl="8" :lg="12" :md="24">
            <el-form-item label="" size="medium">
              <el-button type="primary" size="default" icon="el-icon-search" @click="handleSearch">查询</el-button>
              <el-button size="default" icon="el-icon-refresh-right" @click="handleReset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card class="mt-10" shadow="always" :body-style="{ padding: '20px' }">
      <ApeTable ref="apeTable" :data="targetList" :columns="columns" :loading="loadingStaus" :paging-data="pagingData" highlight-current-row>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip content="查看详情" placement="top" effect="dark">
              <el-button size="mini" icon="el-icon-search" @click="$router.push({ path: '/target/target_detail', query: {task_num: scope.row.task_num} })" />
            </el-tooltip>
          </template>
        </el-table-column>
      </ApeTable>
    </el-card>
  </div>
</template>

<script>
import ApeTable from '@/components/Ape/ApeTable'
export default {
  components: {
    ApeTable
  },
  data() {
    return {
      queryParam: {
        label_name: ''
      },
      loadingStaus: true,
      columns: [
        { title: '账户ID', value: 'id' },
        { title: '总数量', value: 'count' },
        { title: '账户ID', value: 'id' },
        { title: '添加时间', value: 'add_time' }
      ],
      targetList: [],
      pagingData: {}
    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {

  },
  created() {
    this.getTargetList()
  },
  methods: {
    // 查询
    handleSearch() { },
    // 重置
    handleReset() {
      this.queryParam = this.$options.data().queryParam
    },
    async getTargetList() {
      const data = await this.$api.getTargetList()
      this.targetList = data.list || []
      this.pagingData = data.pages || {}
      this.loadingStaus = false
    },
    // 分页
    switchPaging() {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
