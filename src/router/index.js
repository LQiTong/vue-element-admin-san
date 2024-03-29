/* eslint-disable space-before-function-paren */
import Vue from 'vue'
import Router from 'vue-router'
import menu from '@/api/menu'
import store from '@/store'
import { Message } from 'element-ui'
import { default_avatar } from '@/settings'

// 解决vue报错vue-router.esm.js
// const routerPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error => error)
// }

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// !!!! 请认真阅读下面注释部分

/**
 * ? 路由配置规范
 * ? 当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * hidden: true // (默认 false)

 * ? 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * redirect: 'noRedirect'

 * ? 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 * ? 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 * ? 若你想不管路由下面的 children 声明的个数都显示你的根路由
 * ? 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * alwaysShow: true

 * name: 'router-name' // ? 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta: {
 *   title: 'title', // ? 设置该路由在侧边栏和面包屑中展示的名字
 *   icon: 'svg-name', // ? 设置该路由的图标，支持 svg-class，也支持 el-icon-x element-ui 的 icon
 *   noCache: true, // ? 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
 *   breadcrumb: false, // ? 如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
 *   affix: true // ?若果设置为true，它则会固定在tags-view中(默认 false)

 * ? 当路由设置了该属性，则会高亮相对应的侧边栏。
 * ? 这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
 * ? 点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
 *  activeMenu: '/article/list'
 * }
 */
export const constantRoutes = [
  // 路由
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/exception',
    component: Layout,
    hidden: true,
    children: [
      // 错误提示页
      {
        path: '/404',
        name: 'error404',
        component: () => import('@/views/error-page/404'),
        hidden: true,
        meta: {
          title: 'error404'
        }
      },
      {
        path: '/500',
        name: 'error500',
        component: () => import('@/views/error-page/500'),
        hidden: true,
        meta: {
          title: 'error500'
        }
      },
      {
        path: '/403',
        name: 'error403',
        component: () => import('@/views/error-page/403'),
        hidden: true,
        meta: {
          title: 'error403'
        }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  }
]

// !繁琐，通过 webpack 提供的 require.context API进行导入，不用每次新增新的路由都写 import 导入
// import accountRouter from './modules/account'
// import deviceRouter from './modules/device'
// import systemRouter from './modules/system'
// import massRouter from './modules/mass'
// import targetRouter from './modules/target'
// import chatRouter from './modules/chat'

/**
 * require.context函数接受三个参数
 * 1、directory {String} -读取文件的路径
 * 2、useSubdirectories {Boolean} -是否遍历文件的子目录
 * 3、regExp {RegExp} -匹配文件的正则
 */
const APP_ROUTERS_ARR = []
const APP_ROUTERS = require.context('./modules', false, /\.js$/)
APP_ROUTERS.keys().forEach((router) => {
  APP_ROUTERS_ARR.push(APP_ROUTERS(router).default)
})
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 动态路由映射
  // 404 page must be placed at the end !!!
  ...APP_ROUTERS_ARR,
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 路由映射集合
 */
const _routesMap = {}

/**
 * 生成路由映射集合
 * @param {Array} routes
 */
const getRoutesMap = (routes) => {
  // console.log('routesMap routes --->', routes)
  routes.forEach((item) => {
    _routesMap[item.name] = item.component
    if (item.children && item.children.length > 0) {
      getRoutesMap(item.children)
    }
  })
  return _routesMap
}

export const routesMap = getRoutesMap(asyncRoutes)

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    mode: 'hash',
    scrollBehavior: (to, from, savePosition) => ({
      // 每次进到页面期望滚到的位置
      x: 0,
      y: 0
    }),
    routes: constantRoutes
  })

const router = createRouter()

/**
 * 动态生成路由
 * @param {Array} routesList
 */
const generateRoutes = (routesList) => {
  let routes = filterRoutes(routesList)

  // 本地开发环境菜单拦截
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
    routes = asyncRoutes
  }

  routes = [...routes]

  router.matcher = createRouter().matcher

  router.addRoutes(routes)

  return routes
}

/**
 * 过滤不符合规则的路由
 * @param {Array} routesList
 */
export const filterRoutes = (routesList, url = '') => {
  const routes = []
  // console.log('routesMap ---> ', routesMap)
  routesList.forEach((route) => {
    const _ = {}
    _.name = route.display_name
    _.path = url ? `${url}${route.url}` : route.url
    _.component =
      routesMap[url ? `${url.replace(/\//g, '')}.${route.url.replace(/\//g, '')}` : route.url.replace(/\//g, '')]
    _.hidden = false
    _.alwaysShow = +route.depth === 0
    _.meta = {
      requireAuth: true,
      title: route.display_name,
      icon: route.icon || '',
      activeMenu: route.activeMenu || ''
    }

    if (route.children && route.children.length > 0) {
      _.children = filterRoutes(route.children, route.url)
    }
    routes.push(_)
  })

  return routes
}

router.beforeEach(async (to, from, next) => {
  const menus = await store.dispatch('app/getMenus', to)

  if (menus.length === 0 && to.path !== '/login' && to.path !== '/500' && to.path !== '/404') {
    // 以下一行调用按钮级别权限
    await store.dispatch('permission/getMenus')
    await store.dispatch('user/setAvatar', default_avatar)
    // 以下方法调用菜单权限
    menu.getMenu().then(async (res) => {
      if (res.code === 200) {
        const routes = generateRoutes(res.data.list || [])
        store.dispatch('app/setMenus', [...constantRoutes, ...routes]).then(() => {
          let path = to.path
          if (to.path.startsWith('/home') && routes[0] && !routes[0].path.startsWith('/home')) {
            path = routes[0].redirect || routes[0].path
          }
          next({
            ...to,
            path,
            replace: true
          })
        })
      } else {
        next('/login')
      }
    })
  } else {
    next()
  }
})

router.afterEach(async (to, form) => {
  // 生产环境提示升级
  if (process.env.NODE_ENV === 'production') {
    const checkVersion = await store.dispatch('app/checkVersion')
    if (!checkVersion) {
      // 获取的版本号不等时
      Message.warning('正在自动升级新版本...')
      setTimeout(() => {
        window.location.reload() // 版本不同 刷新 获取最新版本
      }, 2000)
    }
  }
})

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
