const fs = require('fs') // 引入文件模块
const Timestamp = new Date().getTime()
fs.writeFile('public/version.json', '{"version":' + Timestamp + '}\n', (err) => {
  if (err) {
    return console.info(err)
  }
})
