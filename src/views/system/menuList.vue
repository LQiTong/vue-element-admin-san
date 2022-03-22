<template>
  <el-main class="section-container">
    <el-table class="mt-20 menu-table" :data="menuList" highlight-current-row row-key="id" @current-change="handleCurrentChange">
      <el-table-column label="拖拽排序" width="100">
        <template slot-scope="scope">
          <el-button size="small" @click="rowDrop(scope.row.order, scope.$index + 1 + (pages.current_page - 1) * pages.page_size)">
            <svg-icon icon-class="icon-sort" />
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="ID" prop="id" />
      <el-table-column label="菜单名称" prop="display_name" />
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
    this.rowDrop()
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
    rowDrop(order, currentIndex) {
      const tbody = document.querySelector('.menu-table .el-table__body-wrapper tbody')
      const that = this
      Sortable.create(tbody, {
        onEnd(evt) {
          // 打印下标oldIndex旧的 newIndex新的
          // console.log(evt.newIndex)
          // console.log(evt.oldIndex)
          that.menuList.splice(evt.newIndex, 0, that.menuList.splice(evt.oldIndex, 1)[0])
          const newArray = that.menuList.slice(0)
          for (let i in newArray) {
            newArray[i].index = ++i
          }
          that.menuList = []
          that.$nextTick(() => {
            that.menuList = newArray
          })
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
