var Bmob = require('../../utils/bmob.js');
var app = getApp();
var that;
Page({

  data: {
    userInfo: {},
    currentUserId:null
  },

 
  onLoad: function () {
    that = this;
    var currentUser = Bmob.User.current();
    var currentUserId = currentUser.id;
    app.getUserInfo(function (userInfo) {
      console.log(userInfo)
      //更新数据
      that.setData({
        userInfo: userInfo,
        currentUserId: currentUserId
      })
    })
  },

  onShow: function () {
  
  },

  testHistory:function(){
    var currentUserId = that.data.currentUserId;
    var User = Bmob.Object.extend("_User");
    var queryUser = new Bmob.Query(User);
    queryUser.get(currentUserId, {
      success: function (result) {
        var register = result.get("register");
        if (register==false){
          wx.navigateTo({
            url: '../register/register'
          })
        }
        else{
          wx.navigateTo({
            url: '../testHistory/testHistory'
          })
        }
      },
      error: function (object, error) {
        // 查询失败
      }
    });
  },

  personalInformation: function () {
    var currentUserId = that.data.currentUserId;
    var User = Bmob.Object.extend("_User");
    var queryUser = new Bmob.Query(User);
    queryUser.get(currentUserId, {
      success: function (result) {
        var register = result.get("register");
        if (register == false) {
          wx.navigateTo({
            url: '../register/register'
          })
        }
        else {
          wx.navigateTo({
            url: '../personalInformation/personalInformation'
          })
        }
      },
      error: function (object, error) {
        // 查询失败
      }
    });
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '大学考试题库',
      path: '/pages/choiceMain/choiceMain',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
 
})