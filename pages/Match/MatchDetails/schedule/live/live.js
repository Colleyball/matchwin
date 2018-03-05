Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchinfo: '',
    lastmatchinfo: '',
    Uid: '',
    setA: '',
    setB: '',
    toolflag: true,
    refuid:'',
    statistic:'',
  },
  home: function () {
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
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
              success:function(res){
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
            wx.request({
              url: "https://volleywang.cn/index.php/api/live/statistic",
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
                  statistic: res.data.data,
                })
              }
            })
          }
        })
      },
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
    var that = this
    var that = this
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
            wx.request({
              url: "https://volleywang.cn/index.php/api/live/statistic",
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
                  statistic: res.data.data,
                })
              }
            })
          }
        })
      },
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

})