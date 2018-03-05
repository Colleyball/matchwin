// pages/MatchBox/RefereeRecorder/RR-Start/RR-Start.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schedulelist:[],
    matchlist:[],
    matchid:'',
    match:false,
    schedule:true,
    Ref:true,
    title:'请选择赛事',
    toolflag:true
  },
  matchdetails:function(e){
    var that = this
    wx.request({
      url: 'https://volleywang.cn/index.php/api/getref',
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        uid: wx.getStorageSync('Uid'),
        matchid: e.currentTarget.dataset.matchid
      },
      success:function(res){
        console.log(res.data)
        if (res.data.success == false) {
          wx.showModal({
            title: '提示',
            content: '您还没有该项比赛的裁判权限',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack()
              }
            }
          })
        }
        else if (res.data.data.status == 1) {
          wx.showModal({
            title: '提示',
            content: '您的裁判申请正在审核中，请稍等……',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack()
              }
            }
          })
        } 
      }
    })
    this.setData({
      toolflag: false,
    })
    wx.showToast({
      title: '正在加载中……',
      icon: 'loading',
      duration:10000,
      mask: true
    })
    wx.request({
      url: "https://volleywang.cn/index.php/api/getmatchschedule",
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        matchid: e.currentTarget.dataset.matchid
      },
      success: function (res) {
        console.log(res.data);
        that.setData(
          {
            schedulelist: res.data.data,
            matchid: e.currentTarget.dataset.matchid,
            match: true,
            schedule: false,
            title: '请选择比赛场次',
            toolflag: true,
          }
        )
        wx.hideToast()
      }
    })
  },
  confirm: function (e) {
    var that = this
    wx.setStorage({
      key: 'matchinfo',
      data: e.currentTarget.dataset.all,
      success: function () {
        that.setData(
          {
            schedule: true,
            Ref:false,
            title: '输入比赛信息'
          }
        )
      }
    })
  },
  formSubmit: function (e) {
    this.setData({
      schedule: true,
      Ref: true,
       match:false
    })
    wx.navigateTo({
url: '../RR-Confirm/RR-Confirm?ARef=' + e.detail.value.ARef + '&BRef=' + e.detail.value.BRef + '&ARec=' + e.detail.value.ARec + '&BRec=' + e.detail.value.BRec + '&match=' + e.detail.value.match,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: "https://volleywang.cn/index.php/api/getmatchbytype",
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        matchtype: options.matchtype
      },
      success: function (res) {
        console.log(res.data);
        that.setData(
          {
            matchlist: res.data.data
          }
        )
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