// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({event})//tcb自动处理事件的参数和路由转发
  console.log(event,'event')
  app.use(async(ctx,next) => {
    console.log('进入全局中间件')
    ctx.data = {}
    ctx.data.openId = event.userInfo.openId
    await next()
    console.log('退出全局中间件')
  })

  app.router("music",async (ctx,next) => {
    console.log('进入music中间件')
    ctx.data.musicName = "数鸭子"
    await next()
    console.log('退出music中间件')
  },async (ctx,next)=> {
    ctx.data.musicType = "儿歌"
    ctx.body = {
      data:ctx.data
    }
  })

  app.router("movie", async (ctx, next) => {
    console.log('进入movie中间件')
    ctx.data.musicName = "千与千寻"
    await next()
    console.log('退出movie中间件')
  }, async (ctx, next) => {
    ctx.data.musicType = "日本动画片"
    ctx.body = {
      data: ctx.data
    }
  })






  return app.serve()//tcb一定要有去返回服务
}