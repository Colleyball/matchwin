// pages/RefereeRecorder/RR-CreateMatch/RR-CreateMatch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Uid:'',
    Awidth:60,
    Acolor:0.8,
    Aradius:50,
    Afont: 50,
    Bwidth: 40,
    Bcolor: 0.2,
    Bradius: 50,
    Bfont: 40,
    matchtype:'',
    datalist:[],
    ATeamid:'',
    BTeamid:'',
    TeamAName:'球队1',
    TeamBName:'球队2',
    Switchteam: true
  },
  teamA: function () {
    this.setData({
      Awidth: 60,
      Acolor: 0.8,
      Aradius: 50,
      Afont:50,
      Bwidth: 40,
      Bcolor: 0.2,
      Bradius: 50,
      Bfont: 40,
      Switchteam: true
    })
  },
  teamB: function () {
    this.setData({
      Awidth: 40,
      Acolor: 0.2,
      Aradius: 50,
      Afont: 40,
      Bwidth: 60,
      Bcolor: 0.8,
      Bradius: 50,
      Bfont: 50,
      Switchteam: false
    })
  },
  ChooseTeamA: function(e) {
    this.setData({
      ATeamid: e.currentTarget.dataset.teamid,
      TeamAName: e.currentTarget.dataset.teamname
    })
  },
  CleanTeamA: function() {
    this.setData({
      ATeamid: '',
      TeamAName: '球队1'
    })
  },
  ChooseTeamB: function (e) {
    this.setData({
      BTeamid: e.currentTarget.dataset.teamid,
      TeamBName: e.currentTarget.dataset.teamname
    })
  },
  CleanTeamB: function () {
    this.setData({
      BTeamid: '',
      TeamBName: '球队1'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if(!wx.getStorageSync('Uid')) {
      wx.showModal({
        title: '提示',
        content: '获取用户信息失败，请返回重试',
        showCancel: false,
        success:function(res){
          if(res.confirm) {
            wx.navigateBack()
          }
        }
      })
    } else {
      that.setData({
        Uid: wx.getStorageSync('Uid'),
        matchtype: options.matchtype
      })
    }
  },
  submit: function (e) {
    var that = this
    wx.navigateTo({
      url: '../RR-Confirm-P/RR-Confirm-P?TeamAid=' + that.data.ATeamid + '&TeamBid=' + that.data.BTeamid + '&TeamAName=' + that.data.TeamAName + '&TeamBName=' + that.data.TeamBName + '&Uid='+that.data.Uid,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    wx.request({
      url:'https://www.volleywang.cn/index.php/api/getonejointeam',
      header: {
        "content-type": "application/json;charset:utf8"
      },
      method: "GET",
      data: {
        Uid:that.data.Uid
      },
      success:function(res){
        console.log(res.data)
        that.setData({
          datalist: res.data.data
        })
      }
    })
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