import { parseTime } from '@/utils'
/**
 * @author 劳启铜
 * @date 2022/04/11
 * @description 添加水印
 * 添加水印 自定义指令
 * @param text 水印展示文本
 * @param time 水印时间
 * @param angle 水印旋转角度，负数逆时针旋转
 * @param width 水印宽度，默认 400px
 * @param height 水印高度，默认 200px
 * @param color 水印字体填充色，默认 rgba(0,0,0,.1)
 * @param align 水印字体对齐方式，默认 left 对齐
 * 事件传递参数则： <div id="app" v-watermark="{text:'掘金',time:Date.now(),angle:-20}"></div>
 * 摘至：https://juejin.cn/post/6994417524158775327
 */
export default {
  bind: (el, binding) => {
    const addWaterMarker = (text, time, width, height, angle, color, align, el) => {
      var canvas = document.createElement('canvas')
      canvas.width = width || 400
      canvas.height = height || 200
      var cxt = canvas.getContext('2d')
      cxt.rotate((angle * Math.PI) / 180) // 旋转弧度
      cxt.font = '16px Microsoft JhengHei' // 字体
      cxt.fillStyle = color || 'rgba(0, 0, 0, 0.10)' // 字体填充颜色
      cxt.textAlign = align || 'left' // 对齐方式
      cxt.textBaseline = 'Middle' // 基线
      cxt.fillText(text, canvas.width / 3, canvas.height / 2) // 被填充的文本
      if (time) cxt.fillText(parseTime(time), canvas.width / 3, 130) // 被填充的文本
      el.style.backgroundImage = `url(${canvas.toDataURL('image/png')})` // 插入背景图
    }
    const { text, time, angle = -20, color, align, width, height } = binding.value
    addWaterMarker(text, time, width, height, angle, color, align, el)
  }
}
