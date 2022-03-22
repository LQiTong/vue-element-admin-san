import Layout from '@/layout'

const systemRouter = {
  path: '/xitong',
  component: Layout,
  redirect: '/xitong',
  name: 'xitong',
  meta: {
    title: '系统管理',
    icon: 'icon-ziyuan'
  },
  children: [
    // 菜单列表
    {
      path: 'menu',
      component: () => import('@/views/system/menuList'),
      name: 'xitong.menu',
      meta: {
        title: '菜单列表'
      }
    },
    // 角色管理
    {
      path: 'roles',
      component: () => import('@/views/system/rolesList'),
      name: 'xitong.roles',
      meta: {
        title: '角色管理'
      }
    },
    // 权限管理
    {
      path: 'permissions',
      component: () => import('@/views/system/permissionsList'),
      name: 'xitong.permissions',
      meta: {
        title: '权限管理'
      }
    }
  ]
}
export default systemRouter
