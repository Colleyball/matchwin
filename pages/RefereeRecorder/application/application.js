// pages/RefereeRecorder/application/application.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  formsubmit:function(e){
    var that = this
    wx.request({
      url: 'https://volleywang.cn/index.php/api/addref',
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        name:e.detail.value.name,
        schoolid:e.detail.value.schoolid,
        uid:wx.getStorageSync('Uid'),
        matchid:31
      },
      success: function (res) {
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
    if (!wx.getStorageSync('Uid')) {
      wx.showModal({
        title: '提示',
        content: '未获取到你的用户uid，请点击我，进入个人中心完成授权',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.navigateBack()
          }
        }
      })
    }
    wx.request({
      url: 'https://volleywang.cn/index.php/api/getref',
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        uid: wx.getStorageSync('Uid'),
        matchid: 31
      },
      success: function (res) {
        console.log(res.data)
        if(res.data.data.status == 1) {
          wx.showModal({
            title: '提示',
            content: '您的裁判申请正在审核中，请稍等……',
            showCancel:false,
            success:function(res){
              if (res.confirm) {
                wx.navigateBack()
              }
            }
          })
        }
        if (res.data.data.status == 2) {
          wx.showModal({
            title: '提示',
            content: '你已获得裁判权限',
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