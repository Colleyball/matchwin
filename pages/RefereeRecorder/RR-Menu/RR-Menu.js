// pages/MatchBox/RefereeRecorder/RR-ChooseSide/RR-ChooseSide.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tips:0,
  },
  position:function (){
    wx.navigateTo({
      url: '../RR-Position/RR-Position',
    })
  },
  entermatch: function () {
    wx.navigateTo({
      url: '../Volleyball/RR-Volleyball',
    })
  },
  chooseside: function(res) {
    wx.navigateTo({
      url: '../RR-Side/RR-Side',
    })
  },
  sub: function(res) {
    wx.navigateTo({
      url: '../RR-sub/RR-sub',
    })
  },
  editscore:function(res) {
    wx.navigateTo({
      url: '../RR-Score/RR-Score',
    })
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
    if (wx.getStorageSync('R-status') == 3) {
      wx.showModal({
        title: '提示',
        content: '该局比赛已经结束，点击确认键开始下一局比赛',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.showLoading({
              title: '正在加载中……',
            })
            wx.request({
              url: "https://volleywang.cn/index.php/rr/startnewset",
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              data: {
                Matchid: wx.getStorageSync('matchinfo').Matchid,
                TeamAid: wx.getStorageSync('matchinfo').TeamAid,
                TeamBid: wx.getStorageSync('matchinfo').TeamBid,
                Round: wx.getStorageSync('matchinfo').Round,
                Uid: wx.getStorageSync('Uid'),
                LastSide: wx.getStorageSync('lastside'),
                LastServer: wx.getStorageSync('lastserver'),
              },
              success: function (res) {
                console.log(res.data)
                wx.hideLoading()
                wx.setStorage({
                  key: 'insertid',
                  data: res.data.data,
                })
                wx.setStorage({
                  key: 'R-status',
                  data: '0',
                })
                wx.showModal({
                  title: '提示',
                  content: '请填写站位，决胜局需要重新挑边',
                  showCancel: false,
                }) 
              }
            })
          }
        }
      })
    }
    if (wx.getStorageSync('R-status') == 0) {
      wx.showModal({
        title: '提示',
        content: '未进行挑边或填写站位',
        showCancel: false,
      })    
    }
    if (wx.getStorageSync('R-status') == 2) {
      wx.request({
        url: "https://volleywang.cn/index.php/rr/getlastmatchinfo",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          Matchid: wx.getStorageSync('matchinfo').Matchid,
          TeamAid: wx.getStorageSync('matchinfo').TeamAid,
          TeamBid: wx.getStorageSync('matchinfo').TeamBid,
          Round: wx.getStorageSync('matchinfo').Round,
          Uid: wx.getStorageSync('Uid')
        },
        success: function (res) {
          console.log(res.data);
          wx.showModal({
            title: '重要！',
            content: '比赛结束，点击确认比赛结果' + '\r\n' +
            wx.getStorageSync('matchinfo').TeamAName +
            res.data.data[0].MatchA + ':' +
            res.data.data[0].MatchB +
            wx.getStorageSync('matchinfo').TeamBName + '\r\n第一局：' +
            res.data.data[0].Set1A + '-' +
            res.data.data[0].Set1B + '\r\n第二局：' +
            res.data.data[0].Set2A + '-' +
            res.data.data[0].Set2B + '\r\n第三局：' +
            res.data.data[0].Set3A + '-' +
            res.data.data[0].Set3B + '\r\n第四局：' +
            res.data.data[0].Set4A + '-' +
            res.data.data[0].Set4B + '\r\n第五局：' +
            res.data.data[0].Set5A + '-' +
            res.data.data[0].Set5B 
            ,
            showCancel: false,
            success:function(res){
              if (res.confirm) {
                wx.request({
                  url: "https://volleywang.cn/index.php/rr/endmatch",
                  header: {
                    "content-type": "application/x-www-form-urlencoded"
                  },
                  method: "POST",
                  data: {
                    id: wx.getStorageSync('matchinfo').id,
                  },
                  success: function (res) {
                    console.log(res.data)
                    wx.removeStorageSync('matchinfo')
                  }
                })
                wx.removeStorageSync('insertid')
                wx.removeStorageSync('lastside')
                wx.removeStorageSync('lastserver')
                wx.navigateBack()
              }
            }
          })
        }
      })
    }
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