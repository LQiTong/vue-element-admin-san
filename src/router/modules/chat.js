import Layout from '@/layout'

const chatRouter = {
  path: '/chat',
  component: Layout,
  redirect: '/chat',
  name: 'chat',
  alwaysShow: true,
  meta: {
    title: '客服管理',
    icon: 'el-icon-chat-dot-square'
  },
  children: [
    // 用户信息
    {
      path: 'customer',
      component: () => import('@/views/chat/index'),
      name: 'chat.customer',
      meta: {
        title: '客服聊天'
      }
    }
  ]
}
export default chatRouter
