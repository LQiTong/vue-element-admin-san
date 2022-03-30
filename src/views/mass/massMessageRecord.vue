<template>
  <div class="main-page-content">
    <ApeTable
      ref="apeTable"
      :data="recordList"
      :columns="columns"
      :loading="loadingStatus"
      :paging-data="pagingData"
      highlight-current-row
    >
      <el-table-column label="任务状态" width="100">
        <template slot-scope="scope">{{ $appConst.TASK_STATUS[scope.row.status] }}</template>
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.status === 0 || scope.row.status === 3"
            placement="top"
            class="mr-5"
          >
            <el-button size="mini" @click="executeTask(scope.row)">
              <svg-icon icon-class="icon-execute" />
            </el-button>
            <template slot="content">执行该任务</template>
          </el-tooltip>
          <el-tooltip placement="top">
            <el-button
              type="primary"
              plain
              size="mini"
              icon="el-icon-info"
              @click="taskDetail(scope.row)"
            />
            <template slot="content">群发详情</template>
          </el-tooltip>
          <el-tooltip placement="top">
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="delTask(scope.row)" />
            <template slot="content">删除该任务</template>
          </el-tooltip>
        </template>
      </el-table-column>
    </ApeTable>
    <ModalDialog
      :dialog-data="dialogData"
      @dialogClose="dialogClose"
      @dialogConfirm="dialogConfirm"
    >
      <ApeTable
        slot="content"
        border
        :data="detailList"
        :columns="detailColumns"
        :loading="detailLoading"
        :paging-data="detailPages"
        highlight-current-row
      >
        <el-table-column label="状态">
          <template slot-scope="scope">{{ $appConst.TASK_DETAIL_STATUS[scope.row.status] }}</template>
        </el-table-column>
        <el-table-column label="失败原因">
          <template slot-scope="scope">{{ scope.row.status === 3 ? scope.row.msg : '' }}</template>
        </el-table-column>
      </ApeTable>
    </ModalDialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {

  },
  // 定义属性
  data() {
    return {
      loadingStatus: false,
      detailLoading: false,
      pagingData: {},
      columns: [
        { title: '任务名称', value: 'task_name' },
        { title: '所选客户', value: 'remark' },
        { title: '任务总数', value: 'task_count' },
        { title: '已执行数', value: 'already_execute' },
        { title: '创建时间', value: 'add_time', type: 'time', width: '180' },
        { title: '开始时间', value: 'start_time', type: 'time', width: '180' },
        { title: '结束时间', value: 'end_time', type: 'time', width: '180' }
      ],
      detailColumns: [
        { title: '发送手机号', value: 'phone' },
        { title: '客户手机号', value: 'to_phone' },
        { title: '发送时间', value: 'send_time' },
        { title: '状态码', value: 'ret' }
      ],
      recordList: [],
      detailList: [],
      detailPages: {},
      dialogData: {
        visible: false,
        title: '群发详情',
        width: '60%',
        loading: true,
        modal: true
      }
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {
    ...mapGetters(['buttonType'])
  },
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.initRecordList()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  // 方法集合
  methods: {
    async initRecordList() {
      const data = await this.$api.taskList()
      this.recordList = data.list || []
      this.pagingData = data.pages || []
    },
    // 群发详情
    async taskDetail(row) {
      this.dialogData.visible = true
      this.dialogData.loading = true
      this.dialogData.title = `${row.task_name} 群发详情`
      const task_num = row.task_num
      const { list, pages } = await this.$api.taskDetail(task_num)
      this.detailList = list || []
      this.detailPages = pages || {}
      this.$nextTick(() => {
        this.dialogData.loading = false
      })
    },
    // 执行任务
    async executeTask(row) {
      const task_num = row.task_num
      await this.$api.taskStart(task_num)
      this.$nextTick(() => {
        this.initRecordList()
      })
    },
    // 删除任务
    delTask(row) { },
    dialogClose() {
      this.dialogData.visible = false
      this.dialogData.loading = false
    },
    dialogConfirm() {
      this.dialogData.visible = false
      this.dialogData.loading = false
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
