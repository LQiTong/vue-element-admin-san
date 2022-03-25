<template>
  <div class="main-page-content">
    <el-row class="mb-10">
      <el-col>
        <el-button v-if="buttonType =='text'" type="primary" size="medium" icon="iconfont " @click="addButton(0)">添加菜单组</el-button>
        <el-tooltip v-if="buttonType =='icon'" effect="dark" content="添加菜单组" placement="top-start">
          <el-button type="primary" size="medium" @click="addButton(0)">
            <svg-icon icon-class="icon-add-list-button" />
          </el-button>
        </el-tooltip>
      </el-col>
    </el-row>
    <TreeTable ref="treeTable" :data="menuList" :columns="columns" :loading="loadingStaus" :paging-data="pages" highlight-current-row>
      <el-table-column slot="first-column" width="80" align="center" label="Drag">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="拖动排序" placement="top-start">
            <span class="drag-handle pointer" :data-id="scope.row.id" :data-parent_id="scope.row.parent_id" :data-depth="scope.row.depth"><i class="el-icon-rank" /></span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column v-if="buttonType=='icon'" label="操作">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="添加子菜单" placement="top-start">
            <el-button size="mini" @click="addButton(scope.row.id)">
              <svg-icon icon-class="icon-add-submenu" class-name="iconfont icon" />
            </el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="编辑" placement="top-start">
            <el-button size="mini" icon="el-icon-edit" @click="editButton(scope.row.id)" />
          </el-tooltip>
          <el-tooltip effect="dark" content="删除" placement="top-start">
            <span>
              <el-popover :ref="'el-popover-'+scope.$index" placement="top" width="150">
                <p>确定要删除记录吗？</p>
                <div style="text-align: right; margin: 0;">
                  <el-button type="text" size="mini" @click="$refs['el-popover-'+scope.$index].doClose()">取消</el-button>
                  <el-button type="danger" size="mini" @click="deleteButton(scope.row.id)">确定</el-button>
                </div>
                <el-button slot="reference" type="danger" size="mini" icon="el-icon-delete" />
              </el-popover>
            </span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column v-if="buttonType=='text'" width="200" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" icon="iconfont" @click="addButton(scope.row.id)">添加子菜单</el-button>
          <el-button size="mini" @click="editButton(scope.row.id)">编辑</el-button>
          <el-popover :ref="'el-popover-'+scope.$index" placement="top" width="150">
            <p>确定要删除记录吗？</p>
            <div style="text-align: right; margin: 0;">
              <el-button type="text" size="mini" @click="$refs['el-popover-'+scope.$index].doClose()">取消</el-button>
              <el-button type="danger" size="mini" @click="deleteButton(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </TreeTable>
  </div>
</template>

<script>
import Sortable from 'sortablejs' // 列表拖拽插件，详见 http://www.sortablejs.com/options.html
import TreeTable from '@/components/TreeTable'
import { mapGetters } from 'vuex'
export default {
  components: {
    TreeTable
  },
  data() {
    return {
      loadingStaus: true,
      columns: [
        {
          title: 'ID',
          value: 'id',
          width: 50
        },
        {
          title: '菜单名称',
          operation: true, // 作为展开操作列
          value: 'display_name'
        },
        {
          title: '绑定权限',
          value: 'permission_name'
        },
        {
          title: '图标',
          type: 'icon',
          value: 'icon'
        },
        {
          title: '路径URL',
          value: 'url'
        }
      ],
      // 定义表格拖拽排序
      sortable: null,
      menuList: [],
      menuForm: {},
      pages: {},
      currentRow: null
    }
  },
  computed: {
    ...mapGetters(['buttonType'])
  },
  watch: {

  },
  mounted() {
    // 阻止默认行为
    document.body.ondrop = (e) => {
      e.preventDefault()
      e.stopPropagation()
    }
    this.$nextTick(() => {
      this.rowDrop()
    })
  },
  created() {
    this.getMenuList()
  },
  methods: {
    async getMenuList() {
      this.loadingStaus = true
      const res = await this.$api.getMenuList()
      if (res.code === 200) {
        this.menuList = res.data.list || []
        // this.pages = { ...res.data.pages, is_show: true } || {}
        this.loadingStaus = false
      }
    },
    isEleIcon(icon) {
      if (!icon) return false
      if (icon.includes('el-icon')) return true
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
    // 拖拽排序数据提交，请求接口
    async dragSortSubmit(orderIds) {
      const ids = this.$refs['treeTable'].getExpandIds()
      console.log('getExpandIds ids ---> ', ids)
      // const info = await this.$api.orderMenu(orderIds)
      // if (info === 200) {
      //   const { list } = await this.$api.getMenuList()
      //   this.menuList = []
      //   this.$nextTick(() => {
      //     this.menuList = list
      //     this.$nextTick(() => {
      //       this.$refs['treeTable'].initTableExpand(ids)
      //     })
      //   })
      // }
      // this.$message.success('保存成功!')
    },
    // 表格拖拽排序，同层级移动有效果
    rowDrop() {
      const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        handle: '.drag-handle',
        setData: (dataTransfer) => {
          dataTransfer.setData('Text', '')
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        },
        onEnd: evt => {
          const oldId = evt.item.querySelectorAll('.drag-handle')[0].dataset.id
          const Ids = []
          const orderIds = []
          const newList = []
          const tmp = el.querySelectorAll('.drag-handle')
          for (let i = 0, len = tmp.length; i < len; i++) {
            newList[tmp[i].dataset.id] = { 'parent_id': tmp[i].dataset.parent_id, 'depth': tmp[i].dataset.depth }
            Ids.push(tmp[i].dataset.id)
          }
          // 处理组合实际请求后台数据
          for (let i = 0, len = Ids.length; i < len; i++) {
            if (newList[oldId].parent_id === newList[Ids[i]].parent_id && newList[oldId].depth === newList[Ids[i]].depth) {
              orderIds.push(Ids[i])
            }
          }
          console.log('orderIds ---> ', orderIds)
          console.log('this.menuList ---> ', this.menuList)
          this.dragSortSubmit(orderIds)
        }
      })
    },
    addSubMenu(row) { },
    editMenu(row) { },
    delMenu(row) { }
  }
}
</script>

<style lang="scss" scoped>
.el-button {
  margin-right: 4px;
  margin-bottom: 4px;
}

.table-header {
  margin-bottom: 12px;
}

.drag-handle {
  font-size: 24px;
  cursor: pointer;
}
</style>
