Page({

  /**
   * 页面的初始数据
   */
  data: {
    Uid: '',
    Awidth: 60,
    Acolor: 0.8,
    Aradius: 50,
    Afont: 50,
    Bwidth: 40,
    Bcolor: 0.2,
    Bradius: 50,
    Bfont: 40,
    matchtype: '',
    playerlist1: [],
    playerlist2: [],
    ATeamid: '',
    BTeamid: '',
    TeamAName: '球队1',
    TeamBName: '球队2',
    Switchteam: true,
    macthData:[],
    TeamAPlayer:[],
    TeamBPlayer:[],
  },
  teamA: function () {
    this.setData({
      Awidth: 60,
      Acolor: 0.8,
      Aradius: 50,
      Afont: 50,
      Bwidth: 40,
      Bcolor: 0.2,
      Bradius: 50,
      Bfont: 40,
      Switchteam: true,
      chooseplayerA:false,
      chooseplayerB:false
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
  ChooseTeamA: function (e) {
    this.setData({
      ATeamid: e.currentTarget.dataset.teamid,
      TeamAName: e.currentTarget.dataset.teamname
    })
  },
  ChooseTeamB: function (e) {
    this.setData({
      BTeamid: e.currentTarget.dataset.teamid,
      TeamBName: e.currentTarget.dataset.teamname
    })
  },
  SubmitTeamA: function (e) {
    var that = this
    this.setData({
      TeamAPlayer: e.detail.value,
      chooseplayerA: true,
      Switchteam: false,
      Awidth: 40,
      Acolor: 0.2,
      Aradius: 50,
      Afont: 40,
      Bwidth: 60,
      Bcolor: 0.8,
      Bradius: 50,
      Bfont: 50,
    })
    console.log(e.detail.value)
  },
  SubmitTeamB: function (e) {
    var that = this
    this.setData({
      TeamBPlayer: e.detail.value,
      chooseplayerB: true,
    })
    console.log(e.detail.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (!wx.getStorageSync('matchData')) {
      wx.showModal({
        title: '提示',
        content: '获取信息失败，请返回重试',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.navigateBack()
          }
        }
      })
    } else {
      that.setData({
        macthData: wx.getStorageSync('matchData'),
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    wx.request({
      url: 'https://volleywang.cn/index.php/api/getoneteamplayer',
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        Teamid: that.data.macthData.TeamAid
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          playerlist1: res.data.data,
        })
      }
    })
    wx.request({
      url: 'https://volleywang.cn/index.php/api/getoneteamplayer',
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        Teamid: that.data.macthData.TeamBid
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          playerlist2: res.data.data,
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