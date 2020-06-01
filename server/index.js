const path = require('path')
const Koa = require('koa')
const serve = require('koa-static')
const logger = require('koa-static')
const favicon = require('koa-favicon')
const storage = require('azure-storage')
const parse = require('koa-bodyparser')
const uuid = require('uuid')

const app = new Koa()
const port = process.env.PORT || 3000

app.use(favicon('./client/favicon.ico'))
app.use(logger())

require('./store').init()
app.use(serve('client'))
app.use(parse())

const userRoutes = require('./routes/users')
app.use(userRoutes.routes())

const taskRoutes = require('./routes/tasks')
app.use(taskRoutes.routes())

app.listen(port)

