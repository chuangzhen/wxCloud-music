// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const rp = require('request-promise')
// const URL = "http://musicapi.xiecheng.live/personalized"
const URL = "http://musicapi.leanapp.cn/personalized"

const playlistCollection = db.collection('playlist') //获取云数据库重名为playlist的集合

const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async(event, context) => {

  //先从服务器拿数据
  //  const list = await playlistCollection.get()
  const countResult = await playlistCollection.count();//取到对应集合的总数据条数，返回的是一个对象
  const total = countResult.total//拿到返回的对象里边的总数字段，并再下边计算要再云函数（服务端）获取几次才能全部取完
  let batchTime = Math.ceil(total / MAX_LIMIT)   

  let tasks = [];
  for (let i = 0; i < batchTime; i++) {
    let promise = playlistCollection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get();//获取数据，sikp方法便是从第几条开始，limit表示一次获取的限制条数，返回值是promise对象，多次获取的时候，可已用promise.all（promiseArr),去确保所有的数据都拿到了
    tasks.push(promise)//将返回的promise对象放到Promise.all()里边去等待全部执行完
  }
  let list = {
    data:[]
  }
  if (tasks.length>0){
    list = (await Promise.all(tasks)).reduce((acc,cur) => {
      // 将获取到的数据拼接在一起
      return {
        data:acc.data.concat(cur.data)
      }
    })
  }

  let playlist = await rp(URL).then(res => {
    return JSON.parse(res).result
  })
  //console.log(playlist)
  let newPlaylist = [];
  
  playlist.map(item => {
    //判断获取到的playlist数据有没有再数据库重已存在，存在去重
    let isNew = list.data.every(item1 => {
      return item.id !== item1.id;
    })
    if (isNew) {
      newPlaylist.push(item)
    }
  })

  for (let i = 0, len = newPlaylist.length; i < len; i++) {
    await playlistCollection.add({
      data: {
        ...newPlaylist[i],
        createTime: db.serverDate(),
      }
    }).then(res => {
      console.log("插入成功")
    }).catch(err => {
      console.log('失败')
    })
  }

  return newPlaylist.length

}