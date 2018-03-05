// pages/find/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultlist:[],
    resultnum: '',
    status:0
  },
  formSubmit: function (e) {
    var that = this
    wx.setNavigationBarTitle({
      title: e.detail.value.name + ' - 搜索结果',
    })
    wx.request({
      url: 'https://volleywang.cn/index.php/api/search',
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        name: e.detail.value.name
      },
      success: function (res) {
        console.log(res.data);
        var num = count(res.data.data)
        that.setData({
          resultlist: res.data.data,
          resultnum: num
        })
        if (res.data.message == '功获成取搜索结果-2') {
          that.setData({
            status: 2
          })
        }
        if (res.data.message == '功获成取搜索结果-1') {
          that.setData({
            status: 1
          })
        }
        if (res.data.message == '功获成取搜索结果-0') {
          that.setData({
            status: 0
          })
        }
      }
    })
  },
  searchresult:function(e){
    wx.navigateTo({ 
      url: 'searchresult/searchresult?teamA=' + e.currentTarget.dataset.teama + '&teamB=' + e.currentTarget.dataset.teamb + '&status=' + e.currentTarget.dataset.status,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: options.value + ' - 搜索结果',
    })
    wx.request({
      url: 'https://volleywang.cn/index.php/api/search',
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        name:options.value
      },
      success: function (res) {
        console.log(res.data);
        var num = count(res.data.data)
        that.setData({
          resultlist:res.data.data,
          resultnum:num
        })
        if (res.data.message == '功获成取搜索结果-2') {
          that.setData({
            status:2
          })
        }
        if (res.data.message == '功获成取搜索结果-1') {
          that.setData({
            status: 1
          })
        }
        if (res.data.message == '功获成取搜索结果-0') {
          that.setData({
            status: 0
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})

function count(obj) {
  var objType = typeof obj;
  if (objType == "string") {
    return obj.length;
  } else if (objType == "object") {
    var objLen = 0;
    for (var i in obj) {
      objLen++;
    }
    return objLen;
  }
  return false;
}