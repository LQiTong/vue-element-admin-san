export default {
  handle: {
    success: 'success',
    goLogin: 'goLogin',
    showToast: 'showToast',
    showAlert: 'showAlert',
    reject: 'reject' // 此种方式就把处理放到具体的页面的catch上
  },
  codeCatch(code) {
    const _this = this
    switch (code) {
      case 200:
        return _this.handle.success
      case 1002:
        return _this.handle.goLogin
      case 1003:
        return _this.handle.goLogin
      case 1004:
        return _this.handle.goLogin
      default:
        return _this.handle.showToast
    }
  }
}
