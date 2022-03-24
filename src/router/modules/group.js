import Layout from '@/layout'

const groupRouter = {
  path: '/group',
  component: Layout,
  redirect: '/group',
  name: 'group',
  alwaysShow: true,
  meta: {
    title: '群发管理',
    icon: 'icon-group-task'
  },
  children: [
    // 群发任务
    {
      path: 'menu',
      component: () => import('@/views/groupTask/index'),
      name: 'group.menu',
      meta: {
        title: '群发任务'
      }
    }
  ]
}
export default groupRouter
