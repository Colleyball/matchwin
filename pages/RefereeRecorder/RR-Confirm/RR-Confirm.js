// pages/MatchBox/RefereeRecorder/RR-Confirm/RR-Confirm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:[],
    ARef:'',
    BRef:'',
    ARec:'',
    BRec:'',
    match:'',
    Uid:'',
    matchshow: '3局2胜',
    toolflag: true
  },
  submit:function(){
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
      url: "https://volleywang.cn/index.php/rr/startmatch",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        Matchid: that.data.item.Matchid,
        TeamAid: that.data.item.TeamAid,
        TeamBid: that.data.item.TeamBid,
        Round: that.data.item.Round,
        Date: that.data.item.Date,
        Time: that.data.item.Time,
        Court: that.data.item.Court,
        TeamAName: that.data.item.TeamAName,
        TeamBName: that.data.item.TeamBName,
        ARef: that.data.ARef,
        BRef: that.data.BRef,
        ARec: that.data.ARec,
        BRec: that.data.BRec,
        match: that.data.match,
        Uid: that.data.Uid,
        fightid:that.data.item.id,
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
          success:function () {
            wx.redirectTo({
              url: '../RR-Menu/RR-Menu',
            })
            that.setData({
              toolflag: true,
            })
          }
        })
      }
    })
  },
  back: function() {
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'matchinfo',
      success: function(res) {
        console.log(res.data)
        that.setData({
          item:res.data
        })
      },
    })
    wx.getStorage({
      key: 'Uid',
      success: function (res) {
        console.log(res.data)
        that.setData({
          Uid: res.data
        })
      },
    })
    this.setData({
      ARef:options.ARef,
      BRef:options.BRef,
      ARec:options.ARec,
      BRec:options.BRec,
      match:options.match
    })
    if (options.match == 53) {
      this.setData({
        matchshow:'5局3胜'
      })
    }
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