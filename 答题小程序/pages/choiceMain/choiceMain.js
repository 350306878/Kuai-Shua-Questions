var that;
var Bmob = require('../../utils/bmob.js');
Page({
  data: { 
    choseQuestionBank:"区块链测试题初级",
    index: 0,
    loading: true,
    currentUserId:''
  },

  onLoad: function () {
    that = this;
  },

  onShow: function () {

  },
  
  start:function(){
    var choseQuestionBank = this.data.choseQuestionBank
    wx.redirectTo({
      url: '../singleChoiceDetail/singleChoiceDetail?choseQuestionBank=' + choseQuestionBank
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