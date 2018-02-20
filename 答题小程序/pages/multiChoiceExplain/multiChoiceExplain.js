var that;
var Bmob = require('../../utils/bmob.js');
Page({


  data: {
   
  },


  onLoad: function () {
    that = this;
   
  },



  onShow: function () {
  
  },

  action: function () {
   
    wx.redirectTo({
      url: '../multiChoiceDetail/multiChoiceDetail'
    });
  },

  answerCard: function () {
    wx.navigateTo({
      url: '../answerCard/answerCard'
    });
  },

})