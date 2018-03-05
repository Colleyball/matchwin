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
    closeflag:true,
    toolflag:true,
    coverhidden:true,
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
  bindViewTapBadminton: function () {
    wx.navigateTo({
      url: '../SportItems/SportItems?id=' + '羽毛球'
    })
  },
  bindViewTapMatchBox: function () {
    wx.navigateTo({
      url: '../MatchBox/MatchBox'
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

