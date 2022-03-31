import Layout from '@/layout'

const targetRouter = {
  path: '/target',
  component: Layout,
  redirect: '/target',
  name: 'target',
  alwaysShow: true,
  meta: {
    title: '客户管理',
    icon: 'icon-customer'
  },
  children: [
    // 导入客户
    {
      path: 'add_target',
      component: () => import('@/views/target/addTarget'),
      name: 'target.add_target',
      meta: {
        title: '导入客户'
      }
    },
    // 客户列表
    {
      path: 'target_list',
      component: () => import('@/views/target/targetList'),
      name: 'target.target_list',
      meta: {
        title: '客户列表'
      }
    },
    // 客户详情
    {
      path: 'target_detail/:id',
      component: () => import('@/views/target/targetDetail'),
      name: 'target.target_detail/:id',
      hidden: true,
      meta: {
        title: '客户详情'
      }
    }
  ]
}
export default targetRouter
