const Router = require('koa-router');
let router = new Router()
const mongoose = require('mongoose')

router.post('/backRegister', async (ctx) => {
    console.log(ctx.request.body);
    const BackUsers = mongoose.model('back_users')
    let newParams = new BackUsers(ctx.request.body)
    await newParams.save().then(()=>{
        console.log('成功');
        //成功返回code=200，并返回成功信息
        ctx.body = {
            code:200,
            message:'true'
        }
    }).catch(error=>{
        console.log(error);
         //失败返回code=500，并返回错误信息
        ctx.body={
            code:500,
            message:error
        }
    })
})

router.get('/backLogin', async (ctx) => {
    ctx.body = '操作登录'
})

router.get('/backUsersList', async (ctx) => {
    ctx.body = '用户列表'
})

module.exports = router