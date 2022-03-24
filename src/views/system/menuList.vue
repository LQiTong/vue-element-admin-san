<template>
  <el-main class="section-container">
    <el-table class="mt-20 menu-table" :data="menuList" highlight-current-row row-key="id" @current-change="handleCurrentChange">
      <el-table-column label="拖拽排序" width="100">
        <template slot-scope="scope">
          <el-tooltip content="拖动排序" placement="top" effect="dark">
            <span class="drag-handle" :data-id="scope.row.id" :data-parent_id="scope.row.parent_id" :data-depth="scope.row.depth">
              <svg-icon icon-class="icon-sort" />
            </span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="ID" prop="id" />
      <el-table-column label="菜单名称" prop="display_name">
        <template slot-scope="scope">
          <svg-icon v-if="+scope.row.depth" icon-class="icon-zuzhizhankai" />
          {{ scope.row.display_name }}
        </template>
      </el-table-column>
      <el-table-column label="绑定权限" prop="permission_name" />
      <el-table-column label="图标" prop="">
        <template slot-scope="scope">
          <span v-if="!scope.row.icon" />
          <i v-else-if="isEleIcon(scope.row.icon)" :class="scope.row.icon" />
          <svg-icon v-else :icon-class="scope.row.icon" />
        </template>
      </el-table-column>
      <el-table-column label="路径URL" prop="url" />
      <el-table-column label="操作" prop="">
        <template slot-scope="scope">
          <el-tooltip placement="top">
            <el-button size="mini" @click="addSubMenu(scope.row)">
              <svg-icon icon-class="icon-add-submenu" />
            </el-button>
            <template slot="content">添加子菜单</template>
          </el-tooltip>
          <el-tooltip placement="top">
            <el-button size="mini" @click="editMenu(scope.row)">
              <i class="el-icon-edit" />
            </el-button>
            <template slot="content">编辑</template>
          </el-tooltip>
          <el-tooltip placement="top">
            <el-button size="mini" type="danger" @click="delMenu(scope.row)">
              <i class="el-icon-delete" />
            </el-button>
            <template slot="content">删除</template>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
import Sortable from 'sortablejs' // 列表拖拽插件，详见 http://www.sortablejs.com/options.html
import { getMenuList } from '@/api/system'
export default {
  data() {
    return {
      menuList: [],
      menuForm: {},
      pages: {},
      currentRow: null
    }
  },
  computed: {

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
      const res = await getMenuList()
      if (res.code === 200) {
        this.menuList = res.data.list || []
        this.pages = res.data.pages || {}
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
    // async dragSortSubmit(orderIds) {
    //   const ids = this.$refs['treeTable'].getExpandIds()
    //   const info = await this.$api.orderMenu(orderIds)
    //   if (info === 200) {
    //     const { list } = await this.$api.getMenuList()
    //     this.menuList = []
    //     this.$nextTick(() => {
    //       this.menuList = list
    //       this.$nextTick(() => {
    //         this.$refs['treeTable'].initTableExpand(ids)
    //       })
    //     })
    //   }
    //   this.$message.success('保存成功!')
    // },
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
          // this.dragSortSubmit(orderIds)
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
</style>
