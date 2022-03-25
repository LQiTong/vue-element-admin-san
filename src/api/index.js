import account from './account'
import user from './user'
import device from './device'
import mass from './mass'
import menu from './menu'
import system from './system'
import target from './target'

export default {
  // 用户管理
  ...account,
  // 登录管理
  ...user,
  // 设备管理
  ...device,
  // 群发管理
  ...mass,
  // 菜单管理
  ...menu,
  // 系统管理
  ...system,
  // 目标客户管理
  ...target
}
