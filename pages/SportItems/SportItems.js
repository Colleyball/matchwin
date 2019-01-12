// basketball.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchtype:"",
    Uid:"",
    mainpic: {
      team:"https://volleywang.cn/liansaiquan/images/wechat/index/image_bg.png",
      match: "https://volleywang.cn/liansaiquan/images/wechat/index/image_bg.png",
      rank: "https://volleywang.cn/liansaiquan/images/wechat/index/image_bg.png"
    },
    teamrank:[]
  },
  //事件处理函数
  bindViewTapTeam: function () {
    wx.navigateTo({
      url: '../Team/Team?id=' + this.data.matchtype+'&uid=' + this.data.Uid
    })
  },
  bindViewTapMatch: function (e) {
    wx.navigateTo({
      url: '../Match/Match?id=' + this.data.matchtype+'&uid='+this.data.Uid
    })
  },
  rank:function () {
    wx.navigateTo({
      url: '../find/winrank/winrank',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: options.id + '俱乐部 赛事窗',
    })
    if (options.id == '排球') {
      this.setData({
        mainpic: {
          team: "http://www.aibotiyu.com/ImgFiles/ABSports/matchwin/team/team-volleyball.jpg"
        },
        matchtype: options.id,
        matchtype_EN: 'Volleyball'
      })
    }
    if (options.id == '篮球') {
      this.setData({
        mainpic: {
          team: "https://volleywang.cn/liansaiquan/images/wechat/basketball/team.jpg",
        },
        matchtype: options.id,
        matchtype_EN: 'Basketball'
      })
    }
    wx.request({
      url: "https://volleywang.cn/index.php/api/teamactrank",
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        matchtype: options.id
      },
      success: function (res) {
        console.log(res.data)
        that.setData(
          {
            teamrank: res.data.data
          }
        );
      }
    })
    wx.getStorage({
      key: 'Uid',
      success: function (res) {
        that.setData({
          Uid: res.data,
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
    var that = this
    return {
      title: '@' + wx.getStorageSync('userInfo').nickName + '分享了很多'+that.data.matchtype+'球队，快来看看吧',
      desc: '点击进入赛事窗',
      path: 'pages/SportItems/SportItems?id=' + that.data.matchtype,
    }
  }
})