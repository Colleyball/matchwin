// pages/Team/TeamDetails/EditInfo/EditInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchid: '',
    cardid: '',
    name: '',
    teamid:'',
    type:''
  },
  del: function (e) {
    wx.showModal({
      title: '提示',
      content: '正在开发中……',
      showCancel: false
    })
  },
  formSubmit: function (e) {
    var that = this
    wx.showLoading({
      title: '正在修改中…',
      mask: 'true'
    })
    wx.request({
      url: "https://volleywang.cn/index.php/api/editplayername",
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        Cardid: that.data.cardid,
        Name: e.detail.value.name
      },
      success: function (res) {
        console.log(res.data);
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '修改成功，点击确认返回',
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
  formSubmit2: function (e) {
    var that = this
    wx.showLoading({
      title: '正在修改中…',
      mask: 'true'
    })
    wx.request({
      url: "https://volleywang.cn/index.php/api/manageteamname",
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        Teamid: that.data.teamid,
        Name: e.detail.value.name
      },
      success: function (res) {
        console.log(res.data);
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '修改成功，点击确认返回',
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.cardid) {
      this.setData({
        cardid: options.cardid,
        matchid: options.matchid,
        name: options.name,
        type:1
      })
    } else {
      this.setData({
        teamid: options.teamid,
        name: options.name,
        type: 2
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