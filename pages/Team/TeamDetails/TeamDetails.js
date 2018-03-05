// TeamDetails.js
var app = getApp()
var util = require('../../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    teaminfo:[],
    playerlist:[],
    join:"",
    matchtype:"",
    Uid:"",
    teamid:"",
    share:true,
    joinflag:false,
    fans:0
  },
  edit: function (e) {
    var that = this
    console.log()
    wx.navigateTo({
      url: 'EditInfo/EditInfo?cardid=' + e.currentTarget.dataset.cardid + '&name=' + e.currentTarget.dataset.name
    })
  },
  editteamname: function (e) {
    var that = this
    console.log()
    wx.navigateTo({
      url: 'EditInfo/EditInfo?&name=' + e.currentTarget.dataset.name + '&teamid=' + e.currentTarget.dataset.teamid
    })
  },
  manage:function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '请确认是否认领该球队，认领后您将对该球队负责，同时该球队的相关消息也将推送给您！',
      success:function(res){
        if(res.confirm) {
          wx.showLoading({
            title: '正在修改中…',
            mask: 'true'
          })
          wx.request({
            url: "https://volleywang.cn/index.php/api/manageteam",
            header: {
              "content-type": "application/json;charset=utf8"
            },
            method: "GET",
            data: {
              Uid: that.data.Uid,
              Teamid: that.data.teamid
            },
            success: function (res) {
              console.log(res.data);
              wx.hideLoading()
              wx.showModal({
                title: '提示',
                content: '认领成功，点击确认返回',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateBack()
                  }
                }
              })
            }
          })
        }
      }
    })
  },
  jointeam:function (){
    this.setData({
      share: false
    })
  },
  close:function() {
    this.setData({
      share:true
    })
  },
  join:function() {
    var that = this
    wx.navigateTo({
      url: '../jointeam/jointeam?teamid='+that.data.teamid+'&uid='+that.data.Uid+'&matchtype='+that.data.matchtype
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (!options.Uid) {
      util.getUid(this)
      this.setData({
        Uid: wx.getStorageSync('Uid')
      })
    }
    wx.showShareMenu({
      withShareTicket: true,
    })
    this.setData({
      teamid: options.id,
      Uid: options.uid,
      matchtype: options.matchtype,
      share: options.share,
      fans:options.fans
    })
    app.getUserOpenid()
    util.getUid(this)
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
    wx.request({
      url: 'https://volleywang.cn/index.php/api/getoneteaminfo',
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        Teamid: that.data.teamid
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          teaminfo: res.data.data
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
        Teamid: that.data.teamid
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          playerlist: res.data.data
        })
      }
    }),
    wx.request({
      url: 'https://volleywang.cn/index.php/api/ifonejoin',
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        Uid: wx.getStorageSync('Uid'),
        Teamid: that.data.teamid
      },
      success: function (res) {
        console.log(that.data);
        that.setData(
          {
            joinflag: res.data.data
          }
        );
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      share: true
    })
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
        title: '@'+wx.getStorageSync('userInfo').nickName+'发现了' + that.data.teaminfo[0].TeamName + '，快来加入吧',
        desc: '点击加入球队',
        path: '/pages/Team/TeamDetails/TeamDetails?id=' + that.data.teamid + '&share=false',
      }
  }
})