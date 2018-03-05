// pages/RefereeRecorder/RR-Side/RR-Side.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dotAnData:'',
    dotAnData2: '',
    dotAnData3: '',
    result:'',
    teamA:'',
    teamB:'',
    toolflag:true
  },

  submit:function(){
    var that = this
    var i = 0
    wx.showLoading({
      title: '正在挑边',
      mask:true
    })
    var result = Math.random()
    var dotAnData = wx.createAnimation({
      duration: 80,
      transformOrigin: 50 % 50 % 0
    })
    var dotAnData2 = wx.createAnimation({
      duration: 500,
      transformOrigin: '50% 50% 0'
    })
    var dotAnData3 = wx.createAnimation({
      duration: 500,
      transformOrigin: '50% 50% 0'
    })
    dotAnData2.scale(1).translateY(0).step()
    that.setData({
      dotAnData2: dotAnData2.export(),
    })
    dotAnData3.scale(1).translateY(0).step()
    that.setData({
      dotAnData3: dotAnData3.export(),
    })
    var id = setInterval(function () {
      dotAnData.rotate3d(1, 0, 0, -30 * (++i)).step()
      that.setData({
        dotAnData: dotAnData.export(),
      })
    }.bind(that), 80)
    setTimeout(function(){
      clearInterval(id)
      dotAnData.rotate3d(1, 0, 0, 0 * (++i)).step()
      that.setData({
        dotAnData: dotAnData.export(),
      })
      wx.hideLoading()
      if (result < 0.5) {
        dotAnData2.scale(1.6).translateY(70).step()
        that.setData({
          dotAnData2: dotAnData2.export(),
          result: wx.getStorageSync('matchinfo').TeamAName
        })
      } else {
        dotAnData3.scale(1.6).translateY(-70).step()
        that.setData({
          dotAnData3: dotAnData3.export(),
          result: wx.getStorageSync('matchinfo').TeamBName
        })
      }
      wx.showModal({
        title: '挑边结果',
        content: that.data.result,
        showCancel:false,
        success:function(res){
          if(res.confirm){
            that.setData({
              toolflag:false 
            })
          }
        }
      })
    }, 2400)
  },
  formSubmit:function(e){
    wx.setStorage({
      key: 'lastside',
      data: e.detail.value.position,
    })
    wx.setStorage({
      key: 'lastserver',
      data: e.detail.value.server,
    })
    var that = this
    wx.request({
      url: "https://volleywang.cn/index.php/rr/updateside",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        id: wx.getStorageSync('insertid'),
        Matchid: wx.getStorageSync('matchinfo').Matchid,
        TeamAid: wx.getStorageSync('matchinfo').TeamAid,
        TeamBid: wx.getStorageSync('matchinfo').TeamBid,
        Round: wx.getStorageSync('matchinfo').Round,
        Uid: wx.getStorageSync('Uid'),
        Position: e.detail.value.position,
        Server: e.detail.value.server,
      },
      success: function (res) {
        that.setData({
          toolflag: true,
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
    this.setData({
      teamA: wx.getStorageSync('matchinfo').TeamAName,
      teamB: wx.getStorageSync('matchinfo').TeamBName,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
    */
  onReady: function () {
    this.animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-in-out',
      delay: 0,
      transformOrigin: '50% 50% 0'
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
      toolflag: true,
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
  
  }
})