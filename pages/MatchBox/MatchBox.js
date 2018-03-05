// MatchBox.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainpic: {
      scoreboard:"https://volleywang.cn/liansaiquan/images/wechat/matchbox/scoreboard.jpg",
      skillboard:"https://volleywang.cn/liansaiquan/images/wechat/matchbox/TacticalBoard.jpg",
      coin:"https://volleywang.cn/liansaiquan/images/wechat/matchbox/Coin.jpg"
      }
  },
  Tactical:function(){
    wx.navigateTo({
      url: 'Tactical/Tactical',
    })
  },
  ScoreBoard: function () {
    wx.navigateTo({
      url: 'ScoreBoard/ScoreBoard',
    })
  },
  Coin: function () {
    wx.navigateTo({
      url: 'Coin/coin',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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