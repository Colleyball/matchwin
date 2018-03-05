// pages/Match/MatchDetails/schedule/schedule.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colora: '#f17c67',
    colorb: '#000',
    colorc: '#000',
    Afont: '40rpx',
    Bfont: '30rpx',
    Cfont: '30rpx',
    toolflag:true,
    schedulelist:[],
    finish:true,
    live:false,
    schedule:true,
    count_schedule:0
  },

  now:function(){
    this.setData({
      finish: true,
      live: false,
      schedule: true,
      colora: '#f17c67',
      colorb: '#000',
      colorc: '#000',
      Afont: '40rpx',
      Bfont: '30rpx',
      Cfont: '30rpx',
    })
  },

  end: function () {
    this.setData({
      finish: false,
      live: true,
      schedule: true,
      colora: '#000',
      colorb: '#f17c67',
      colorc: '#000',
      Afont: '30rpx',
      Bfont: '40rpx',
      Cfont: '30rpx',
    })
  },

  wait: function () {
    this.setData({
      finish: true,
      live: true,
      schedule: false,
      colora: '#000',
      colorb: '#000',
      colorc: '#f17c67',
      Afont: '30rpx',
      Bfont: '30rpx',
      Cfont: '40rpx',
    })
  },

  live:function (e) {
    wx.setStorageSync('liveinfo', e.currentTarget.dataset.all)
    wx.navigateTo({
      url: 'live/live',
    })
  },

  endmatch: function (e) {
    wx.setStorageSync('liveinfo', e.currentTarget.dataset.all)
    wx.navigateTo({
      url: 'end/endmatch',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      toolflag: false,
    })
    wx.showToast({
      title: '正在加载中……',
      icon: 'loading',
      duration: 10000,
      mask: true
    })
    wx.request({
      url: "https://volleywang.cn/index.php/api/getmatchschedule",
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        matchid: options.matchid
      },
      success: function (res) {
        console.log(res.data);
        that.setData(
          {
            schedulelist: res.data.data,
            matchid: options.matchid,
            toolflag: true,
          }
        )
        wx.hideToast()
      }
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
})