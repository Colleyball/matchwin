// UserInfo.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist: [],
    UserInfo:{},
    show: false,
    coverflag: true,
    basketballflag:true,
    volleyballflag: true,
    footballflag: true,
    badmintonflag: true,
    chooseflag:true,
    chooseBtn:false,
    toastflag: true,
    autofocus:false,
    setschool:true,
    createcard:true,
    Uid:"",
    area: ['地区', '北京', '天津', '上海', '重庆', '河北', '山西', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '海南', '四川', '贵州', '云南', '陕西', '甘肃', '青海', '台湾', '内蒙古', '广西壮族', '西藏', '宁夏', '新疆', '香港', '澳门'],
    school:['学校'],
    area_index:0,
    school_index:0,
    schoolname:"",
    type:'',
  },
  bindareaChange:function(e){
    this.setData({
      area_index:e.detail.value
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
        for(i = 0;i<num;i++){
          arr[i] = res.data.data[i].Name
        }
        that.setData({
          school: arr
        })
    }
    })
  },
  bindschoolChange:function(e){
    var that = this
    this.setData({
      school_index: e.detail.value
    })
    this.setData({
      schoolname:that.data.school[e.detail.value]
    })
  },
  personalinfo:function(e){
    var that = this
    wx.request({
      url: 'https://volleywang.cn/index.php/api/setpersonalinfo',
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        uid: that.data.Uid,
        height: e.detail.value.height,
        weight: e.detail.value.weight,
        school: that.data.schoolname
      },
      success: function (res) {
        that.setData({
          toastflag: false
        })
        console.log(res.data)
        setschool: false
      }
    })
  },
  toastHidden: function () { 
    var that = this
    this.setData({
      toastflag: true
    })
    wx.request({
      url: "https://volleywang.cn/index.php/api/usercard",
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        uid: that.data.Uid
      },
      success: function (res) {
        console.log(res.data)
        that.setData(
          {
            datalist: res.data.data
          }
        )
      }
    })
  },
  openchoose: function () {
    this.setData({ 
      coverflag: false,
      chooseflag: false,
      chooseBtn: true,
    })
  },
  closechoose: function () {
    this.setData({ 
      coverflag: true,
      chooseflag: true,
      chooseBtn: false,
      basketballflag: true,
      volleyballflag: true,
      footballflag: true,
      badmintonflag: true,
      setschool:true,
    })
  },
  showbasketball: function () {
    this.setData({ 
      basketballflag: false,
      chooseflag: true,
      autofocus: true,
      type: '篮球'
    })
  },
  showvolleyball: function () {
    this.setData({ 
      volleyballflag: false,
      chooseflag: true,
      autofocus: true,
      type: '排球'
    })
  },
  showfootball: function () {
    this.setData({ 
      footballflag: false,
      chooseflag: true,
      autofocus: true,
      type: '足球'
    })
  },
  showbadminton:function () {
    this.setData({ 
      badmintonflag: false, 
      chooseflag: true,
      autofocus: true,
      type: '羽毛球'
    })
  },
  closecard:function (){
    this.setData({ 
      basketballflag: true,
      volleyballflag: true,
      footballflag: true,
      badmintonflag: true,
      chooseflag: false
    })
  },
  formSubmit:function (e){
    var that = this;
    wx.request({
      url: 'https://volleywang.cn/index.php/api/createcard',
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        uid: that.data.Uid,
        name:e.detail.value.name,
        SportsItems: that.data.type, 
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
          chooseflag: true,
          coverflag: true,
          chooseBtn: false,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
          that.setData({
          UserInfo: res.data,
        })
      }
    }),
      wx.getStorage({
        key: 'Uid',
        success: function (res) {
          that.setData({
            Uid: res.data,
          })
        }
      }),
      wx.request({
      url: "https://volleywang.cn/index.php/api/usercard",
        header: {
          "content-type": "application/json;charset=utf8"
        },
        method: "GET",
        data: {
          uid: options.id
          },
        success: function (res) {
          if (res.data.data == 0) {
            that.setData({
              createcard: false
            })
          } else {
            that.setData({
              datalist: res.data.data
            })
          }
        }
      }),
      wx.request({
      url: 'https://volleywang.cn/index.php/api/userstatus',
        header: {
          "content-type": "application/json;charset=utf8"
        },
        method: "GET",
        data: {
          uid: options.id
        },
        success: function (res) {
          console.log(res.data)
          if(res.data.data!=1){
          that.setData(
            {
              setschool:false
            }
         )
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
  
  }
})