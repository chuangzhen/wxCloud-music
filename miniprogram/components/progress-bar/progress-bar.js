
let movableAreaWidth = 0;
let movableViewWith = 0

const backgroundAudioManager = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showTime:{
      currentTime:"00:00",
      allTime:"00:00"
    },
    progress:50
  },
  // 组件生命周期函数
  lifetimes:{
    ready(){
      this._getMovableDis()
      this._bindBgm()
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _getMovableDis(){
      const query = this.createSelectorQuery()//在组件用this. 在page页面用wx.
      query.select('.movable-area').boundingClientRect()
      query.select('.movable-view').boundingClientRect()
      query.exec((rect) => {       
        movableAreaWidth = rect[0].widh
        movableViewWith = rect[1].widh        
      })
    },
    //绑定背景音乐播放器的事件
    _bindBgm(){
      backgroundAudioManager.onPlay(() => {
        console.log('onPlay');
        
      })
      backgroundAudioManager.onStop(() => {
        console.log('onStop');        
      })
      backgroundAudioManager.onPause(() => {
        console.log('onPause');        
      })
      backgroundAudioManager.onWaiting(() => {
        console.log('waiting');              
      })
      backgroundAudioManager.onCanplay(() => {
        console.log('onCanplay');        
        console.log(backgroundAudioManager.duration);
        if (typeof backgroundAudioManager.duration != undefined) {
          this._setTime()
        }else{
          setTimeout(() =>{
            this._setTime()
          },1000)
        }
        
      })
      backgroundAudioManager.onTimeUpdate(() => {
        console.log('onTimeUpdate');        
      })
      backgroundAudioManager.onEnded(() => {
        console.log('ended');
        
      })
      backgroundAudioManager.onError((res) => {
        wx.showToast({
          title: '错误'+res.errCode,
        })
      })
    },
    _setTime(){
      const duration = backgroundAudioManager.duration
      console.log(duration);
      
    },
  }
})
