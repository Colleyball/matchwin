// pages/RefereeRecorder/RR-Confirm-P/RR-Confirm-P.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:'',
    longitude:'',
    TeamAid: '',
    TeamBid: '',
    TeamAName: '',
    TeamBName: '',
    Uid:'',
    address:[]
  },
  location:function() {
    var that = this
    wx.showLoading({
      title: '正在获取定位',
    })
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        console.log(res.latitude)
        console.log(res.longitude)
        wx.hideLoading()
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/',
          method: "GET",
          header: {
            "content-type": "application/json;charset:utf8"
          },
          data: {
            //location: res.latitude + ',' + res.longitude,
            location:'30.315638,120.3449',
            key: '4IGBZ-KCKLU-HCOVG-4W4YT-XUKUQ-UGF5V'
          },
          success: function (res) {
            console.log(res.data)
            that.setData({
              address:res.data.result
            })
          }
        })
      }
    })
  },
  formSubmit: function (e) {
    var that = this;
    this.setData({
      toolflag: false,
    })
    wx.showToast({
      title: '正在创建比赛……',
      icon: 'loading',
      duration: 20000,
      mask: true
    })
    wx.request({
      url: "http://127.0.0.1/index.php/rr-p/startmatch",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        Uid: that.data.Uid,
        TeamAid: that.data.TeamAid,
        TeamBid: that.data.TeamBid,
        TeamAName: that.data.TeamAName,
        TeamBName: that.data.TeamBName,
        match: e.detail.value.match,
      },
      success: function (res) {
        console.log(res.data);
        wx.setStorage({
          key: 'R-status',
          data: '0',
        })
        wx.setStorage({
          key: 'insertid',
          data: res.data.data,
        })
        wx.showToast({
          title: '创建成功！',
          icon: 'success',
          duration: 1000,
          mask: true,
          success: function () {
            //wx.redirectTo({
            //  url: '../RR-Menu/RR-Menu',
            //})
            that.setData({
              toolflag: true,
            })
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
    that.setData({
      TeamAid: options.TeamAid,
      TeamBid: options.TeamBid,
      TeamAName: options.TeamAName,
      TeamBName: options.TeamBName,
      Uid: options.Uid
    })
    var matchData = new Object
    matchData.TeamAid = options.TeamAid
    matchData.TeamBid = options.TeamBid
    matchData.TeamAName = options.TeamAName
    matchData.TeamBName = options.TeamBName
    wx.setStorageSync('matchData', matchData)
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