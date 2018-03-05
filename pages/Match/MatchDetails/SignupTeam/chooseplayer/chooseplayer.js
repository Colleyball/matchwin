// pages/Match/MatchDetails/SignupTeam/chooseplayer/chooseplayer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playerlist:[],
    choosecardid:[],
    chooseplayer:false,
    teamid:'',
    matchid:'',
    title:'',
    toolflag: true
  },
  formsubmit:function (e) {
    console.log(e.detail.value)
    this.setData({
      choosecardid: e.detail.value['cardid'],
      chooseplayer: true,
      title:'请确认队员'
    })
  },
  close:function(){
    this.setData({
      title: '请选择队员',
      chooseplayer: false,
      choosecardid: null
    })
  },
  confirm:function(e) {
    var that = this
    this.setData({
      toolflag:false
    })
    wx.showToast({
      title: '正在报名中…',
      icon: 'loading',
      mask: true
    })
    wx.request({
      url: 'https://volleywang.cn/index.php/api/matchjoin',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        Uid: wx.getStorageSync('Uid'),
        Teamid: that.data.teamid,
        Matchid: that.data.matchid,
        Cardid: that.data.choosecardid,        
      },
      success: function (res) {
        wx.showToast({
          title: '报名成功',
          icon: 'success',
          mask: true
        })
        console.log(res.data)
        wx.navigateBack()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      title: '请选择队员',
      matchid:options.matchid,
      teamid:options.teamid
    })
    wx.request({
      url: 'https://volleywang.cn/index.php/api/getoneteamplayer',
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        Teamid: options.teamid
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          playerlist: res.data.data,
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
  
  }
})