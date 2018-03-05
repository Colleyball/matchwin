// SignupTeam.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist:[],
    Uid:'',
    matchid:'',
    hasjoin:'',
    hiddenToast:true,
    getjoin:true,
    teamid:'',
    playerlist:[],
    title:'请选择参赛队',
    toolflag:false,
    joinstatus:'',    
  },
  join:function(e) {
    var that = this
    wx.navigateTo({
      url: 'chooseplayer/chooseplayer?teamid=' + e.currentTarget.dataset.teamid + '&matchid=' + that.data.matchid
    })
  },
  edit:function(e) {
    var that = this
    console.log()
    wx.navigateTo({
      url: 'editplayer/editplayer?cardid=' + e.currentTarget.dataset.cardid + '&matchid=' + that.data.matchid + '&name='+ e.currentTarget.dataset.name
    })
  },
  gototeam:function() {
    var that = this
    wx.navigateTo({
      url: '../../../Team/Teamid=排球&uid='+that.data.Uid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that = this
  this.setData({
    matchid: options.matchid,
    Uid: options.id
  })
  wx.showLoading({
    title: '正在加载中',
    mask:'true'
  })
  wx.request({
    url: "https://volleywang.cn/index.php/api/getownteam",
    header: {
      "content-type": "application/json;charset=utf8"
    },
    method: "GET",
    data: {
       Uid: options.id,
    },
    success: function (res) { 
      console.log(res.data);
      that.setData({ 
        datalist: res.data.data
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
    var that = this
    wx.request({
      url: "https://volleywang.cn/index.php/api/getjoinmatchstatus",
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        Matchid: that.data.matchid,
        Uid: that.data.Uid,
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          joinstatus: res.data.data,
          toolflag: true
        })
        wx.hideLoading()
        if (res.data.data) {
          wx.request({
            url: "https://volleywang.cn/index.php/api/getjoinmatchplayer",
            header: {
              "content-type": "application/json;charset=utf8"
            },
            method: "GET",
            data: {
              Matchid: that.data.matchid,
              Uid: that.data.Uid,
            },
            success: function (res) {
              console.log(res.data)
              that.setData({
                playerlist: res.data.data,
                title: '参赛队员信息'
              })
            }
          })
        }
      }
    })
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