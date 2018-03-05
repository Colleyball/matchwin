// page/one/index.js
Page({
  data: {
    open: false,
    mark: 0,
    newmark: 0,
    startmark: 0,
    endmark: 0,
    windowWidth: wx.getSystemInfoSync().windowWidth,
    staus: 1,
    translate: '',
    datalist:[],
    actionSheetHidden:true,
    Uid:'',
    matchid:'',
  },
  signup:function(){
    this.setData({
      actionSheetHidden:false
    })
  },
  cancel:function(){
    this.setData({
      actionSheetHidden: true
    })
  },
  signupteam:function(){
    var that = this
    wx.navigateTo({
      url: 'SignupTeam/SignupTeam?id='+that.data.Uid+'&matchid='+that.data.matchid,
    })
    this.setData({
      actionSheetHidden: true
    })
  },
  schedule:function(){
    var that = this
    wx.navigateTo({
      url: 'schedule/schedule?matchid=' + that.data.matchid,
    })
  },
  jointeam:function(){
    var that = this
    wx.navigateTo({
      url: 'jointeam/jointeam?matchid='+that.data.matchid,
    })
  },
  onLoad: function (options) {
     var that = this
     wx.setNavigationBarTitle({
       title: '正在加载中…… 赛事窗',
     })
     wx.request({
       url: "https://volleywang.cn/index.php/api/getmatchbyid",
       header: {
         "content-type": "application/json;charset=utf8"
       },
       method: "GET",
       data: {
         matchid: options.id
       },
       success: function (res) {
         console.log('赛事id:'+options.id);
         console.log(res.data);
         that.setData({ datalist: res.data.data, matchid: options.id})
         wx.setNavigationBarTitle({
           title: that.data.datalist[0].MatchName + ' 联赛圈',
         })
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
  onShareAppMessage: function () {
    var that = this
    return {
      title: '@' + wx.getStorageSync('userInfo').nickName + '发现了' + that.data.datalist[0].MatchName + '，快来看看吧',
      desc: '点击查看比赛详情',
      path: '/pages/Match/MatchDetails/MatchDetails?id=' + that.data.matchid,
    }
  }
})