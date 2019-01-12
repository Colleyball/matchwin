// pages/find/Together/Together.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 1,
  },
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
    if (e.detail.current == 0) {
      that.setData({
        swiper_height: 650
      })
    }
    if (e.detail.current == 1) {
      that.setData({
        swiper_height: that.data.player_count_a * 70 + 650
      })
    }
  },
  /*** 点击tab切换***/
  swichNav: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  }
})