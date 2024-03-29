import Debounce from './debounce'

const install = (Vue) => {
  Vue.directive('Debounce', Debounce)
}

if (window.Vue) {
  window.debounce = Debounce
  Vue.use(install) // eslint-disable-line
}

Debounce.install = install
export default Debounce
