import Layout from '@/layout'

const massRouter = {
  path: '/task',
  component: Layout,
  redirect: '/task',
  name: 'task',
  alwaysShow: true,
  meta: {
    title: '任务管理',
    icon: 'icon-group-task'
  },
  children: [
    // 群发消息
    {
      path: 'add_send',
      component: () => import('@/views/mass/addMassMessage'),
      name: 'task.add_send',
      meta: {
        title: '群发消息'
      }
    },

    {
      path: 'record',
      component: () => import('@/views/mass/massMessageRecord'),
      name: 'task.record',
      meta: {
        title: '群发记录'
      }
    }
  ]
}
export default massRouter
