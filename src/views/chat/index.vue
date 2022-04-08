<template>
  <div class="main-page-content">
    <el-input
      v-model="demo"
      type="textarea"
      :rows="3"
      :maxlength="-1"
      :show-word-limit="false"
      :autosize="{ minRows: 3, maxRows: 4 }"
      placeholder="翻译"
      clearable
    />
    <el-select v-model="toTranslate" placeholder clearable filterable @change="translateChange">
      <el-option v-for="(item, key) in translateLanguages" :key="key" :label="item" :value="key" />
    </el-select>
    <el-button type="primary" @click="translate">翻译</el-button>
    <el-input
      v-model="toDemo"
      type="textarea"
      :rows="3"
      placeholder="译文"
      :maxlength="-1"
      :show-word-limit="false"
      :autosize="{ minRows: 3, maxRows: 4 }"
    />
  </div>
</template>

<script>
import MD5 from '@/utils/translate/md5'
import translateConfig from '@/utils/translate'
import { mapGetters } from 'vuex'
import qs from 'qs'
export default {
  components: {

  },
  // 定义属性
  data() {
    return {
      SOCKETURL: process.env.VUE_APP_SOCKET_URL,
      SOCKETIO: null,
      demo: '',
      toDemo: '',
      toTranslate: 'en'
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {
    ...mapGetters(['buttonType']),
    translateConfig() {
      return this.$utils.deepClone(translateConfig)
    },
    translateLanguages() {
      return this.$appConst.TRANSLATE_LANGUAGES
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    this.init()
  },
  // 生命周期 - 组件销毁
  destroyed() {
    this.$store.dispatch('app/openSideBar', { withoutAnimation: false })
    this.SOCKETIO.onclose = this.close
  },
  // 方法集合
  methods: {
    init() {
      if (typeof (WebSocket) === 'undefined') {
        this._warnConfirm('您的浏览器不支持socket')
      } else {
        // 实例化socket
        this.SOCKETIO = new WebSocket(this.SOCKETURL)
        // 监听socket连接
        this.SOCKETIO.onopen = this.open
        // 监听socket错误信息
        this.SOCKETIO.onerror = this.error
        // 监听socket消息
        this.SOCKETIO.onmessage = this.getMessage
      }
    },
    translateChange(toTranslate) {
      this.translateConfig.to = toTranslate
    },
    async translate() {
      // ! 百度翻译api接入相关请转：http://api.fanyi.baidu.com/doc/21
      this.translateConfig.q = this.demo
      const { appid, q, salt, key, translateURL, from, to } = this.translateConfig
      const str = appid + q + salt + key
      this.translateConfig.sign = MD5(str)
      const str2 = qs.stringify({
        from, to, sign: this.translateConfig.sign, q, appid, salt
      })
      const res = await this.$jsonp(`${translateURL}?${str2}`)
      if (!res.error_code) {
        this.toDemo = res.trans_result[0].dst || ''
      }
    },
    open() {
      console.log('socket连接成功')
    },
    error() {
      console.log('连接错误')
    },
    getMessage(msg) {
      console.log(msg.data)
    },
    send() {
      this.SOCKETIO.send()
    },
    close() {
      console.log('socket已经关闭')
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
