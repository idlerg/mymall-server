const mongoose = require('mongoose')
const db = 'mongodb://localhost/mymall'
const glob = require('glob')
const { resolve } = require('path')

mongoose.Promise = global.Promise
exports.connect = ()=> {
    // 连接数据库
    mongoose.connect(db)

    // 连接次数初始化
    let maxConnectTimes = 0

    return  new Promise((resolve,reject)=>{
        // 增加数据库连接的事件监听 重新连接
        mongoose.connection.on('disconnected', ()=>{
            console.log('***********数据库断开***********')
            if(maxConnectTimes<3){
                maxConnectTimes++
                mongoose.connect(db)
            }else{
                reject()
                throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
            }
        })

        // 出现连接错误
        mongoose.connection.on('error', err => {
            console.log('***********数据库错误***********')
            if(maxConnectTimes<3){
                maxConnectTimes++
                mongoose.connect(db)
            }else{
                reject(err)
                throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
            }
        })

        // 连接成功
        mongoose.connection.on('open', ()=>{
            console.log('连接成功');
            resolve()
        })
    })
}

// 导入所有的Schema
exports.initSchemas = () => {
    glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
}