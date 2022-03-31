<template>
  <div class="main-page-content">
    <el-row class="mb-20" :gutter="20">
      <el-col :span="12" :offset="0">客户详情</el-col>
    </el-row>
    <ApeTable
      ref="apeTable"
      class="mb-20"
      :data="detailList"
      :columns="columns"
      :loading="loadingStatus"
      :paging-data="pagingData"
      highlight-current-row
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadingStatus: true,
      detailList: [],
      pagingData: {},
      columns: [
        { title: '账户ID', value: 'id' },
        { title: '手机号码', value: 'mobile' },
        { title: '添加时间', value: 'add_time' }
      ]
    }
  },
  computed: {
    taskNum() {
      return this.$route.params.id || ''
    }
  },
  created() {
    this.targetDetail()
  },
  methods: {
    async targetDetail() {
      if (!this.taskNum) {
        this.$message.error('参数有误，请检查')
        this.loadingStatus = false
        return
      }
      const data = await this.$api.targetDetail({ task_num: this.taskNum })
      this.detailList = data.list || []
      this.pagingData = data.pages || {}
      this.loadingStatus = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
