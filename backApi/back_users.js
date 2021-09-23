const Router = require('koa-router');
let router = new Router()

router.get('/backLogin', async (ctx) => {
    ctx.body = '操作登录'
})

router.get('/backUsersList', async (ctx) => {
    ctx.body = '用户列表'
})

module.exports = router