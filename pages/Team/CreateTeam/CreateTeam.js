// CreateTeam.js
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    area: ['地区', '北京', '天津', '上海', '重庆', '河北', '山西', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '海南', '四川', '贵州', '云南', '陕西', '甘肃', '青海', '台湾', '内蒙古', '广西壮族', '西藏', '宁夏', '新疆', '香港','澳门'],
    school: ['学校'],
    area_index: 0,
    areaname:"",
    school_index: 0,
    schoolname: "",
    Uid:"",
    matchtype: "", 
    tempFilePaths:"", 
    datalist:[],
    },
  
  uploadPhoto() {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log('chooseimg')
        console.log(res.tempFilePaths)
        that.setData({
          tempFilePaths: res.tempFilePaths
        })
      }
    })
  },
  bindareaChange: function (e) {
    var that = this
    this.setData({
      area_index: e.detail.value
    })
    var area = this.data.area[e.detail.value];
    wx.request({
      url: 'https://volleywang.cn/liansaiquan/model/GetSchool.php',
      header: {
        "content-type": "application/json;charset=utf8"
      },
      method: "GET",
      data: {
        area: area
      },
      success: function (res) {
        that.setData({
          areaname: area
        })
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
      school_index: e.detail.value,
      schoolname: that.data.school[e.detail.value]
    })
  },
  TeamSubmit:function(e){
   var that = this
   var formdata = {
     uid: encodeURI(wx.getStorageSync('Uid')),
    matchtype:encodeURI(that.data.matchtype),
    name:encodeURI(e.detail.value.name),
    leader:encodeURI(e.detail.value.leader),
    school:encodeURI(that.data.schoolname),
    area:encodeURI(that.data.areaname),
   }
   var filepath = this.data.tempFilePaths
   upload(that,filepath,formdata);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!options.Uid) {
      util.getUid(this)
      this.setData({
        Uid:wx.getStorageSync('Uid')
      })
    }
    this.setData({
      Uid:options.uid,
      matchtype: options.matchtype
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
    if (!wx.getStorageSync('Uid')) {
      wx.showModal({
        title: '提示',
        content: '未获取到你的用户uid，请回到主页点击底栏菜单【我】，进入个人中心完成授权',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.navigateBack()
          }
        }
      })
    }
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

function upload(page,path,formdata) {
  wx.showToast({
    icon: "loading",
    title: "正在上传"
  }),
    wx.uploadFile({
    url: 'https://volleywang.cn/index.php/api/createteam',
      filePath: path[0],
      name: 'file',
      header: { "Content-Type": "multipart/form-data" },
      formData: formdata,
      success: function (res) {
        var json = res.data.trim();
        var arr = JSON.parse(json);
        console.log(arr)
        page.setData({
          datalist:arr.data
          })
        if (res.statusCode != 200) {
          wx.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false
          })
          return;
        }
      },
      fail: function (e) {
        console.log(4)
        console.log(e);
        wx.showModal({
          title: '提示',
          content: '上传失败',
          showCancel: false
        })
      },
      complete: function () {
        console.log('上传成功')
        wx.hideToast();
        wx.navigateTo({
          url: '../TeamDetails/TeamDetails?id='+page.data.datalist+'&uid='+page.data.Uid+'&share=false',
        })  
      }
    })
}