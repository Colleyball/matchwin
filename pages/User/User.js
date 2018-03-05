// pages/User/User.js
var util = require('../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    Uid:''
  },
  checkSettingStatu: function (cb) {
    var that = this;
    // 判断是否是第一次授权，非第一次授权且授权失败则进行提醒
    wx.getSetting({
      success: function success(res) {
        var authSetting = res.authSetting;
        if (isEmptyObject(authSetting)) {
          console.log('首次授权');
        } else {
          console.log('不是第一次授权', authSetting);
          // 没有授权的提醒
          if (authSetting['scope.userInfo'] === false) {
            wx.showModal({
              title: '用户未授权',
              content: '如需正常使用个人中心功能，请按确定并在授权管理中选中“用户信息”，然后点按确定。最后再重新进入小程序即可正常使用。',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.openSetting({
                    success: function success(res) {
                      console.log('openSetting success', res.authSetting);
                    }
                  });
                }
              }
            })
          }
        }
      }
    });
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
    app.getUserInfo(
      function (userInfo) {
        //更新数据
        that.setData({
          userInfo: userInfo,
        })
        util.setpublicinfo(wx.getStorageSync('Uid'),userInfo)//插入用户公共信息
      }
    )
    wx.getStorage({
      key: 'Uid',
      success: function(res) {
        that.setData({
          Uid:res.data
        })
      },
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
    this.checkSettingStatu();
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