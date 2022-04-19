import Throttle from './throttle'

const install = (Vue) => {
  Vue.directive('Throttle', Throttle)
}

if (window.Vue) {
  window.debounce = Throttle
  Vue.use(install) // eslint-disable-line
}

Throttle.install = install
export default Throttle
