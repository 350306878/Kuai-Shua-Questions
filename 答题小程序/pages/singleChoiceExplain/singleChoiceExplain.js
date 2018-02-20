var that;

Page({


  data: {
    choseQuestionBank:''
  },

  onLoad: function () {
    that=this;
    var choseQuestionBank = getApp().globalData.choseQuestionBank; 
    that.setData({
      choseQuestionBank: choseQuestionBank
    });
    console.log(that.data.choseQuestionBank)
  },


  onShow: function () {
  
  },

  action: function () {
    var choseQuestionBank = that.data.choseQuestionBank;
    wx.redirectTo({
      url: '../singleChoiceDetail/singleChoiceDetail?choseQuestionBank=' + choseQuestionBank
    });
  }





})