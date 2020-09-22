// pages/player/player.js
let musiclist = []
//表示正在播放歌曲的index
let nowPlayingIndex = 0
//获取全局唯一的背景音频管理器**
const backgroundAudioManager = wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: "",
    isPlaying: false, //false表示不播放，true表示播放
    nowPlayingIndex: 0, //当前歌曲是在歌曲列表的缓存中排第几个（下标）
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    nowPlayingIndex = options.index
    this.setData({
      nowPlayingIndex
    })
    musiclist = wx.getStorageSync("musiclist") //同步方法
    this._loadMusicDetail({
      musicId: options.musicId,
      nowPlayingIndex
    })
  },
  //获取音乐详情
  _loadMusicDetail({
    musicId,
    nowPlayingIndex
  }) {
    backgroundAudioManager.stop()//每次在请求新的音乐对象的时候，先暂停当前的北京音乐
    //在缓存的音乐数组里边获取对应下标的音乐对象
    wx.showLoading({
      title: '歌曲加载中',
    })

    let music = musiclist[nowPlayingIndex]
    wx.setNavigationBarTitle({
      title: music.name,
    })
    this.setData({
      picUrl: music.al.picUrl,
      isPlaying: false,
      nowPlayingIndex: nowPlayingIndex
    })

    //获取对应音乐id的数据
    wx.cloud.callFunction({
      name: "music",
      data: {
        $url: "musicUrl",
        musicId: musicId,
      }
    }).then(res => {
      // console.log(JSON.parse(res.result))
      let result = JSON.parse(res.result)
      backgroundAudioManager.src = result.data[0].url //歌曲的MP3地址
      backgroundAudioManager.title = music.name //歌曲名
      backgroundAudioManager.coverImgUrl = music.al.picUrl //歌曲封面
      backgroundAudioManager.singer = music.ar[0].name //
      backgroundAudioManager.epname = music.al.name
      this.setData({
        isPlaying: true
      })
      wx.hideLoading()
    })
    
  },
  //更改音乐的播放状态
  _changePlayStatus() {
    let that = this
    that.setData({
      isPlaying: !that.data.isPlaying
    })
    if (!that.data.isPlaying) {
      //暂停      
      backgroundAudioManager.pause()
    } else {
      //播放
      backgroundAudioManager.play()
    }
  },
  _preMusic() {
    let nowPlayingIndex =parseInt(this.data.nowPlayingIndex)
    if (nowPlayingIndex == 0) {
      nowPlayingIndex = musiclist.length
    }
    this._loadMusicDetail({
      musicId: musiclist[nowPlayingIndex - 1].id,
      nowPlayingIndex: nowPlayingIndex - 1
    })
  },
  _nextMusic() {
    let nowPlayingIndex =parseInt(this.data.nowPlayingIndex)
    if (nowPlayingIndex == musiclist.length) {
      nowPlayingIndex = -1      
    }        
    this._loadMusicDetail({
      musicId: musiclist[nowPlayingIndex + 1].id,
      nowPlayingIndex: nowPlayingIndex + 1
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})