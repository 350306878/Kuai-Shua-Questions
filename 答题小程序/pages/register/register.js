var Bmob = require('../../utils/bmob.js');
var that;
Page({

  data: {
    currentUserId: null
  },


  onLoad: function (options) {
    that = this;
    var currentUser = Bmob.User.current();
    var currentUserId = currentUser.id;
    that.setData({
      currentUserId: currentUserId
    })

    var User = Bmob.Object.extend("_User");
    var queryUser = new Bmob.Query(User);
    // 查询所有数据
    queryUser.get(currentUserId, {
      success: function (result) {
        
        var register = result.get("register");
        var content = result.get("content");
      },
      error: function (object, error) {
        // 查询失败
      }
    });
  },


  onShow: function () {
  
  },


  registerSuccess: function (e) {
    var currentUserId = that.data.currentUserId;
    var realName = e.detail.value.realName;
    var university = e.detail.value.university;
    var telephone = e.detail.value.telephone;
    console.log(currentUserId)
    if (!university) {
      wx.showToast({
        title: '请填写您的学校',
        image: '../../images/warn.png',
        duration: 2000
      })
    }
    else if (!realName) {
      wx.showToast({
        title: '请填写您的姓名',
        image: '../../images/warn.png',
        duration: 2000
      })
    }
    else if (!telephone) {
      wx.showToast({
        title: '请填写您的电话',
        image: '../../images/warn.png',
        duration: 2000
      })
    }
    else{
      var User = Bmob.Object.extend("_User");
      var queryUser = new Bmob.Query(User);
      queryUser.get(currentUserId, {
        success: function (result) {
          result.set('register', true);
          result.set('realName', realName);
          result.set('university', university);
          result.set('telephone', telephone);
          result.save();
          wx.navigateBack(); 
        },
        error: function (object, error) {
        }
      });
    }
  },

  






})