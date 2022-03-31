# 基于 Vue + Element-UI + admin 的后台管理系统

## clone 项目

```javascript
git clone https://github.com/LQiTong/vue-element-admin-san.git
```

## 进入项目文件夹

```javascript
cd vue-element-admin-san
```

## 安装项目依赖

```javascript
npm install or npm i
// 此处推荐使用 npm i --registry=https://registry.npmmirror.com 使用新的镜像，此前是使用 npm i --registry=https://registry.npm.taobao.org 不过这个旧淘宝镜像在 2022-05-01 好像要废弃
```

## 运行项目

```javascript
npm run dev
```

## 打包项目

```javascript
npm run build:prod
```

## 自动化部署

```javascript
// 如果需要配置，请自己建文件夹 如下：
// ├─deploy
// │  │  index.js
// │  │
// │  └─config
// │          index.js
// 其中 deploy 文件夹在根目录
// 需要安装四个包
npm i scp2 -S -D
npm i ora@4.0.4 -S // 使用这个版本，过高版本可能会报错
npm i chalk -S
npm i cross-env -S
// deploy/index.js 文件内容如下：
const scpClient = require('scp2') // 引入scp2
const ora = require('ora')
const chalk = require('chalk')
console.log(chalk.blue('正在配置项目! =====> ' + new Date().toLocaleTimeString()))
const spinner = ora('正在发布到服务器...')

const Client = require('ssh2').Client
const conn = new Client()

const server = require('./config')[(process.env.NODE_ENV || 'production')]
// console.log(server)

conn.on('ready', () => {
  conn.exec(server.command, (err, stream) => {
    if (err) {
      throw err
    }
    stream.on('close', () => {
      spinner.start()
      scpClient.scp(
        server.myPath, // 本地打包文件的位置
        {
          host: server.host,
          port: server.port,
          username: server.username,
          password: server.password,
          path: server.path
        },
        (err) => {
          spinner.stop()
          if (err) {
            console.log(chalk.red('发布失败! =====> ' + new Date().toLocaleTimeString()))
            throw err
          } else {
            console.log(chalk.green('项目发布成功! =====> ' + new Date().toLocaleTimeString()))
          }
        }
      )
      conn.end()
    }).on('data', (data) => {
      console.log('STDOUT: ' + data)
    }).stderr.on('data', (data) => {
      console.log('STDERR: ' + data)
    })
  })
}).connect({
  host: server.host,
  port: server.port,
  username: server.username,
  password: server.password
})
// deploy/config/index.js 文件内容如下：
module.exports = {
  production: {
    host: '*****', // 服务器的IP地址
    port: '22', // 服务器端口
    username: '******', // 用户名
    password: '******', // 密码
    path: '/home/wwwroot/whats-news', // 项目部署的服务器目标位置
    command: 'rm -rf /home/wwwroot/whats-news/*', // 删除命令
    myPath: './dist/' // 本地已打包好的项目目录
  }
}
// 至此，配置完毕，运行命令另外需要配置 package.json
"deploy:prod": "vue-cli-service build --mode production && cross-env ENV=production node ./deploy"
// 然后在命令行终端运行命令即可打包并且上传到服务器
npm run deploy:prod
```
