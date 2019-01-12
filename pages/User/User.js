// pages/User/User.js
var util = require('../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    Uid:'',
    login:true
  },
  bindGetUserInfo: function (e) {
    var that = this
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      that.setData({
        userInfo: e.detail.userInfo,
      })
      util.setpublicinfo(wx.getStorageSync('Uid'), e.detail.userInfo)
      wx.setStorageSync('userInfo', e.detail.userInfo)
      //用户按了允许授权按钮
      that.setData({
        login:true
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '提示',
        content: '如需使用用户中心的全部功能(比赛数据、关注的球队)，赛事窗需要获取您的昵称和头像，点击确认重新登录',
        showCancel:false
      })
    }
  },
  bindViewTapMyCard: function () {
    wx.navigateTo({
      url: 'MyCard/MyCard?id=' + this.data.Uid
    })
  },
  bindViewTapMyLike: function () {
    wx.navigateTo({
      url: 'MyLike/MyLike?id=' + this.data.Uid
    })
  },
  bindViewTapSignAll: function () {
    wx.navigateTo({
      url: 'SignAll/SignAll?id=' + this.data.Uid
    })
  },
  Setting: function () {
    wx.navigateTo({
      url: 'Setting/Setting?id=' + this.data.Uid
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSetting({
      success: function success(res) {
        var authSetting = res.authSetting;
        if (isEmptyObject(authSetting)) {
          that.setData({
            login: false
          })
          console.log('首次授权');
        } else {
          console.log('不是第一次授权', authSetting);
          // 没有授权的提醒
          app.getUserInfo()
          if (!wx.getStorageSync('userInfo')) {
            that.setData({
              login: false
            })
          }
        }
      }
    })

    wx.getStorage({
      key: 'Uid',
      success: function(res) {
        that.setData({
          Uid:res.data
        })
      },
    })
    that.setData({
      userInfo: wx.getStorageSync('userInfo')
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
  onShareAppMessage: function () {
    var that = this
    return {
      title: '@' + wx.getStorageSync('userInfo').nickName + '发现了一款很有意思的小程序“赛事窗”快来瞅瞅吧',
      desc: '点击进入赛事窗',
      path: '/pages/index/index',
    }
  }
})

function isEmptyObject(e) {
  var t;
  for (t in e)
    return !1;
  return !0
}