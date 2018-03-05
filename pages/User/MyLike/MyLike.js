// MyLike.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist: [],
    Uid:"",
    hiddenToast:true,
  },
  toastHidden: function () {
    this.setData({
      hiddenToast: true
    })
  },
  bindViewTapTeam: function (e) {
    var that = this;
    wx.navigateTo({
      url: '../../Team/TeamDetails/TeamDetails?id=' + e.target.dataset.teamid + '&uid=' + that.data.Uid + '&matchtype=' + that.data.matchtype + '&fans=' + '0',
    })
  },
  sign: function (e) {
    var that = this
    wx.request({
      url: "https://volleywang.cn/liansaiquan/model/UserSign.php",
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        uid: that.data.Uid,
        teamid: e.target.dataset.teamid
      },
      success: function (res) {
        that.setData({
          hiddenToast: false
        })
      }
    })
    wx.request({
      url: "https://volleywang.cn/liansaiquan/model/GetMyLike.php",
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        uid: that.data.Uid
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData(
          {
            datalist: res.data.data
          }
        );
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: "https://volleywang.cn/liansaiquan/model/GetMyLike.php",
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        uid: options.id
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          datalist: res.data.data,
          Uid: options.id
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
})