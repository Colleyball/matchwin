// pages/Team/jointeam/jointeam.js
var util = require('../../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:'',
    UserInfo:{},
    matchtype:'',
    teamid:'',
    basketballflag: true,
    footballflag: true,
    volleyballflag: true,
    badmintonflag: true,
    bgflag:true,
    personalinfo:true, 
    toastflag:true,
    //area: ['地区', '北京', '天津', '上海', '重庆', '河北', '山西', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '海南', '四川', '贵州', '云南', '陕西', '甘肃', '青海', '台湾', '内蒙古', '广西壮族', '西藏', '宁夏', '新疆', '香港', '澳门'],
    area: ['地区 Province', '浙江'],
    school: ['学校 School'],
    area_index: 0,
    school_index: 0,
    schoolname: "",
  },
  checkSettingStatu: function (cb) {
    var that = this;
    // 判断是否是第一次授权，非第一次授权且授权失败则进行提醒
    wx.getSetting({
      success: function success(res) {
        console.log(res.authSetting);
        var authSetting = res.authSetting;
        if (isEmptyObject(authSetting)) {
          console.log('首次授权');
        } else {
          console.log('不是第一次授权', authSetting);
          // 没有授权的提醒
          if (authSetting['scope.userInfo'] === false) {
            wx.showModal({
              title: '用户未授权',
              content: '如需正常使用个人中心功能，请按确定并在授权管理中选中“用户信息”，然后点按确定。最后再重新进入小程序即可正常使用。',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.openSetting({
                    success: function success(res) {
                      console.log('openSetting success', res.authSetting);
                    }
                  });
                }
              }
            })
          }
        }
      }
    });
  },
  bindareaChange: function (e) {
    this.setData({
      area_index: e.detail.value
    })
    var area = this.data.area[e.detail.value];
    var that = this
    wx.request({
      url: 'https://volleywang.cn/liansaiquan/model/GetSchool.php',
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        area: this.data.area[e.detail.value]
      },
      success: function (res) {
        var num = res.data.data.length
        var i = 0;
        var arr = [];
        for (i = 0; i < num; i++) {
          arr[i] = res.data.data[i].Name
        }
        that.setData({
          school: arr
        })
      }
    })
  },
  bindschoolChange: function (e) {
    var that = this
    this.setData({
      school_index: e.detail.value
    })
    this.setData({
      schoolname: that.data.school[e.detail.value]
    })
  },
  FirstSubmit:function(e){
    var that = this
    wx.request({
      url: 'https://volleywang.cn/index.php/api/setpersonalinfo',
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        uid: wx.getStorageSync('Uid'),
        height: e.detail.value.height,
        weight: e.detail.value.weight,
        school: that.data.schoolname
      },
      success: function (res) {
        console.log(res.data)
        if (that.data.matchtype == '篮球') {
          that.setData({ basketballflag: false })
        }
        if (that.data.matchtype == '足球') {
          that.setData({ footballflag: false })
        }
        if (that.data.matchtype == '排球') {
          that.setData({ volleyballflag: false })
        }
        if (that.data.matchtype == '羽毛球') {
          that.setData({ badmintonflag: false })
        }
        that.setData({ personalinfo: true })
      }
    })
  },
  SecondSubmit: function (e) {
    var that = this;
    wx.request({
      url: 'https://volleywang.cn/index.php/api/createcard',
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        uid: wx.getStorageSync('Uid'),
        name: e.detail.value.name,
        SportsItems: that.data.matchtype,
        position1: e.detail.value.position[0],
        position2: e.detail.value.position[1],
        position3: e.detail.value.position[2],
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          toastflag: false,
          basketballflag: true,
          volleyballflag: true,
          footballflag: true,
          badmintonflag: true,
          bgflag: true
        })
        wx.request({
          url: 'https://volleywang.cn/index.php/api/jointeam',
          header: {
            "content-type": "application/json;charset=utf8"
          },
          method: "GET",
          data: {
            Uid: wx.getStorageSync('Uid'),
            Teamid: that.data.teamid,
            Cardid: res.data.data
          },
          success:function(res){
            console.log(res.data)          
          }
        })
      }
    })
  },
  jointeamwithcard:function(e){
    wx.request({
      url: 'https://volleywang.cn/index.php/api/jointeam',
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        Uid: wx.getStorageSync('Uid'),
        Teamid: that.data.teamid,
        Cardid: e.currentTarget.dataset.cardid
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  toastHidden: function () {
    var that = this
    this.setData({
      toastflag: true
    })
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      teamid: options.teamid,
      uid: options.uid,
      matchtype: options.matchtype
    })
    if (!wx.getStorageSync('userInfo')){
      app.getUserInfo(
        function (userInfo) {
          //更新数据
          that.setData({
            userInfo: userInfo,
          })
          util.setpublicinfo(wx.getStorageSync('Uid'), userInfo)//插入用户公共信息
        }
      )
      this.checkSettingStatu();
    }
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          UserInfo: res.data,
        })
      }
    })
    wx.request({
      url: 'https://volleywang.cn/index.php/api/userstatus',
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        uid: options.uid
      },
      success: function (res) {
        console.log(res.data)
        //if (res.data.data != 1) {
        if (1) {
          that.setData({
            bgflag: false,
            personalinfo: false
          })
        } else {
          wx.request({
            url: "https://volleywang.cn/index.php/api/usercard",
            header: {
              "content-type": "application/json;charset=utf8"
            },
            method: "GET",
            data: {
              uid: options.uid,
              matchtype: options.matchtype
            },
            success: function (res) {
              if (res.data.data == 0) {
                that.setData({
                  bgflag: false,
                  personalinfo: false
                })
              } else {
                that.setData({
                  datalist: res.data.data
                })
              }
            }
          })
        }
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})

function isEmptyObject(e) {
  var t;
  for (t in e)
    return !1;
  return !0
}