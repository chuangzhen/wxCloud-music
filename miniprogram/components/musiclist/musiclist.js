// components/musiclist/musiclist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musiclist:Array
  },
  

  /**
   * 组件的初始数据
   */
  data: {
    playingId:-1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSelected(e){      
      this.setData({ playingId: e.currentTarget.dataset.musicid})
      const ds = e.currentTarget.dataset
      wx.navigateTo({
        url: `../../pages/player/player?musicId=${ds.musicid}&&index=${ds.index}`,
      })
    },
  }
})
