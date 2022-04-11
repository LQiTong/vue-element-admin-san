<template>
  <div class="main-page-content">
    <div class="home">
      <!-- <div class="count">
        <p>在线人数：{{ count }}</p>
      </div>-->
      <div class="content">
        <div ref="chatBox" class="chat-box">
          <div v-for="(item, index) in chatArr" :key="index" class="chat-item">
            <div v-if="item.name === myName" class="chat-msg mine">
              <p class="msg mineBg">{{ item.txt }}</p>
              <p
                class="user"
                :style="{ background: randomRgb() }"
              >{{ item.name.substring(item.name.length - 5, item.name.length) }}</p>
            </div>
            <div v-else class="chat-msg other">
              <p
                class="user"
                :style="{ background: item.bg }"
              >{{ item.name.substring(item.name.length - 5, item.name.length) }}</p>
              <p class="msg otherBg">{{ item.txt }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="footer_top mt-20">
          <el-form ref="form" label-width="120px" inline>
            <el-form-item label="自动检测：">
              <el-select v-model="source" placeholder="自动检测" class="mr-20" disabled>
                <el-option
                  v-for="(item, key) in translateLanguages"
                  :key="key"
                  :label="item"
                  :value="key"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="目标语言：">
              <el-select
                v-model="toTranslate"
                class="mr-20"
                placeholder
                clearable
                filterable
                @change="translateChange"
              >
                <el-option
                  v-for="(item, key) in translateLanguages"
                  :key="key"
                  :label="item"
                  :value="key"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button class="mr-20" type="primary" @click="translate">翻译</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="footer_bottom mt-20">
          <div class="footer_bottom_left">
            <el-input
              ref="message"
              v-model="demo"
              type="textarea"
              :rows="5"
              :maxlength="-1"
              :show-word-limit="false"
              placeholder="说点什么..."
              clearable
              resize="none"
              @keyup.enter.native="send"
              @change="checkSourceLanguage"
            />
            <el-input
              v-model="toDemo"
              type="textarea"
              :rows="5"
              placeholder="译文"
              :maxlength="-1"
              :show-word-limit="false"
              resize="none"
            />
          </div>
          <div class="footer_bottom_right">
            <el-button type="success" @click="send">发送</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MD5 from '@/utils/translate/md5'
import { LANGUAGE_IDETIFY, TRANSLATE_CONFIG } from '@/utils/translate'
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
      toTranslate: 'en',
      source: 'zh',
      chatArr: [
        {
          name: new Date().getTime() + 1 + '',
          txt: '我很中意你啊',
          bg: 'rgba(255,0,0,.15)'
        }
      ],
      myName: new Date().getTime().toString(),
      bg: ''
    }
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {
    ...mapGetters(['buttonType']),
    translateConfig() {
      return this.$utils.deepClone(TRANSLATE_CONFIG)
    },
    languageIdentify() {
      return this.$utils.deepClone(LANGUAGE_IDETIFY)
    },
    translateLanguages() {
      return this.$app_const.TRANSLATE_LANGUAGES
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
    send() {
      if (this.demo.value.trim().length > 0) {
        const obj = {
          name: this.myName,
          txt: this.demo,
          bg: this.randomRgb()
        }
        this.SOCKETIO.send(JSON.stringify(obj))
        this.demo = ''
        this.$refs.message.focus()
      }
    },
    randomRgb() {
      const R = Math.floor(Math.random() * 130 + 110)
      const G = Math.floor(Math.random() * 130 + 110)
      const B = Math.floor(Math.random() * 130 + 110)
      return 'rgb(' + R + ',' + G + ',' + B + ')'
    },
    translateChange(toTranslate) {
      this.translateConfig.to = toTranslate
    },
    checkSourceLanguage(sourceLanguage) {
      this.check(sourceLanguage)
    },
    async check(value) {
      this.languageIdentify.q = value
      const { appid, q, salt, key, languageIdentifyURL } = this.languageIdentify
      const str = appid + q + salt + key
      this.languageIdentify.sign = MD5(str)
      const str2 = qs.stringify({ q, salt, sign: this.languageIdentify.sign, appid })
      const res = await this.$jsonp(`${languageIdentifyURL}?${str2}`)
      console.log('====================================')
      console.log('res ---> ', res)
      console.log('====================================')
      if (res.error_msg === 'success') {
        this.source = res.data.src || ''
      } else {
        this.source = 'none'
        // this.$message.error('暂不支持该语种的检测')
      }
    },
    async translate() {
      // ! 百度翻译api接入相关请转：http://api.fanyi.baidu.com/doc/21
      this.translateConfig.q = this.demo
      const { appid, q, salt, key, translateURL, from, to } = this.translateConfig
      const str = appid + q + salt + key
      this.translateConfig.sign = MD5(str)
      const str2 = qs.stringify({ from, to, sign: this.translateConfig.sign, q, appid, salt })
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
    // send() {
    //   this.SOCKETIO.send()
    // },
    close() {
      console.log('socket已经关闭')
    }
  }
}
</script>

<style lang='scss' scoped>
.count {
  height: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eeeae8;
  font-size: 16px;
}
.content {
  width: 100%;
  height: 80%;
  min-height: 750px;
  // background-color: #f4f4f4;
  border: 1px solid #eeeeee;
  border-radius: 10px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  overflow: hidden;
}
.footer {
  width: 100%;
  min-height: 200px;
  background-color: #fff;
  border: 1px solid #eeeeee;
  border-radius: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  .footer_top {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .footer_bottom {
    height: 117px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &_left {
      width: calc(100% - 160px);
      height: 100%;
      .el-textarea {
        width: 50%;
        height: 100%;
      }
    }
    &_right {
      width: 160px;
      height: 100%;
      .el-button {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.active {
  background: #98e165;
  color: #fff;
}
.chat-box {
  height: 100%;
  padding: 0 20px;
  overflow-y: auto;
}
.chat-msg {
  display: flex;
  align-items: center;
}
.user {
  font-weight: bold;
  color: #fff;
  position: relative;
  word-wrap: break-word;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 60px;
  height: 60px;
  line-height: 60px;
  border-radius: 8px;
  text-align: center;
}
.msg {
  margin: 0 5px;
  max-width: 74%;
  white-space: normal;
  word-break: break-all;
  color: #333;
  border-radius: 8px;
  padding: 10px;
  text-align: justify;
  font-size: 16px;
  box-shadow: 0px 0px 10px #f4f4f4;
}
.chat-item {
  margin: 20px 0;
  animation: up-down 1s both;
}
@keyframes up-down {
  0% {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }

  100% {
    opacity: 1;
    transform: none;
  }
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  display: none;
}
::-webkit-scrollbar-thumb {
  background-color: #d1d1d1;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  border-left: 2px solid transparent;
  border-top: 2px solid transparent;
}
.mine {
  justify-content: flex-end;
}
.other {
  justify-content: flex-start;
}
.mineBg {
  background: #98e165;
}
.otherBg {
  background: #fff;
}
</style>
