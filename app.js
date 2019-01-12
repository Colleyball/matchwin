//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
              wx.setStorageSync('userInfo', res.userInfo);
            },
            fail: function (res) {
              console.log('未授权', res)
            }
          })
          if (res.code) {
            wx.request({
              url: 'https://volleywang.cn/index.php/api/getuid',
              header: {
                "content-type": "application/json;charset=utf8"
              },
              method: "GET",
              data: {
                code: res.code
              },
              success: function (res) {
                console.log(res.data);
                wx.setStorageSync('Uid', res.data.data)
              }
            })
          } else {
            console.log('获取用户信息失败')
          }
        }
      })
    }
  },
  getUserOpenid: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.request({
              url: 'https://volleywang.cn/index.php/api/getuid',
              header: {
                "content-type": "application/json;charset=utf8"
              },
              method: "GET",
              data: {
                code: res.code
              },
              success: function (res) {
                console.log(res.data);
                wx.setStorageSync('Uid', res.data.data)
              }
            })
          } else {
            console.log('获取用户信息失败')
          }
        }
      })
    }
  },//不发起用户登陆，只获取openid
  globalData:{
    userInfo:null
  }
})