// pages/Court/Court.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 1,
    gps_x: 39.908491,
    gps_y: 116.374328,
    sport:'排球'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sport: options.sports
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
    var that = this
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude//维度
        var longitude = res.longitude//经度
        console.log(res);
        GetCourt(that, that.data.sport, res.latitude, res.longitude, that.data.currentPage)
        that.setData({
          gps_x: res.latitude,
          gps_y: res.longitude
        })
      }
    })
    
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
    var that = this
    var page = that.data.currentPage + 1
    GetCourt(that, that.data.sport, that.data.gps_x, that.data.gps_y, page)
    that.setData({
      currentPage: that.data.currentPage + 1
    })
    wx.showToast({
      title: '加载中…',
      icon: 'loading',
      mask: true
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})

function GetCourt(that, sports, gps_x, gps_y, page) {
  wx.request({
    url: 'https://apis.map.qq.com/ws/place/v1/search?boundary=nearby(' + gps_x + ',' + gps_y + ',5000)&keyword=' + sports +'&page_size=20&page_index=' + page +'&orderby=distance&key=4IGBZ-KCKLU-HCOVG-4W4YT-XUKUQ-UGF5V',
    header: {
      "content-type": "application/json;charset=utf8"
    },
    method: "GET",
    data: {
    },
    success: function (res) {
      that.setData({
        court: res.data
      })
    }
  })
}