// pages/find/search/searchresult/searchresult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultlist:[],
    h2h:'',
    teamA:'',
    teamB:'赛事信息搜索系统',
    coverflag:true,
    toastflag:true,
    videotitle:'',
    videolink:'',
    percent:'%',
    status:1
  },
  video:function(e){
    this.setData({
      coverflag: false,
      videotitle: e.currentTarget.dataset.videotitle,
      videolink: e.currentTarget.dataset.videolink,
    })
  },
  closevideo:function(e){
    this.setData({
      coverflag: true,
      videotitle: '',
      videolink: '',
    })
  },
  copy: function (e) {
    var that = this
    wx.setClipboardData({
      data: e.currentTarget.dataset.videolink,
      success:function() {
        that.setData({
          toastflag: false,
          coverflag: true
        })
      }
    })
  },
  toastHidden: function () {
    var that = this
    this.setData({
      toastflag: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (options.status == 2) {
      wx.setNavigationBarTitle({
        title: options.teamA +' vs '+ options.teamB+ ' - 搜索结果',
      })
      this.setData({
        status:options.status
      })
      wx.request({
        url: 'https://volleywang.cn/index.php/api/search/fight',
        header: {
          "content-type": "application/json;charset=utf8"
        },
        method: "GET",
        data: {
          teamA: options.teamA,
          teamB: options.teamB
        },
        success: function (res) {
          console.log(res.data);
          that.setData({
            resultlist: res.data.data,
            teamA: options.teamA,
            teamB: options.teamB
          })
        }
      })
      wx.request({
        url: 'https://volleywang.cn/index.php/api/search/h2h',
        header: {
          "content-type": "application/json;charset=utf8"
        },
        method: "GET",
        data: {
          teamA: options.teamA,
          teamB: options.teamB
        },
        success: function (res) {
          console.log(res.data);
          that.setData({
            h2h: res.data.data,
          })
        }
      })
    }

    if (options.status == 1) {
      wx.setNavigationBarTitle({
        title: options.teamA + ' - 搜索结果',
      })
      this.setData({
        status: options.status
      })
      wx.request({
        url: 'https://volleywang.cn/index.php/api/search/onefight',
        header: {
          "content-type": "application/json;charset=utf8"
        },
        method: "GET",
        data: {
          teamA: options.teamA
        },
        success: function (res) {
          console.log(res.data);
          that.setData({
            resultlist: res.data.data,
            teamA: options.teamA
          })
        }
      })
      wx.request({
        url: 'https://volleywang.cn/index.php/api/search/oneh2h',
        header: {
          "content-type": "application/json;charset=utf8"
        },
        method: "GET",
        data: {
          teamA: options.teamA
        },
        success: function (res) {
          console.log(res.data);
          var p = ((res.data.data[1] / res.data.data[0]) * 100).toFixed(1);
          that.setData({
            h2h: res.data.data,
            percent : p
          })
        }
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})