const Koa = require('koa');
const app =  new Koa();

const Router = require('koa-router');
// ! 启动连接 mongdb 数据库
const {connect , initSchemas} = require('./database/init.js')

// !koa-bodyparser 处理前端发送的数据
const bodyParser = require('koa-bodyparser')
app.use(bodyParser());

// !支持跨域请求
const cors = require('koa2-cors')
app.use(cors())

let back_login = require('./backApi/back_users');
let router = new Router();
router.use('/back',back_login.routes())

// ! 引入 koa-router
app.use(router.routes())
app.use(router.allowedMethods())
//立即执行函数
;(async () =>{
    await connect()
    initSchemas()
    // const User = mongoose.model('back_users')
    // let oneUser = new User({userName:'xiexie',password:'123456',userPhone: 17688758824})
    // oneUser.save().then(()=>{
    //     console.log('插入成功')
    // })

})()
app.use(async(ctx)=>{
    ctx.body = '<h1>hello Koa2</h1>'
})
// 启动服务器
app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})