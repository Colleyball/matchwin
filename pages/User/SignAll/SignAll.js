Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist: [],
    Uid: "",
    sign:"https://volleywang.cn/liansaiquan/images/sign/sign.png"
  },
  sign: function (e) {
    var that = this
      
      //todo 一键签到

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
        that.setData(
          {
            datalist: res.data.data
          }
        )
        that.setData({
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