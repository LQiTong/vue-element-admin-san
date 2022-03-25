<template>
  <el-table ref="treeTable" v-loading="loading" class="tree-table" element-loading-text="玩命加载中……" element-loading-spinner="el-icon-loading" :data="tableData" :row-style="showRow" row-key="id" v-bind="$attrs" @row-click="rowClick">
    <slot name="first-column" />
    <el-table-column v-if="columns.length===0" label="序号" width="150">
      <template slot-scope="scope">
        <span v-for="space in scope.row.depth" :key="space" class="ms-tree-space">
          <i v-if="space===scope.row.depth" class="iconfont icon-zuzhizhankai1" />
          <i v-else class="iconfont icon-kongbai" />
        </span>
        <span v-if="iconShow(scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.row)">
          <el-tooltip v-if="!scope.row._expanded" effect="dark" content="展开" placement="top-start">
            <i class="el-icon-plus" />
          </el-tooltip>
          <el-tooltip v-else effect="dark" content="折叠" placement="top-start">
            <i class="el-icon-minus" />
          </el-tooltip>
        </span>
        {{ scope.$index+1 }}
      </template>
    </el-table-column>
    <el-table-column v-for="v in columns" v-else :key="v.value" :label="v.title" :width="v.width">
      <template slot-scope="scope">
        <span v-if="v.operation">
          <span v-for="space in scope.row.depth" :key="space" class="ms-tree-space">
            <!-- <i v-if="space===scope.row.depth" class="iconfont icon-zuzhizhankai1" /> -->
            <svg-icon v-if="space===scope.row.depth" icon-class="icon-zuzhizhankai" class-name="iconfont icon-zuzhizhankai" />
            <i v-else class="iconfont icon-kongbai" />
          </span>
          <span v-if="iconShow(scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.row)">
            <el-tooltip v-if="!scope.row._expanded" effect="dark" content="展开" placement="top-start">
              <i class="el-icon-plus" />
            </el-tooltip>
            <el-tooltip v-else effect="dark" content="折叠" placement="top-start">
              <i class="el-icon-minus" />
            </el-tooltip>
          </span>
        </span>
        <i v-if="v.type=='icon'" class="iconfont" :class="scope.row[v.value]" />
        <span v-else-if="v.type == 'image'"> <img :src="scope.row[v.value]" :alt="scope.row[v.value]" height="40px"></span>
        <template v-else-if="v.value_alias && v.value">
          <el-tooltip v-if="scope.row[v.value]" effect="dark" placement="top-start" popper-class="ape-table-tooltip">
            <div slot="content" v-html="scope.row[v.value_alias]" />
            <span v-if="typeof(v)=='object'" v-html="scope.row[v.value]" />
          </el-tooltip>
          <span v-else v-html="scope.row[v.value_alias]" />
        </template>
        <span v-else>{{ scope.row[v.value] }}</span>
      </template>
    </el-table-column>
    <slot />
  </el-table>
</template>

<script>

export default {
  name: 'TreeTable',
  props: {
    data: {
      type: [Array, Object],
      required: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: true
    }

  },
  data() {
    return {
      currentRowId: null
    }
  },
  computed: {
    // 表格数据
    tableData() {
      return this.data
    }
  },
  created() {

  },
  updated() {
    this.$nextTick(() => {
      this.defaultSelectedRow(this.currentRowId)
    })
  },
  methods: {
    /**
     * @description 初始化每一行的css样式
     * @author YM
     * @date 2019-01-10
     * @returns string
     */
    showRow(r) {
      const show = (r.row.parent ? (r.row.parent._show && r.row.parent._expanded) : true)
      r.row._show = show
      return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
    },
    /**
     * @description 折叠展开操作
     * @author YM
     * @date 2019-01-10
     * @returns string
     */
    toggleExpanded(row) {
      if (typeof (row._expanded) === 'undefined') {
        this.$set(row, '_expanded', false)
      }
      row._expanded = !row._expanded
      this.$refs['treeTable'].toggleRowExpansion(row, row._expanded)
    },
    /**
     * @description 是否显示图标
     * @author YM
     * @date 2019-01-10
     * @returns string
     */
    iconShow(r) {
      return (r.children && r.children.length > 0)
    },
    /**
     * @description 通过数据id，转换对应的行index，并且选中
     * @author YM
     * @date 2019-01-10
     * @returns string
     */
    defaultSelectedRow(rowId) {
      if (rowId) {
        const list = this.tableData
        for (let i = 0, len = list.length; i < len; i++) {
          if (list[i].id === rowId) {
            this.$refs['treeTable'].setCurrentRow(list[i])
          }
        }
      } else {
        this.$refs['treeTable'].setCurrentRow()
      }
    },
    /**
     * @description 监听行的点击事件,
     * @author YM
     * @date 2019-01-10
     * @returns string
     */
    rowClick(row) {
      this.currentRowId = row.id
    },
    // 获取展开列表的id集合，后续将通过id转换数据所在行index
    getExpandIds() {
      const ids = []
      const list = this.tableData
      for (let i = 0, len = list.length; i < len; i++) {
        if (list[i]['_expanded']) {
          ids.push(list[i]['id'])
        }
      }
      return ids
    },
    // 初始化表格的展开，通过数据id的集合转换为行index，并且将其展开
    initTableExpand(ids) {
      const list = this.tableData
      for (let i = 0, len = list.length; i < len; i++) {
        if (ids.indexOf(list[i]['id']) >= 0) {
          this.toggleExpanded(list[i])
        }
      }
    }
  }
}
</script>

<style>
@keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

<style lang="scss" scope>
.iconfont {
  font-size: 12px;
}

.ms-tree-space {
  margin-left: 12px;
}

.ms-tree-space .iconfont {
  font-size: 24px;
}

table td {
  line-height: 26px;
}

.tree-ctrl {
  position: relative;
  cursor: pointer;
  color: #1890ff;
  margin-left: 8px;
}

.iconfont.icon-zuzhizhankai {
  margin-left: 8px;
}

.ms-tree-space .icon-line {
  position: fixed;
  margin-top: 6px;
}

.el-table__body tr.current-row > td {
  background-color: #91d5ff !important;
}
.el-icon + .el-icon {
  margin-left: 0 !important;
  margin-right: 4px;
}
.tree-table {
  .el-table__expand-icon,
  .el-table__placeholder,
  .el-table__indent {
    display: none !important;
  }
}
</style>
