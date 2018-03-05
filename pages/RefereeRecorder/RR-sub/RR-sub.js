// pages/RefereeRecorder/RR-sub/RR-sub.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchinfo: [],
    Uid: '',
    title:'换人-选择球队',
    lastmatchinfo:[],
    playerlist: [],
    toolflag: true,
    playertoast: true,
    position: '',
    Awidth: '70%',
    Bwidth: '70%',
    Afont: '30rpx',
    Bfont: '30rpx',
    showteamA: true,
    showteamB: true,
    benchlist:[],
    Out:'',
    In:'',
    team:'',
    subconfirm:true,
    teamposition:'',
    teamsubinfo:[]
  },
  teamA: function () {
    var that = this
    this.setData({
      Awidth: '90%',
      Bwidth: '70%',
      Afont: '45rpx',
      Bfont: '30rpx',
      showteamA: false,
      showteamB: true,
      title:'选择换下队员'
    })
    wx.request({
      url: "https://volleywang.cn/index.php/rr/getteamsubinfo",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        Matchid: wx.getStorageSync('matchinfo').Matchid,
        TeamAid: wx.getStorageSync('matchinfo').TeamAid,
        TeamBid: wx.getStorageSync('matchinfo').TeamBid,
        Round: wx.getStorageSync('matchinfo').Round,
        Uid: wx.getStorageSync('Uid'),
        Teamid: wx.getStorageSync('matchinfo').TeamAid,
        MatchA: that.data.lastmatchinfo[0].MatchA,
        MatchB: that.data.lastmatchinfo[0].MatchB,
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          teamsubinfo:res.data.data
        })
      }
    })
  },
  teamB: function () {
    var that = this
    this.setData({
      Awidth: '70%',
      Bwidth: '90%',
      Afont: '30rpx',
      Bfont: '45rpx',
      showteamA: true,
      showteamB: false,
      title: '换人-选择换下队员'
    })
    wx.request({
      url: "https://volleywang.cn/index.php/rr/getteamsubinfo",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        Matchid: wx.getStorageSync('matchinfo').Matchid,
        TeamAid: wx.getStorageSync('matchinfo').TeamAid,
        TeamBid: wx.getStorageSync('matchinfo').TeamBid,
        Round: wx.getStorageSync('matchinfo').Round,
        Uid: wx.getStorageSync('Uid'),
        Teamid: wx.getStorageSync('matchinfo').TeamBid,
        MatchA: that.data.lastmatchinfo[0].MatchA,
        MatchB: that.data.lastmatchinfo[0].MatchB,
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          teamsubinfo: res.data.data
        })
      }
    })
  },
  over:function () {
    wx.showModal({
      title: '提示',
      content: '该队换人次数已用完！',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          wx.navigateBack()
        }
      }
    })
  },
  close:function () {
    this.setData({
      subconfirm: true,
      toolflag: true,
      playertoast: true,
    })
  },
  confirm:function (e) {
    var that = this
    wx.request({
      url: "https://volleywang.cn/index.php/rr/setsub",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        id: wx.getStorageSync('insertid'),
        Matchid: wx.getStorageSync('matchinfo').Matchid,
        TeamAid: wx.getStorageSync('matchinfo').TeamAid,
        TeamBid: wx.getStorageSync('matchinfo').TeamBid,
        Round: wx.getStorageSync('matchinfo').Round,
        Uid: wx.getStorageSync('Uid'),
        Teamid: that.data.team,
        Out: that.data.Out,
        In: that.data.In,
        MatchA: that.data.lastmatchinfo[0].MatchA,
        MatchB: that.data.lastmatchinfo[0].MatchB,
        TeamASub: that.data.lastmatchinfo[0].TeamASub,
        TeamBSub: that.data.lastmatchinfo[0].TeamBSub,
        Position: that.data.teamposition
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          subconfirm: true,
          toolflag: true
        })
        wx.showModal({
          title: '提示',
          content: '换人成功！',
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
  confirmplayer:function (e) {
    var that = this
    that.setData({
      In: e.currentTarget.dataset.num,
      playertoast:true,
      subconfirm:false
    })
  },
  chooseplayer:function (e) {
    var that = this
    that.setData({
      Out: e.currentTarget.dataset.position,
      team: e.currentTarget.dataset.teamid,
      teamposition: e.currentTarget.dataset.teamposition
    })
    wx.request({
      url: "https://volleywang.cn/index.php/rr/getsub",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        Matchid: wx.getStorageSync('matchinfo').Matchid,
        TeamAid: wx.getStorageSync('matchinfo').TeamAid,
        TeamBid: wx.getStorageSync('matchinfo').TeamBid,
        Round: wx.getStorageSync('matchinfo').Round,
        Uid: wx.getStorageSync('Uid'),
        Teamid: e.currentTarget.dataset.teamid,
        Out: e.currentTarget.dataset.position,
        MatchA: that.data.lastmatchinfo[0].MatchA,
        MatchB: that.data.lastmatchinfo[0].MatchB,
      },
      success:function(res){
        console.log(res.data)
        if (res.data.message == '可正常换人') {
          that.setData({
            benchlist:res.data.data,
            playertoast:false,
            toolflag:false
          })
        }
        if (res.data.message == '该位置换人次数用完') {
          wx.showModal({
            title: '提示',
            content: '该位置换人次数用完',
            showCancel:false,
            success:function(res){
              if(res.confirm){
                wx.navigateBack()
              }
            }
          })
        }
        if (res.data.message == '该队员只能由指定队员替换') {
          wx.showModal({
            title: '提示',
            content: '该队员只能由他之前替换下场的【'+res.data.data[0] +'】号进行替换，点击确认进行换人',
            showCancel: true,
            success: function (a) {
              if (a.confirm) {
                wx.request({
                  url: "https://volleywang.cn/index.php/rr/setsub",
                  header: {
                    "content-type": "application/x-www-form-urlencoded"
                  },
                  method: "POST",
                  data: {
                    id: wx.getStorageSync('insertid'),
                    Matchid: wx.getStorageSync('matchinfo').Matchid,
                    TeamAid: wx.getStorageSync('matchinfo').TeamAid,
                    TeamBid: wx.getStorageSync('matchinfo').TeamBid,
                    Round: wx.getStorageSync('matchinfo').Round,
                    Uid: wx.getStorageSync('Uid'),
                    Teamid: e.currentTarget.dataset.teamid,
                    Out: e.currentTarget.dataset.position,
                    In: res.data.data[0],
                    MatchA: that.data.lastmatchinfo[0].MatchA,
                    MatchB: that.data.lastmatchinfo[0].MatchB,
                    TeamASub: that.data.lastmatchinfo[0].TeamASub,
                    TeamBSub: that.data.lastmatchinfo[0].TeamBSub,
                    Position: e.currentTarget.dataset.teamposition
                  },
                  success: function (res) {
                    console.log(res.data)
                    that.setData({
                      subconfirm: true,
                      toolflag: true
                    })
                    wx.showModal({
                      title: '提示',
                      content: '换人成功！',
                      showCancel:false,
                      success:function (res) {
                        if(res.confirm) {
                          wx.navigateBack()
                        }
                      }
                    })
                  }
                })
              } else {
                wx.navigateBack()
              }
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showToast({
      title: '正在加载中……',
      icon: 'loading',
      duration: 40000,
      mask: true
    })
    this.setData({
      toolflag: false,
    })
    wx.getStorage({
      key: 'matchinfo',
      success: function (res) {
        console.log(res.data)
        that.setData({
          matchinfo: res.data
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
          toolflag: true,
        })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})