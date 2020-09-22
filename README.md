# 云开发 quickstart

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)
- [网易云音乐api调用文档地址](https://binaryify.github.io/NeteaseCloudMusicApi/#/)*********
- [云函数-调用的网易云音乐api服务](http://musicapi.leanapp.cn)************

//////////////////////////////////////////////////////////
一：
tcb-router  解决一个用户在一个云环境重只能创建50个云函数，相似的请求归类到同一个云函数处理 koa框架（洋葱模型***）
用法：
1.install  tcb /--/ npm install --save tcb-router
2.在云函数引入tcb /--/ const TcbRouter = rquire('tcb-router)
3.在云函数主体中生成tcb app /--/ 
  const app = new TcbRouter({event})  //传入event对象

4.公共路由
    app.use(async (ctx,next) => {      
      ctx.data = {}
      ctx.data.commonParam = "公共参数"
      ...
      ctx.next() //继续执行下一个路由
    })
5.分发路由/-依此，不同的命名有不同的子路由-/
  app.router("routerName1",async(ctx,next) => {
    ctx.paramName ="routerName1的参数1"
    ctx.next()//执行下一个中间件
  },async (ctx,next) => {
    //这是下一个中间件
    ctx.type= "第二个中介间2"
    ctx.body = ctx.data//结束这个路由，将ctx.data的数据放到body中，最后由app.serve()返回

  })

  6.在页面调用同一个云函数的不同的路由（这就是tcb-router实现一个云函数实现不同相似功能不同结果的实现）
   wx.cloud.callFunCtion({
     name:"云函数名",
     data:{
       ...//参数
     },
     $url:"routerName1",//tcb子路由的路由名

   }).then(res => {
     //输出res返回值
   })

   ///////////////////////////////////////////////////
   二：调用request-promise请求框架
    1. npm install --save  request           //在对应的云函数下，按照request
    2. npm install --save request-promise    //在对应的云函数下，按照request-promise
    3. const rp = require('request-promise') //在云函数的js中引入，rp就相当于请求入口，
    //例：rp(URL).then(res => {console.log(res)//res是接口URL的返回值})
  ////////////////////////////////////////////////////////

  三：已看到4.1 48：59