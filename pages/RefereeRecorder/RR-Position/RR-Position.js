// pages/RefereeRecorder/RR-Position/RR-Position.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchinfo:[],
    Uid:'',
    playerlist:[],
    Aone: '一号位',
    Atwo: '二号位',
    Athree: '三号位',
    Afour: '四号位',
    Afive: '五号位',
    Asix: '六号位',
    Bone: '一号位',
    Btwo: '二号位',
    Bthree: '三号位',
    Bfour: '四号位',
    Bfive: '五号位',
    Bsix: '六号位',
    AoneN: ' ',
    AtwoN: ' ',
    AthreeN: ' ',
    AfourN: ' ',
    AfiveN: ' ',
    AsixN: ' ',
    BoneN: ' ',
    BtwoN: ' ',
    BthreeN: ' ',
    BfourN: ' ',
    BfiveN: ' ',
    BsixN: ' ',
    toolflag:true,
    playertoast:true,
    playertoastB:true,
    position:'',
    Awidth: '90%',
    Bwidth: '70%',
    Afont: '40rpx',
    Bfont: '30rpx',
    showteamA:false,
    showteamB:true
  },
  teamA:function(){
    this.setData({
      Awidth: '90%',
      Bwidth: '70%',
      Afont: '45rpx',
      Bfont: '30rpx',
      showteamA: false,
      showteamB: true,
    })
  },
  teamB:function(){
    this.setData({
      Awidth: '70%',
      Bwidth: '90%',
      Afont: '30rpx',
      Bfont: '45rpx',
      showteamA: true,
      showteamB: false
    })
  },
  playerchooseed:function(){
    wx.showModal({
      title: '提示',
      content: '改名队员已被选择，请选择其他队员',
      showCancel:false
    })
  },
  confirmplayer:function(e){
    var p = this.data.position
    var pn = this.data.position+'N'
    this.setData({
      [p]: e.currentTarget.dataset.num,
      [pn]: e.currentTarget.dataset.name,
      toolflag: true,
      playertoast: true,
      playertoastB: true,
    })
  },
  chooseplayer:function(e){
    this.setData({
      position: e.currentTarget.dataset.position,
      toolflag: false,
      playertoast: false,
    })
  },
  chooseplayerB: function (e) {
    this.setData({
      position: e.currentTarget.dataset.position,
      toolflag: false,
      playertoastB: false,
    })
  },
  close:function(){
    this.setData({
      toolflag: true,
      playertoast: true,
      playertoastB: true
    })
  },
  submit: function () {
    wx.showToast({
      title: '正在填写站位',
      icon: 'loading',
      duration: 40000,
      mask: true
    })
    this.setData({
      toolflag: false,
    })
    var that = this
    wx.request({
      url: "https://volleywang.cn/index.php/rr/updateturn",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        id: wx.getStorageSync('insertid'),
        Matchid: that.data.matchinfo.Matchid,
        TeamAid: that.data.matchinfo.TeamAid,
        TeamBid: that.data.matchinfo.TeamBid,
        Round: that.data.matchinfo.Round,
        Uid: that.data.Uid,
        Aone: that.data.Aone,
        Atwo: that.data.Atwo,
        Athree: that.data.Athree,
        Afour: that.data.Afour,
        Afive: that.data.Afive,
        Asix: that.data.Asix,
        Bone: that.data.Bone,
        Btwo: that.data.Btwo,
        Bthree: that.data.Bthree,
        Bfour: that.data.Bfour,
        Bfive: that.data.Bfive,
        Bsix: that.data.Bsix,
      },
      success:function(res){
        wx.hideToast();
        that.setData({
          toolflag: false,
        })
        wx.setStorage({
          key: 'R-status',
          data: '1',
        })
        wx.navigateBack()
        console.log(res.data)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showToast({
      title: '正在加载中……',
      icon: 'loading',
      duration: 40000,
      mask: true
    })
    this.setData({
      toolflag: false,
    })
    wx.getStorage({
      key: 'matchinfo',
      success: function(res) {
        that.setData({
          matchinfo:res.data
        })
        wx.getStorage({
          key: 'Uid',
          success: function (res) {
            console.log(res.data)
            that.setData({
              Uid: res.data
            })
            wx.request({
              url: "https://volleywang.cn/index.php/rr/getplayer",
              header: {
                "content-type": "application/json;charset=utf8"
              },
              method: "GET",
              data: {
                Matchid: that.data.matchinfo.Matchid,
                TeamAid: that.data.matchinfo.TeamAid,
                TeamBid: that.data.matchinfo.TeamBid,
                Round: that.data.matchinfo.Round,
                Uid: that.data.Uid
              },
              success: function (res) {
                console.log(res.data);
                that.setData({
                  playerlist: res.data.data,
                  toolflag: true,
                })
                wx.hideToast()
              }
            })
          },
        })
      },
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
  
  }
})