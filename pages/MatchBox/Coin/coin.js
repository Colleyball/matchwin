// pages/MatchBox/Coin/coin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dotAnData: '',
    dotAnData2: '',
    dotAnData3: '',
    result: '',
    deg:0,
    drinkdeg:'',
    eatdeg:'',
    teamB:'正面还是反面',
    drinkwhat:'什么',
    eatwhat: '什么',
    drinklist: ['','茉莉绿茶', '阿萨姆红茶', '四季春茶', '冻顶乌龙差', '翡翠柠檬', '梅果绿', '蜂蜜绿', '8冰绿', '养乐多绿', '冰淇淋红茶', '波霸红茶', '波霸绿茶', '波霸红', '波霸绿', '珍珠红茶', '珍珠绿茶', '椰果奶茶', '仙草奶茶', '统一补丁奶茶', '红茶玛奇朵', '绿茶玛奇朵', '阿华田', '可可芭蕾', '红茶拿铁', '柠檬汁', '柠檬梅子', '柠檬养乐多', '蜜茶', '8冰茶', '茉莉蜜茶', '炭焙乌龙茶', '玛丽莲冰露', '森林玫果', '冰鲜柠檬水', '蜂蜜柚子茶', '蜜柚红茶', '蓝莓果粒茶', '鲜芦荟晶钻果茶', '蓝莓圣代', '芦荟圣代', '红森林圣代', '巧克力圣代', '草莓圣代', '太妃奥利奥圣代', '铁观音雪顶', '乌龙雪顶', '咖啡雪顶', '茉莉雪顶', '泰国珍西米奶茶', '康师傅矿泉水', '康师傅冰红茶', '水动乐', '脉动', '红牛', '可口可乐', '百事可乐', '雪碧', '甜筒','啤酒'],
    eatlist: ['', '饺子', '汉堡', '脆皮鸡饭', '烤肉拌饭', '牛蛙煲', '鸡翅煲', '明虾煲', '肉蟹煲', '鸡爪煲', '仔排煲', '水煮肉片', '酸菜鱼', '蜜汁叉烧肉', '黑椒牛柳肉', '可乐鸡翅', '梅菜扣肉', '鱼香肉丝', '咖喱牛肉', '鸡肉卷', '米线', '麻辣烫', '冒菜', '麻辣拌', '披萨', '酸辣土豆丝', '青椒肉片', '辣子鸡丁', '香菇青菜', '蒸蛋', '黄闷鸡米饭', '花甲粉丝', '玉米排骨饭', '海带排骨饭', '沙县蒸饺', '拌面', '炒粉干', '蛋炒饭', '关东煮', '汤圆', '酒酿圆子羹', '黄焖排骨饭', '土豆炖牛腩', '牛肉炒饭', '酸辣鸡杂木桶饭', '麻辣牛肚木桶饭', '香煎鸡胸低卡轻食餐', '嫩烤鸡胸低卡轻食餐', '水煮鸡胸餐', '纸包鸡', '纸包牛肉', '纸包跳跳蛙', '面条', '方便面', '馒头', '生煎', '烤鸭', '无骨鸡柳', '螺蛳粉', '臭豆腐', '棒棒鸡', '糖醋里脊', '手抓饼', '炸鸡', '混沌', '温州瘦肉丸', '缙云烧饼', '薯条', '可乐鸡翅', '烧卖', '包子', '咖喱牛丼', '芝士牛丼', '一条秋刀鱼', '炒拉面', '炒刀削', '麻辣香锅', '麻辣干锅', '啤酒鸭', '台湾卤肉饭', '石锅拌饭', '油条', '炒冷面', '水蒸蛋', '肥牛捞饭', '鸡柳滑蛋铁板饭', '鸡锁骨', '蛋包饭'],
  },

  submit2: function () {
    var that = this
    that.setData({
      teamB: '正面还是反面'
    })
    var Deg = 0
    var id = setInterval(function () {
      Deg = Deg + 10
      that.setData({
        deg: Deg
      })
    }.bind(that),15)
    var result = Math.random()
    setTimeout(function () {
      clearInterval(id)
      that.setData({
        deg: 0
      })
      if (result < 0.5) {
        that.setData({
          teamB: '正'
        })
      } else {
        that.setData({
          teamB: '反'
        })
      }
    }, 3240)
  },

  drink: function () {
    var that = this
    that.setData({
      drinkwhat: '什么'
    })
    var Deg = 0
    var id = setInterval(function () {
      Deg = Deg + 10
      that.setData({
        drinkdeg: Deg
      })
    }.bind(that), 15)
    var len = that.data.drinklist.length
    var result = Math.random()*(len - 0);
    result = 0 + Math.round(result);
    setTimeout(function () {
      clearInterval(id)
      that.setData({
        drinkdeg: 0,
        drinkwhat: that.data.drinklist[result]+'吧~',
      })
    }, 3240)
  },

  eat: function () {
    var that = this
    that.setData({
      eatwhat: '什么'
    })
    var Deg = 0
    var id = setInterval(function () {
      Deg = Deg + 10
      that.setData({
        eatdeg: Deg
      })
    }.bind(that), 15)
    var len = that.data.eatlist.length
    var result = Math.random() * (len - 0);
    result = 0 + Math.round(result);
    setTimeout(function () {
      clearInterval(id)
      that.setData({
        eatdeg: 0,
        eatwhat: that.data.eatlist[result] + '吧~',
      })
    }, 3240)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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