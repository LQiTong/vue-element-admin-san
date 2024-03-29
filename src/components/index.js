import Pagination from './Pagination/index.vue' // 分页
import ApeTable from './Ape/ApeTable'
import ApeDrawer from './Ape/ApeDrawer'
import TreeTable from './TreeTable/index'
import ModalDialog from './Ape/ModalDialog'
import Affix from './Affix'
const install = (Vue) => {
  Vue.component(Pagination.name, Pagination)
  Vue.component(ApeTable.name, ApeTable)
  Vue.component(ApeDrawer.name, ApeDrawer)
  Vue.component(TreeTable.name, TreeTable)
  Vue.component(ModalDialog.name, ModalDialog)
  Vue.component(Affix.name, Affix)
}

export default install
