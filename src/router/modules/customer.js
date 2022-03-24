import Layout from '@/layout'

const customerRouter = {
  path: '/customer',
  component: Layout,
  redirect: '/customer',
  name: 'customer',
  alwaysShow: true,
  meta: {
    title: '客户管理',
    icon: 'icon-customer'
  },
  children: [
    // 客户列表
    {
      path: 'customer_list',
      component: () => import('@/views/customer/index'),
      name: 'customer.customer_list',
      meta: {
        title: '客户管理'
      }
    }
  ]
}
export default customerRouter
