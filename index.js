const Koa = require('koa');
const app =  new Koa();
// const mongoose = require('mongoose')
const Router = require('koa-router');
// const {connect , initSchemas} = require('./database/init.js')

const bodyParser = require('koa-bodyparser')
app.use(bodyParser());

let back_login = require('./backApi/back_users');
let router = new Router();
router.use('/back',back_login.routes())

app.use(router.routes())
app.use(router.allowedMethods())
//立即执行函数
// ;(async () =>{
//     await connect()
//     initSchemas()
//     const User = mongoose.model('back_users')
//     let oneUser = new User({userName:'xiexie',password:'123456',userPhone: 17688758824})
//     oneUser.save().then(()=>{
//         console.log('插入成功')
//     })

// })()
app.use(async(ctx)=>{
    ctx.body = '<h1>hello Koa2</h1>'
})

app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})