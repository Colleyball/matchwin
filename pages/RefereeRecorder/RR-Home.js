// pages/MatchBox/ScoreBoard/SB-start.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toolflag:true
  },
  start: function (e) {
    if (wx.getStorageSync('R-status') != 2 && wx.getStorageSync('R-status')) {
      wx.showModal({
        title: '提示',
        content: '你目前还有比赛正在进行中，无法开始新的比赛，点击【确认】继续之前的比赛，点击【取消】开始新的比赛',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: 'RR-Menu/RR-Menu',
            })
          }
          if (res.cancel) {
            wx.showModal({
              title: '提示',
              content: '你点击了取消，是否要强制结束之前的比赛，可能造成无法挽回的后果！',
              success: function (res) {
                if (res.confirm) {
                  wx.removeStorageSync('R-status')
                  wx.removeStorageSync('matchinfo')
                }
              }
            })
          }
        }
      })
    } else {
      this.setData({
        toolflag:false
      })
    }
  },
  application:function (e) {
    wx.navigateTo({
      url: '../RefereeRecorder/application/application',
    })
  },
  Myref:function (e) {
    wx.navigateTo({
      url: '../RefereeRecorder/myref/myref',
    })
  },
  choosematch:function (e) {
    wx.navigateTo({
      url: '../RefereeRecorder/RR-Start/RR-Start?matchtype=' + e.currentTarget.dataset.matchtype,
    })
  },
  creatematch: function (e) {
    wx.navigateTo({
      url: '../RefereeRecorder/RR-CreateMatch/RR-CreateMatch?matchtype=' + e.currentTarget.dataset.matchtype,
    })
  },
  close:function () {
    this.setData({
      toolflag: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '数据统计 赛事窗',
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
    if (wx.getStorageSync('R-status') != 2 && wx.getStorageSync('R-status')) {
      wx.showModal({
        title: '提示',
        content: '你目前还有比赛正在进行中，是否进入比赛？',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: 'RR-Menu/RR-Menu',
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      toolflag:true
    })
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
    var that = this
    return {
      title: '@' + wx.getStorageSync('userInfo').nickName + '发现了一款很有意思的小程序“赛事窗”快来瞅瞅吧',
      desc: '点击进入赛事窗',
      path: '/pages/index/index',
    }
  }
})