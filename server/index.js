const Koa = require('koa')
const server = new Koa()
const Router = require('koa-router')
//const mongoose = require('mongoose')
const { connect, initSchemas } = require('./database/init.js')
//接收前端发过来的请求
const bodyParser = require('koa-bodyparser')
//解决跨域问题
const cors = require('koa2-cors')

server.use(bodyParser())
server.use(cors())
//引入路由模块
let user = require('./appApi/user.js')
let goods = require('./appApi/goods.js')
//装载所有子路由
let router = new Router()
router.use('/user', user.routes())
router.use('/goods', goods.routes())
//加载路由中间件
server.use(router.routes())
server.use(router.allowedMethods())
//立即执行函数
;(async () => {
  await connect()
  initSchemas()
})()

server.listen(3000, () => {
  console.log('[Server] starting at port 3000')
})
