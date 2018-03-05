// find.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist:[],
  },
  openact:function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.thisurl,
    })
  },
  formSubmit:function(e){
    wx.navigateTo({
      url: 'search/search?value='+e.detail.value.name,
    })
  },
  winrank: function () {
    wx.navigateTo({
      url: 'winrank/winrank',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://volleywang.cn/index.php/api/getallactinfo',
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {},
      success:function (res) {
        console.log(res.data)
        that.setData({
          datalist:res.data.data,
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
      title: '@' + wx.getStorageSync('userInfo').nickName + '发现了一款很有意思的小程序“赛事窗”快来瞅瞅吧',
      desc: '点击进入赛事窗',
      path: '/pages/index/index',
    }
  }
})