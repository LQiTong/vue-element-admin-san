/* eslint-disable */
import WaterMark from "./waterMark";

const install = function (Vue) {
  Vue.directive('WaterMark', WaterMark)
}

if (window.Vue) {
  window.waterMark = WaterMark
  Vue.use(install); // eslint-disable-line
}

WaterMark.install = install
export default WaterMark
