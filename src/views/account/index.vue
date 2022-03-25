<template>
  <div class="main-page-content">
    <el-row class="mb-10">
      <el-col>
        <el-button v-if="buttonType =='text'" type="primary" size="medium" icon="iconfont " @click="newUser">添加用户</el-button>
        <el-tooltip placement="top">
          <el-button type="primary" size="medium" @click="newUser">
            <svg-icon icon-class="icon-add-list-button" />
          </el-button>
          <template slot="content">添加用户</template>
        </el-tooltip>
      </el-col>
    </el-row>

    <ApeTable ref="apeTable" :data="userList" :columns="columns" :loading="loadingStaus" :paging-data="pagingData" highlight-current-row>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip placement="top" class="mr-10">
            <el-button size="mini" @click="editUser(scope.row)">
              <i class="el-icon-edit" />
            </el-button>
            <template slot="content">编辑</template>
          </el-tooltip>
          <el-popconfirm placement="top" width="160" title="确定删除记录吗？" confirm-button-text="删除" cancel-button-text="取消" confirm-button-type="danger" cancel-button-type="text" hide-icon @confirm="delUser(scope.row)">
            <template slot="reference">
              <div class="inlineBlock">
                <el-tooltip placement="top">
                  <el-button type="danger" size="mini">
                    <i class="el-icon-delete" />
                  </el-button>
                  <template slot="content">删除</template>
                </el-tooltip>
              </div>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </ApeTable>
    <ape-drawer :drawer-data="drawerData" @drawer-close="drawerClose" @drawer-confirm="drawerConfirm">
      <div slot="ape-drawer" class="drawer-container">
        <el-form ref="userForm" :model="userForm" label-width="80px" :inline="false" size="normal">
          <el-form-item label="用户名">
            <el-input v-model="userForm.username" />
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="userForm.nickname" />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="userForm.mobile" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="userForm.email" />
          </el-form-item>
          <el-form-item label="工号">
            <el-input v-model="userForm.username" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="userForm.password" />
          </el-form-item>
          <el-form-item label="角色绑定">
            <el-input v-model="userForm.roles" />
          </el-form-item>
          <el-form-item>
            <el-button @click="drawerClose">取消</el-button>
            <el-button v-if="userType === 1" type="primary" @click="onEdit">立即修改</el-button>
            <el-button v-if="userType === 0" type="primary" @click="onNew">立即创建</el-button>
          </el-form-item>
        </el-form>
      </div>
    </ape-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      loadingStaus: true,
      userList: [],
      pagingData: {},
      currentRow: null,
      userType: 0, // 0 新增 1 编辑
      isOpenDrawer: false,
      userForm: {
        username: '',
        nickname: '',
        mobile: '',
        email: '',
        password: '',
        roles: ''
      },
      visible: false,
      columns: [
        { title: '用户名', value: 'username' },
        { title: '昵称', value: 'nickname' },
        { title: '手机号', value: 'mobile' },
        { title: '邮箱', value: 'email' },
        { title: '加入时间', value: 'create_at' }
      ],
      drawerData: {
        visible: false,
        loading: false,
        loading_text: '玩命加载中……',
        title: '编辑用户',
        mask: true,
        show_footer: false,
        width_height: '30%'
      }
    }
  },
  computed: {
    ...mapGetters(['buttonType'])
  },
  watch: {

  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const res = await this.$api.getUserList()
      if (res.code === 200) {
        this.userList = res.data.list || []
        this.pages = res.data.pages || {}
        this.loadingStaus = false
      }
    },
    drawerClose() {
      this.drawerData.visible = false
    },
    drawerConfirm() {
      this.drawerData.visible = false
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
    handleDrawerClose(done) {
      done()
    },
    newUser() {
      this.drawerData.visible = true
      this.drawerData.title = '新增用户'
      this.$resetData('userForm')
    },
    editUser(row) {
      this.userForm = row
      this.drawerData.visible = true
      this.drawerData.title = '编辑用户'
    },
    delUser(row) {

    },
    onEdit() {

    },
    onNew() {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
