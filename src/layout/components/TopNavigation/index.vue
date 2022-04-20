<template>
  <div class="top-navigation" :style="`background: ${variables.menuBg} !important;` ">
    <div class="left-menu">
      <logo v-if="showLogo" :style="`background: ${variables.menuBg} !important;` " class="pr-20 ml-20" :collapse="false" />
      <el-menu :default-active="activeMenu" :collapse="false" :background-color="variables.menuBg" :text-color="variables.menuText" :unique-opened="false" :active-text-color="variables.menuActiveText" :collapse-transition="false" class="top-navigation-menu" mode="horizontal">
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </div>
    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <!-- <search id="header-search" class="right-menu-item" /> -->

        <error-log class="errLog-container right-menu-item hover-effect" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>

        <lang-select class="right-menu-item hover-effect" />
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="`${avatar}?imageView2/1/w/80/h/80`" class="user-avatar" />
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>{{ $t('navbar.profile') }}</el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>{{ $t('navbar.dashboard') }}</el-dropdown-item>
          </router-link>
          <!-- <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item>
              {{ $t('navbar.github') }}
            </el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>-->
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from '../Sidebar/Logo'
import variables from '@/styles/variables.scss'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import SidebarItem from '../Sidebar/SidebarItem'
export default {
  name: 'TopNavigation',
  components: {
    Logo,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    SidebarItem
  },
  // 定义属性
  data () {
    return {

    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {
    ...mapGetters(['buttonType', 'avatar', 'sidebar', 'device', 'permission_routes']),
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      // 如果设置路径，侧边栏将高亮显示您设置的路径
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo () {
      return this.$store.state.settings.sidebarLogo
    },
    variables () {
      return variables
    },
    isCollapse () {
      return !this.sidebar.opened
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
    async logout () {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang='scss'>
@import "~@/styles/variables";
.top-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 50px;
  height: 50px;
  .left-menu {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    line-height: 50px;
    .top-navigation-menu {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 100%;
      line-height: 50px;
      // menu hover
      .submenu-title-noDropdown,
      .el-submenu__title {
        &:hover {
          background-color: inherit !important;
        }
      }
      & .nest-menu .el-submenu > .el-submenu__title,
      & .el-submenu .el-menu-item {
        min-width: $sideBarWidth !important;
        background-color: $subMenuBg !important;

        &:hover {
          background-color: inherit !important;
        }
      }
    }
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #fff;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          // border-radius: 10px;
          border-radius: 50%;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
