/**
 * @author 劳启铜
 * @date 2022/04/11
 * @description 节流，默认2000ms
 * 节流指令 单位时间只触发最后一次
 * @param {Function} fn - 执行事件
 * @param {?String|"click"} event - 事件类型 例："click"
 * @param {?Number|500} time - 间隔时间
 * @param {Array} binding.value - [fn,event,time]
 * 直接使用： <XXX v-throttle="reset]">刷新</XXX>
 * 配置事件，间隔时间： <button v-throttle="[reset,'click',500]">刷新</button>
 * 事件传递参数则： <button v-throttle="[()=>reset(param),`click`,500]">刷新</button>
 */
export default {
  bind: (el, binding) => {
    let fn
    let event = 'click'
    let time = 2000
    if (typeof binding.value === 'function') {
      fn = binding.value
    } else {
      ;[fn, event = 'click', time = 1500] = binding.value // eslint-disable-line
    }

    /**
     * el.preTime 记录上次触发事件，
     * 每次触发比较nowTime（当前时间） 和 el.preTime 的差是否大于指定的时间段！
     */
    el.addEventListener(event, () => {
      const nowTime = new Date().getTime()
      if (!el.preTime || nowTime - el.preTime > time) {
        el.preTime = nowTime
        fn()
      }
    })
  }
}
