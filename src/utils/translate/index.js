//! 百度翻译api接入相关请转：http://api.fanyi.baidu.com/doc/21
module.exports = {
  TRANSLATE_CONFIG: {
    translateURL: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
    /**
     * !以下为百度翻译开放平台api规定需要传的参数
     */
    appid: '20220407001162591', //! 百度翻译开放平台 注册使用的 appid，必须要为字符串类型，不然会报 52003 未授权错误
    key: 'Ch5LDzu1pW1TDhfgF43D',
    salt: new Date().getTime(),
    q: null, // 需要翻译的内容
    from: 'auto', // 源语言
    to: 'en', // 目标语言
    sign: null // 签名 需要使用MD5加密生成
  },
  LANGUAGE_IDETIFY: {
    languageIdentifyURL: 'https://fanyi-api.baidu.com/api/trans/vip/language',
    /**
     * !以下为百度翻译开放平台 语种识别API 规定要传参数
     */
    appid: '20220407001162591',
    salt: new Date().getTime(),
    key: 'Ch5LDzu1pW1TDhfgF43D',
    sign: null,
    q: null
  }
}
