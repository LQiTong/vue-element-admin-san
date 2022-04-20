<template>
  <div class="cut-menu-navigation">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <AppLink :to="resolvePath(dashboardRoutes[0].path)">
        <el-result class="pointer" :title="generateTitle(dashboardRoutes[0].children && dashboardRoutes[0].children[0].meta.title)">
          <div slot="icon">
            <i v-if="dashboardRoutes[0].children[0].meta.icon.includes('el-icon')" :class="dashboardRoutes[0].children[0].meta.icon"></i>
            <svg-icon v-else :icon-class="dashboardRoutes[0].children[0].meta.icon" />
          </div>
        </el-result>
      </AppLink>
      <el-popover placement="right-start" trigger="click" class="cut-menu-popover">
        <div slot="reference">
          <el-result v-for="route in selfRoutes" :key="route.path" class="pointer" :title="generateTitle(route.meta ? route.meta.title : route.children[0].meta.title)" @click.native="chooseMenu(route); isParent(route)">
            <div slot="icon">
              <i v-if="route.meta.icon.includes('el-icon')" :class="route.meta.icon"></i>
              <svg-icon v-else :icon-class="route.meta.icon" />
            </div>
          </el-result>
        </div>
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="variables.menuBg" :text-color="variables.menuText" :unique-opened="false" :active-text-color="variables.menuActiveText" :collapse-transition="false" mode="vertical">
            <sidebar-item v-for="route in selectedMenu" :key="route.path" :item="route" :base-path="parentPath ? parentPath + '/' + route.path : route.path" />
          </el-menu>
        </el-scrollbar>
      </el-popover>
    </el-scrollbar>
  </div>
</template>

<script>
import path from 'path'
import { mapGetters } from 'vuex'
import { isExternal } from '@/utils/validate'
import { generateTitle } from '@/utils/i18n'
import AppLink from '../Sidebar/Link.vue'
import SidebarItem from '../Sidebar/SidebarItem.vue'
import variables from '@/styles/variables.scss'
export default {
  name: 'CutMenuNavigation',
  components: {
    AppLink,
    SidebarItem
  },
  props: {
    basePath: {
      type: String,
      default: ''
    }
  },
  // 定义属性
  data () {
    return {
      selectedMenu: null,
      parentPath: ''
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {
    ...mapGetters(['buttonType', 'permission_routes', 'sidebar']),
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      // 如果设置路径，侧边栏将高亮显示您设置的路径
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    isCollapse () {
      return !this.sidebar.opened
    },
    variables () {
      return variables
    },
    dashboardRoutes () {
      return this.permission_routes.filter((item) => !item.hidden && !item.meta)
    },
    selfRoutes () {
      return this.permission_routes.filter((item) => !item.hidden && item.meta)
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  // 方法集合
  methods: {
    // 选择菜单
    chooseMenu (menu) {
      if (menu.children) {
        this.selectedMenu = this.$utils.deepClone(menu).children
      } else {
        this.selectedMenu = [this.$utils.deepClone(menu)]
      }
    },
    isParent (menu) {
      if (menu.children) {
        this.parentPath = menu.path
      } else {
        this.parentPath = ''
      }
    },
    resolvePath (routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    },
    generateTitle
  }
}
</script>

<style lang='scss' scoped>
</style>
