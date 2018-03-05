// Match.js
// Team.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  matchdetails:function(e){
    wx.redirectTo({
      url: 'MatchDetails/MatchDetails?id=' + e.target.dataset.matchid+'&name='+e.target.dataset.matchname,
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
        matchtype: options.id
      },
      success: function (res) {
        console.log(res.data.data);
        that.setData(
          {
            datalist: res.data.data
          }

        );
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
  
  }
})