//index.js
var util = require('../../utils/util.js')
//获取应用实例
var app = getApp()
Page({
  data: {
    mainpic:{
      basketball: "https://www.volleywang.cn/liansaiquan/images/wechat/index/basketball.jpg",
      football: "https://www.volleywang.cn/liansaiquan/images/wechat/index/football.jpg",
      badminton: "https://www.volleywang.cn/liansaiquan/images/badminton.png",
      volleyball: "https://www.volleywang.cn/liansaiquan/images/wechat/index/volleyball.jpg",
      tool: "https://www.volleywang.cn/liansaiquan/images/wechat/index/tools.jpg",
    },
    userInfo: {},
    userlogin: false,
    Uid:0,
    weatherflag: true
  },
  //事件处理函数
  bindViewTapGame: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindViewTapBasketball: function () {
    wx.navigateTo({
      url: '../SportItems/SportItems?id=' + '篮球'
    })
  },
  bindViewTapFootball: function () {
    wx.navigateTo({
      url: '../SportItems/SportItems?id=' + '足球'
    })
  },
  bindViewTapVolleyball: function () {
    wx.navigateTo({
      url: '../SportItems/SportItems?id='+'排球'
    })
  },
  bindViewTapMatchBox: function () {
    wx.navigateTo({
      url: '../MatchBox/MatchBox'
    })
  },
  bindUserInfo: function () {
    wx.navigateTo({
      url: '../User/User',
    })
  },
  bindLive: function () {
    wx.navigateTo({
      url: '../Match/MatchDetails/schedule/live/live',
    })
  },
  bindWeather: function () {
    this.setData({
      weatherflag: !this.data.weatherflag
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          userInfo: res.data,
        })
      }
    })
    app.getUserOpenid()
    util.getUid(this)
   //判断用户有无登陆 
  },
  onShow: function () {
    var that = this
    wx.request({
      url: 'https://www.sojson.com/open/api/weather/json.shtml?city=杭州',
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
      },
      success:function (res) {
        that.setData({
          weather:res.data
        })
      }
    })
    var id = setInterval(function(){
      console.log('new matchinfo')
      wx.getStorage({
        key: 'liveinfo',
        success: function (res) {
          console.log(res.data)
          that.setData({
            matchinfo: res.data
          })
          wx.request({
            url: "https://volleywang.cn/index.php/api/live/getrefuid",
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
              Matchid: res.data.Matchid,
              TeamAid: res.data.TeamAid,
              TeamBid: res.data.TeamBid,
              Round: res.data.Round,
            },
            success: function (res) {
              console.log(res.data);
              that.setData({
                refuid: res.data.data,
              })
              wx.request({
                url: "https://volleywang.cn/index.php/api/live/getallmatchinfo",
                header: {
                  "content-type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                data: {
                  Matchid: that.data.matchinfo.Matchid,
                  TeamAid: that.data.matchinfo.TeamAid,
                  TeamBid: that.data.matchinfo.TeamBid,
                  Round: that.data.matchinfo.Round,
                  Uid: res.data.data
                },
                success: function (res) {
                  console.log(res.data)
                  that.setData({
                    allmatch: res.data.data
                  })
                }
              })
              wx.request({
                url: "https://volleywang.cn/index.php/rr/getlastmatchinfo",
                header: {
                  "content-type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                data: {
                  Matchid: that.data.matchinfo.Matchid,
                  TeamAid: that.data.matchinfo.TeamAid,
                  TeamBid: that.data.matchinfo.TeamBid,
                  Round: that.data.matchinfo.Round,
                  Uid: res.data.data
                },
                success: function (res) {
                  console.log(res.data);
                  that.setData({
                    lastmatchinfo: res.data.data,
                  })
                  var i = parseInt(res.data.data[0].MatchA) + parseInt(res.data.data[0].MatchB)
                  var status = res.data.data[0].Status
                  if (i == 0) {
                    that.setData({
                      setA: res.data.data[0].Set1A,
                      setB: res.data.data[0].Set1B,
                    })
                  }
                  if (i == 1) {
                    that.setData({
                      setA: res.data.data[0].Set2A,
                      setB: res.data.data[0].Set2B,
                    })
                  }
                  if (i == 2) {
                    that.setData({
                      setA: res.data.data[0].Set3A,
                      setB: res.data.data[0].Set3B,
                    })
                  }
                  if (i == 3) {
                    that.setData({
                      setA: res.data.data[0].Set4A,
                      setB: res.data.data[0].Set4B,
                    })
                  }
                  if (i == 4) {
                    that.setData({
                      setA: res.data.data[0].Set5A,
                      setB: res.data.data[0].Set5B,
                    })
                  }
                }
              })
            }
          })
        },
      })
    }.bind(that),5000)
  },
  onLaunch:function() {
  },
  onReady:function(){
  },
  onHide:function(){
  },
  onShareAppMessage: function () {
    var that = this
    return {
      title: '@' + wx.getStorageSync('userInfo').nickName + '发现了一款很有意思的小程序“赛事窗”快来瞅瞅吧',
      desc: '点击进入赛事窗',
      path: '/pages/index/index',
    }
  }
})

