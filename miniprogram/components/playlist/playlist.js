// components/playlist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    playlist: {
      type: Object
    }
  },
  observers: {
    ['playlist.playCount'](val) {
      //['obj.param'](){...}//监听对象的属性的变化，该参数发生变化就会执行函数内容,不可对被监听的数据重新赋值，会造成死循环
       //这时候，val就是该对象的属性了
      let newPlayCount = this._tranNumber(val, 2)
      this.setData({ _count: newPlayCount})
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    _count:0,//_count变量会被赋值一次就渲染一次
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _tranNumber(num, point) {
      let numStr = num.toString().split('.')[0]
      if (numStr.length < 6) {
        return numStr
      } else if (numStr.length >= 6 && numStr.length <= 8) {
        let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
        return parseFloat(parseInt(numStr / 10000) + '.' + decimal) + '万'
      }else if(numStr.length >8){
        let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point)
        return parseFloat(parseInt(numStr / 100000000) + '.' + decimal) + '亿'
      }
    },
    _toMusicList(){
      wx.navigateTo({
        url: `../../pages/musiclist/musiclist?playlistId=${this.properties.playlist.id}`,
      })
    }
  }
})