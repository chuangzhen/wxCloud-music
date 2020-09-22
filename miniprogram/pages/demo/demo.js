// pages/demo/demo.js
import regeneratorRuntime from '../../utils/runtime.js' //可以再小程序端试用async await
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // wx.cloud.callFunction({
    //   name: 'login'
    // }).then(res => {
    //   console.log(res);
    //   this.setData({
    //     openid: res.result.openid
    //   })
    // })

  },

  getMusicInfo() {
    wx.cloud.callFunction({
      name: 'tcbRouter',
      data:{
        $url:'music'
      }
    }).then(res => {
      console.log(res)
    })
  },
  getMoveInfo() {
    wx.cloud.callFunction({
      name: 'tcbRouter',
      data: {
        $url: 'movie'
      }
    }).then(res => {
      console.log(res)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})