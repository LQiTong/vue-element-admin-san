/* eslint-disable */
import {
  mapGetters
} from 'vuex'
import {
  Message,
  MessageBox
} from 'element-ui'

const Mixin = {}

Mixin.install = (Vue, options) => {
  Vue.prototype._alert = (text, cb) => {
    MessageBox.alert(text, '提示', {
      confirmButtonText: '确定',
      callback: action => {
        cb && cb(action)
      }
    })
  }

  Vue.prototype._confirm = (text, cb) => {
    MessageBox.confirm(text, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(() => {
      cb && cb(true)
    }).catch(() => {
      cb && cb(false)
    })
  }

  Vue.prototype._warnConfirm = (text, cb, conTxt = '确定', canTxt = '取消') => {
    MessageBox.confirm(text, '提示', {
      confirmButtonText: conTxt,
      cancelButtonText: canTxt,
      dangerouslyUseHTMLString: true,
      type: 'warning'
    }).then(() => {
      cb && cb(true)
    }).catch(() => {
      cb && cb(false)
    })
  }

  Vue.mixin({
    computed: {
      ...mapGetters(['buttonType'])
    },
    methods: {
      $resetData(key) {
        this[key] = this.$options.data()[key]
      },
      // 初始化表单数据
      $initFormData(formRef, options = {}) {
        this.$nextTick(() => {
          this[formRef] = options
          this.$refs[formRef].resetFields()
        })
      }
    },
  })
}

export default Mixin
