// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require("tcb-router")
const rp = require('request-promise')
const BASE_URL = 'http://musicapi.leanapp.cn'

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new TcbRouter({
    event
  })
  console.log(event)
  //歌单列表

  app.router("playlist", async (ctx, next) => {
    ctx.body = await cloud.database().collection('playlist')
      .skip(event.start)
      .limit(event.count)
      .orderBy("createTime", "desc")
      .get()
      .then(res => {
        return res

      })
  })
  //歌单对应的音乐列表
  app.router('musiclist', async (ctx, next) => {

    ctx.body = await rp(BASE_URL + '/playlist/detail?id=' + parseInt(event.playlistId))
      .then(res => {
        return JSON.parse(res)
      })
      .catch(err => {
        console.log(err)
      })
  })
  //具体的音乐信息
  app.router('musicUrl', async (ctx, next) => {
    ctx.body = await rp(BASE_URL + `/music/url?id=${event.musicId}`)
      .then(res => {
        return res
      })
  })


  return app.serve()

}