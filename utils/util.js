function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function isEmptyObject(e) {
  var t;
  for (t in e)
    return !1;
  return !0
}

function getUid(that) {
  if (that.data.Uid) {
    return;
  }
  var time = setTimeout(function () {
    if (wx.getStorageSync('Uid')) {
      if (wx.getStorageSync('userInfo')) {
        that.setData({
          userlogin: true
        })
      }
      wx.getStorage({
        key: 'Uid',
        success: function (res) {
          that.setData({
            Uid: res.data,
          })
        }
      })
    }
    getUid(that);
  }
    , 2000)
}

function gettime(){
  var myDate = new Date();
  return myDate.toLocaleString();
}

function setpublicinfo(uid,userInfo){
  wx.request({
    url: 'https://volleywang.cn/index.php/api/setpublicinfo',
    header: {
      "content-type": "application/json;charset=utf8"
    },
    method: "GET",
    data: {
      uid: uid,
      nickname: userInfo.nickName,
      province: userInfo.province,
      city: userInfo.city,
      gender: userInfo.gender,
      pic: userInfo.avatarUrl
    },
    success: function (res) {
      console.log(res.data);
    }
  })
}

module.exports = {
  getUid: getUid,
  gettime: gettime,
  formatTime: formatTime,
  setpublicinfo: setpublicinfo
}

