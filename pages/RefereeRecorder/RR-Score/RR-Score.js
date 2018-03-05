// pages/RefereeRecorder/RR-Score/RR-Score.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lastmatchinfo:[],
    matchinfo:[]
  },
  formSubmit: function (e) {
    var that = this
    wx.showLoading({
      title: '正在修改中…',
      mask: 'true'
    })
    wx.request({
      url: "https://volleywang.cn/index.php/rr/updatescore",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "Post",
      data: {
        id: wx.getStorageSync('insertid'),
        Matchid: wx.getStorageSync('matchinfo').Matchid,
        TeamAid: wx.getStorageSync('matchinfo').TeamAid,
        TeamBid: wx.getStorageSync('matchinfo').TeamBid,
        Round: wx.getStorageSync('matchinfo').Round,
        Uid: wx.getStorageSync('Uid'),
        ScoreA: e.detail.value.socreA,
        ScoreB: e.detail.value.socreB,
      },
      success: function (res) {
        console.log(res.data);
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '修改成功，点击确认返回',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack()
            }
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'matchinfo',
      success: function (res) {
        console.log(res.data)
        that.setData({
          matchinfo: res.data
        })
      },
    })
    wx.getStorage({
      key: 'Uid',
      success: function (res) {
        console.log(res.data)
        that.setData({
          Uid: res.data,
        })
      },
    })
    wx.request({
      url: "https://volleywang.cn/index.php/rr/getlastmatchinfo",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        Matchid: wx.getStorageSync('matchinfo').Matchid,
        TeamAid: wx.getStorageSync('matchinfo').TeamAid,
        TeamBid: wx.getStorageSync('matchinfo').TeamBid,
        Round: wx.getStorageSync('matchinfo').Round,
        Uid: wx.getStorageSync('Uid')
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          lastmatchinfo: res.data.data,
        })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})