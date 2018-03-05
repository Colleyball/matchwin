// pages/MatchBox/RefereeRecorder/RR-Volleyball.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchinfo:'',
    lastmatchinfo:'',
    Uid:'',
    setA:'',
    setB:'',
    scoremethodflag:true,
    toolflag:true,
    showteamB:true,
    showteamA:true,
    animation: '',
    scoremethod:'',
    team:'',
    teamtimeout:'',
    cancel:true,
    showtimeout:true,
    second: 30,
    showtimeouttime:true
  },
  home:function(){
    wx.navigateBack()
  },
  editscore: function () {
    wx.navigateTo({
      url: '../RR-Score/RR-Score',
    })
  },
  editsideposition: function () {
    wx.navigateTo({
      url: '../RR-Side/RR-Side',
    })
  },
  sub:function(){
    wx.navigateTo({
      url: '../RR-sub/RR-sub',
    })
  },
  over: function () {
    wx.showModal({
      title: '提示',
      content: '该队暂停次数已用完！',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          wx.navigateBack()
        }
      }
    })
  },
  addsocre:function(e){
    this.animation.translateY(-300).opacity(1).step()
    setTimeout(function () {
      this.setData({
        animation: this.animation.export(),
      })
    }.bind(this), 200)
    this.setData({
      toolflag: false,
      scoremethodflag: false,
      cancel:false,
      team:e.currentTarget.dataset.team
    })
  },
  showtimeout:function(){
    this.animation.translateY(-300).opacity(1).step()
    setTimeout(function () {
      this.setData({
        animation: this.animation.export(),
      })
    }.bind(this), 200)
    this.setData({
      toolflag: false,
      showtimeout: false,
      cancel: false,
    })
  },
  timeout:function(e){
    var that = this
    this.setData({
      showtimeouttime:false
    })
    wx.request({
      url: "https://volleywang.cn/index.php/rr/timeout",
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
        Team: e.currentTarget.dataset.team
      },
      success:function(res){
        console.log(res.data)
        wx.showLoading({
          title: '正在暂停中……',
        })
        that.setData({
          cancel: true,
          showtimeout: true,
          showteamA: true,
          showteamB: true,
        })
        var i =30
        setInterval(function(){
          that.setData({
            second: i--
          })
        },1000)
        setTimeout(function(){
          that.setData({
            toolflag: true,
            showtimeouttime: true,
            second: 30
          })
          wx.navigateBack()
        },32000)
      }
    })
  },
  server:function(e) {
    var that = this
    this.setData({
      scoremethod: e.currentTarget.dataset.scoremethod,
      scoremethodflag: true
    })
    if (this.data.team == 'A') {
      wx.request({
        url: "https://volleywang.cn/index.php/rr/addscore",
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
          Team: that.data.team,
          ScoreMethod: e.currentTarget.dataset.scoremethod,
          Cardid: e.currentTarget.dataset.teamaserver
        },
        success: function (res) {
          console.log(res.data)
          wx.setStorageSync('insertid', res.data.data)
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
              wx.hideLoading()
              that.setData({
                lastmatchinfo: res.data.data,
              })
              var status = res.data.data[0].Status
              if (status == 3) {
                wx.setStorage({
                  key: 'R-status',
                  data: 3,
                  success: function () {
                    wx.navigateBack()
                  }
                })
              }
              if (status == 2) {
                wx.setStorage({
                  key: 'R-status',
                  data: 2,
                  success: function () {
                    wx.navigateBack()
                  }
                })
              }
              if (status == 1) {
                wx.setStorage({
                  key: 'R-status',
                  data: 1
                })
              }
              var i = parseInt(res.data.data[0].MatchA) + parseInt(res.data.data[0].MatchB)
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
    } else {
      wx.request({
        url: "https://volleywang.cn/index.php/rr/addscore",
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
          Team: that.data.team,
          ScoreMethod: e.currentTarget.dataset.scoremethod,
          Cardid: e.currentTarget.dataset.teambserver
        },
        success: function (res) {
          console.log(res.data)
          wx.setStorageSync('insertid', res.data.data)
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
              wx.hideLoading()
              that.setData({
                lastmatchinfo: res.data.data,
              })
              var status = res.data.data[0].Status
              if (status == 3) {
                wx.setStorage({
                  key: 'R-status',
                  data: 3,
                  success: function () {
                    wx.navigateBack()
                  }
                })
              }
              if (status == 2) {
                wx.setStorage({
                  key: 'R-status',
                  data: 2,
                  success: function () {
                    wx.navigateBack()
                  }
                })
              }
              if (status == 1) {
                wx.setStorage({
                  key: 'R-status',
                  data: 1
                })
              }
              var i = parseInt(res.data.data[0].MatchA) + parseInt(res.data.data[0].MatchB)
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
    }
    wx.showLoading({
      title: '正在加载中……',
    })
    this.animation.translateY(300).opacity(0).step()
    this.setData({
      animation: this.animation.export(),
    })
    setTimeout(function () {
      this.setData({
        cancel: true,
        scoremethodflag: true,
        toolflag: true,
        showteamA: true,
        showteamB: true
      })
    }.bind(this), 500)
  },
  choosesocremethod:function(e){
    this.setData({
      scoremethod: e.currentTarget.dataset.scoremethod,
      scoremethodflag: true      
    })
    if(this.data.team == 'A'){
      if (e.currentTarget.dataset.scoremethod == 'fault') {
        this.setData({
          showteamB: false,
          team:'A'
        })
      } else {
        this.setData({
          showteamA: false
        })
      }
    }
    if (this.data.team == 'B') {
      if (e.currentTarget.dataset.scoremethod == 'fault') {
        this.setData({
          showteamA: false, 
          team:'B'
        })
      } else {
        this.setData({
          showteamB: false
        })
      }
    }
  },
  confirmscore:function(e){
    var that = this
    wx.showLoading({
      title: '正在加载中……',
    })
    this.animation.translateY(300).opacity(0).step()
    this.setData({
      animation: this.animation.export(),
    })
    setTimeout(function () {
      this.setData({
        cancel: true,
        scoremethodflag: true,
        toolflag: true,
        showteamA: true,
        showteamB: true
      })
    }.bind(this), 500)
    wx.request({
      url: "https://volleywang.cn/index.php/rr/addscore",
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
        Team: that.data.team,
        ScoreMethod: that.data.scoremethod,
        Cardid: e.currentTarget.dataset.cardid
      },
      success:function(res){
        console.log(res.data)
        wx.setStorageSync('insertid', res.data.data)
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
            wx.hideLoading()
            that.setData({
              lastmatchinfo: res.data.data,
            })
            var status = res.data.data[0].Status
            if (status == 3) {
               wx.setStorage({
                key: 'R-status',
                data: 3,
                success:function(){
                  wx.navigateBack()
                }
              })
            }
            if (status == 2) {
              wx.setStorage({
                key: 'R-status',
                data: 2,
                success: function () {
                  wx.navigateBack()
                }
              })
            }
            if (status == 1) {
              wx.setStorage({
                key: 'R-status',
                data: 1
              })
            }
            var i = parseInt(res.data.data[0].MatchA) + parseInt(res.data.data[0].MatchB)
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
  closetool: function () {
    var that = this
    this.animation.translateY(300).opacity(0).step()
    this.setData({
      animation: this.animation.export(),
    })
    setTimeout(function () {
      this.setData({
        cancel: true,
        scoremethodflag: true,
        toolflag: true,
        showteamA: true,
        showteamB: true,
        showtimeout:true
      })
    }.bind(this), 500)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'matchinfo',
      success: function (res) {
        console.log(res.data)
        that.setData({
          matchinfo: res.data
        })
      },
    })
    wx.getStorage({
      key: 'Uid',
      success: function (res) {
        console.log(res.data)
        that.setData({
          Uid: res.data,
        })
      },
    })
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
        that.setData({
          lastmatchinfo: res.data.data,
        })
        var i = parseInt(res.data.data[0].MatchA) + parseInt(res.data.data[0].MatchB)
        var status = res.data.data[0].Status
        if (status == 3) {
          wx.setStorage({
            key: 'R-status',
            data: 3,
            success: function () {
              wx.navigateBack()
            }
          })
        }
        if (status == 2) {
          wx.setStorage({
            key: 'R-status',
            data: 2
          })
        }
        if (status == 1) {
          wx.setStorage({
            key: 'R-status',
            data: 1
          })
        }
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
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
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
        that.setData({
          lastmatchinfo: res.data.data,
        })
        var i = parseInt(res.data.data[0].MatchA) + parseInt(res.data.data[0].MatchB)
        var status = res.data.data[0].Status
        if (status == 3) {
          wx.setStorage({
            key: 'R-status',
            data: 3,
            success: function () {
              wx.navigateBack()
            }
          })
        }
        if (status == 2) {
          wx.setStorage({
            key: 'R-status',
            data: 2
          })
        }
        if (status == 1) {
          wx.setStorage({
            key: 'R-status',
            data: 1
          })
        }
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
        that.setData({
          lastmatchinfo: res.data.data,
        })
        var i = parseInt(res.data.data[0].MatchA) + parseInt(res.data.data[0].MatchB)
        var status = res.data.data[0].Status
        if (status == 3) {
          wx.setStorage({
            key: 'R-status',
            data: 3,
            success: function () {
              wx.navigateBack()
            }
          })
        }
        if (status == 2) {
          wx.setStorage({
            key: 'R-status',
            data: 2
          })
        }
        if (status == 1) {
          wx.setStorage({
            key: 'R-status',
            data: 1
          })
        }
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
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  }
})