<template>
  <div class="main-page-content">
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div slot="header">
        <span>群发消息</span>
      </div>
      <!-- card body -->
      <el-form ref="formRef" class="form-wrap" :model="modelRef" :rules="rules" label-width="120px" size="normal">
        <el-form-item label="任务名称" size="normal" prop="task_name">
          <el-input v-model="modelRef.task_name" placeholder="请输入任务名称" />
        </el-form-item>
        <el-form-item label="目标客户" size="normal" prop="target_id">
          <el-select v-model="modelRef.target_id" placeholder="请选择" clearable filterable>
            <el-option v-for="item in targetList" :key="item.id" :label="`客户 ${item.id}`" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="消息内容" size="normal" prop="content">
          <el-input v-model="modelRef.content" type="textarea" :rows="6" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default" :loading="executeLoading" @click="executeTask">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-card>
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
      executeLoading: false,
      modelRef: {
        task_name: '',
        task_id: '',
        content: ''
      },
      targetList: [],
      rules: {
        task_name: [{ required: true, message: '任务名称不能为空', trigger: 'change' }],
        target_id: [{ required: true, message: '目标客户不能为空', trigger: 'change' }],
        content: [{ required: true, message: '内容不能为空', trigger: 'change' }]
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
    this.getTargetList()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  // 方法集合
  methods: {
    // 任务创建
    executeTask() {
      this.$refs.formRef.validate(async valid => {
        if (valid) {
          this.executeLoading = true
          const res = await this.$api.addSend(this.modelRef)
          if (res.code === 200) {
            this.executeLoading = false
            this.$message.success('新建成功')
            this.$router.push('/task/record')
          }
        } else {
          this.$message.error('请填写所有必填项')
        }
      })
    },
    async getTargetList() {
      const res = await this.$api.getTargetList()
      if (res.code === 200) {
        this.targetList = res.data.list || []
      }
    }
  }
}
</script>

<style lang='scss'>
.form-wrap {
  width: 680px;
  margin: 0 auto;

  .el-form-item {
    width: 100%;
    // .el-form-item__label 120px
    .el-form-item__content {
      width: calc(100% - 120px);
      .el-select {
        width: 100%;
      }
    }
  }
}
</style>
