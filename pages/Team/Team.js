// Team.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
    
  /**
   * 页面的初始数据
   */
  data: {
    datalist:[],
    userlogin:"",
    Uid:"",
    matchtype : "",
    create:"https://volleywang.cn/liansaiquan/images/basketball/team/create.png",
    sign:"https://volleywang.cn/liansaiquan/images/basketball/team/sign.png",
    rank:"https://volleywang.cn/liansaiquan/images/basketball/team/rank.png",
    toolflag:true,
    hiddenToast:true,
    animation:'',
    animation2:'',
  },
  opentool:function(){
    this.animation2.opacity(1).step()
    this.animation.translateY(-300).opacity(1).step()
    this.setData({ toolflag: false})
    this.setData({
      animation: this.animation.export(),
      animation2: this.animation2.export()
    })
  },
  closetool: function () {
    var that = this
    this.animation.translateY(300).opacity(0).step()
    this.animation2.opacity(0).step()
    this.setData({
      animation:this.animation.export(),
      animation2: this.animation2.export()
    })
    setTimeout(function () {
      this.setData({
        toolflag: true
      })
    }.bind(this), 500)  
  },
  MyTeam:function(){
    var that = this
    wx.navigateTo({
      url: 'MyTeam/MyTeam?uid=' + that.data.Uid + '&matchtype=' + that.data.matchtype,
    })
  },
CreateTeam:function(){
  var that = this
  wx.navigateTo({
    url: 'CreateTeam/CreateTeam?uid='+that.data.Uid+'&matchtype='+that.data.matchtype,
  })
},
bindViewTapTeam:function(e){
  var that = this;
  wx.navigateTo({
    url: 'TeamDetails/TeamDetails?id=' + e.target.dataset.teamid + '&uid=' + that.data.Uid + '&matchtype=' + that.data.matchtype + '&fans=' + e.target.dataset.fans,
  })
},
  like:function(e){
    var that = this
    wx.request({
      url: "https://volleywang.cn/liansaiquan/model/UseraddLike.php",
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        uid:that.data.Uid,
        teamid: e.target.dataset.teamid
      },
      success: function (res) {
        wx.request({
          url: "https://volleywang.cn/index.php/api/getallteaminfo",
          header: {
            "content-type": "application/json;charset=utf8"
          },
          method: "GET",
          data: {
            Uid: that.data.Uid,
            matchtype: that.data.matchtype
          },
          success: function (res) {
            console.log(res.data)
            wx.showToast({
              title: '关注成功',
              icon: 'success',
              duration: 1500
            })
            that.setData({
              datalist: res.data.data
            })
          }
        })
      }
    })
  },
  sign:function(e){
    var that = this
    wx.request({
      url: "https://volleywang.cn/liansaiquan/model/UserSign.php",
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        uid: that.data.Uid,
        teamid: e.target.dataset.teamid
      },
      success: function (res) {
        that.setData({
          hiddenToast: false
        })
        wx.request({
          url: "https://volleywang.cn/index.php/api/getallteaminfo",
          header: {
            "content-type": "application/json;charset=utf8"
          },
          method: "GET",
          data: {
            Uid: that.data.Uid,
            matchtype: that.data.matchtype
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
      }
    })
  },
  toastHidden: function () {
    this.setData({
      hiddenToast: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (!options.Uid) {
      util.getUid(this)
      this.setData({
        Uid: wx.getStorageSync('Uid')
      })
    }
    wx.request({
      url: "https://volleywang.cn/index.php/api/getallteaminfo",
    header: {
        "content-type": "application/json;charset=utf8"
    },
    method: "GET",  
    data:{
        Uid: options.uid,
        matchtype: options.id
      },
      success: function (res) {
        console.log(res.data)
        that.setData(
          {
            datalist: res.data.data,
            matchtype: options.id
          }
        );
      }
    })
      wx.getStorage({
        key: 'Uid',
        success: function (res) {
          that.setData({
            Uid: res.data,
          })
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
      delay: 0,
      transformOrigin: 'left top 0'
    })
    this.animation2 = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
      delay: 0,
      transformOrigin: 'left top 0'
    })
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
    this.setData({
      toolflag: true
    })
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

