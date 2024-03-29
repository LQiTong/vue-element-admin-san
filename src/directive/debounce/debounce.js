/**
 * @author 劳启铜
 * @date 2022/04/11
 * @description 防抖，默认500ms
 * 防抖指令 单位时间只触发最后一次
 * @param {Function} fn - 执行事件
 * @param {?String|"click"} event - 事件类型 例："click"
 * @param {?Number|500} time - 间隔时间
 * @param {Array} binding.value - [fn,event,time]
 * 直接使用： <XXX v-debounce="reset]">刷新</XXX>
 * 配置事件，间隔时间： <button v-debounce="[reset,'click',500]">刷新</button>
 * 事件传递参数则： <button v-debounce="[()=>reset(param),`click`,500]">刷新</button>
 */
export default {
  bind: (el, binding) => {
    try {
      let fn
      let event = 'click'
      let time = 500
      if (typeof binding.value === 'function') {
        fn = binding.value
      } else {
        ;[fn, event = 'click', time = 500] = binding.value // eslint-disable-line
      }
      let timer
      el.addEventListener(event, () => {
        timer && clearTimeout(timer)
        timer = setTimeout(() => fn(), time)
      })
    } catch (e) {
      console.log(e)
    }
  }
}
