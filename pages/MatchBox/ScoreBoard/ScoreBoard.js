// pages/MatchBox/ScoreBoard/ScoreBoard.js
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
   animationA:'',
   animationB:'',
   tip_score:'',
   Ascore:0,
   Bscore:0,
   Aname:'',
   Bname:'',
  },
  addscoreA:function(option) {
    var addscore = parseInt(option.target.dataset.score)
    this.animationA.translateY(-300).scale(2).opacity(0.8).step()
    this.setData({
      tip_score: '+' + option.target.dataset.score,
      animationA: this.animationA.export(),
    })
    setTimeout(function(){
      this.animationA.translateY(0).scale(0).opacity(0).step()
      this.setData({
        animationA: this.animationA.export(),
        Ascore: this.data.Ascore + addscore
      })
    }.bind(this),1000)
  },
  addscoreB: function (option) {
    var addscore = parseInt(option.target.dataset.score)
    this.animationB.translateY(-300).scale(2).opacity(0.8).step()
    this.setData({
      tip_score: '+' + option.target.dataset.score,
      animationB: this.animationB.export(),
    })
    setTimeout(function () {
      this.animationB.translateY(0).scale(0).opacity(0).step()
      this.setData({
        animationB: this.animationB.export(),
        Bscore: this.data.Bscore + addscore
      })
    }.bind(this), 1000)
  },
  reducescoreA: function (option) {
    this.animationA.translateY(-300).scale(2).opacity(0.8).step()
    this.setData({
      tip_score: '-1',
      animationA: this.animationA.export(),
    })
    setTimeout(function () {
      this.animationA.translateY(0).scale(0).opacity(0).step()
      this.setData({
        animationA: this.animationA.export(),
        Ascore: this.data.Ascore - 1
      })
    }.bind(this), 1000)
  },
  reducescoreB: function (option) {
    this.animationB.translateY(-300).scale(2).opacity(0.8).step()
    this.setData({
      tip_score: '-1',
      animationB: this.animationB.export(),
    })
    setTimeout(function () {
      this.animationB.translateY(0).scale(0).opacity(0).step()
      this.setData({
        animationB: this.animationB.export(),
        Bscore: this.data.Bscore - 1
      })
    }.bind(this), 1000)
  },
  getA:function(e){
    this.setData({
      Aname:e.detail.value
    })
  },
  getB: function (e) {
    this.setData({
      Bname: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if(wx.getStorageSync('ScoreBoard')){
      wx.showModal({
        title:'提示',
        content:'是否载入上次的记录',
        success:function(res) {
          if(res.confirm){
            wx.getStorage({
            key: 'ScoreBoard',
            success: function(res) {
              that.setData({
                Ascore: res.data.Ascore,
                Bscore: res.data.Bscore,
                Aname: res.data.teamA,
                Bname: res.data.teamB,
              })
            },
          })
          }
          if(!res.confirm){
            wx.removeStorageSync('ScoreBoard')
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.animationA = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
      delay: 0,
    })
    this.animationB = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
      delay: 0,
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
    console.log(1)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var that = this
    if(this.data.Aname==""&&this.data.Bname==""&&this.data.Ascore==0&&this.data.Bscore==0){

    } else {
      wx.setStorage({
        key: 'ScoreBoard',
        data: {
          time: util.gettime(),
          teamA: this.data.Aname,
          teamB: this.data.Bname,
          Ascore: this.data.Ascore,
          Bscore: this.data.Bscore
        },
        success: function (res) { console.log(res) },
        fail: function (res) { console.log(res) },
        complete: function (res) { console.log(res) },
      })
    }
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