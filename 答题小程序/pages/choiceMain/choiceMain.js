var that;
var Bmob = require('../../utils/bmob.js');
Page({
  data: { 
    choseQuestionBank:"区块链测试题初级",

    array: ['区块链测试题初级', '区块链测试题中级', '区块链测试题高级'],


    objectArray: [
      {
        id: 0,
        name: '区块链测试题初级'
      },
      {
        id: 1,
        name: '区块链测试题中级'
      },
      {
        id: 2,
        name: '区块链测试题高级'
      }
    ],
    index: 0,
    loading: true,
    currentUserId:''
  },

  onLoad: function () {
    that = this;
  },

  onShow: function () {

  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      choseQuestionBank: that.data.array[e.detail.value]
    })
  },

  chose:function(){
    var currentUser = Bmob.User.current();
    var currentUserId = currentUser.id;
    var User = Bmob.Object.extend("_User");
    var queryUser = new Bmob.Query(User);
    queryUser.get(currentUserId, {
      success: function (result) {
          var choseQuestionBank = that.data.choseQuestionBank;
          if (choseQuestionBank != "点击选择") {
            getApp().globalData.choseQuestionBank = choseQuestionBank;
            getApp().globalData.score = 0;

            wx.navigateTo({
              url: '../singleChoiceExplain/singleChoiceExplain'
            });
          }
          else if (choseQuestionBank == "点击选择") {
            wx.showToast({
              title: '请选择题库',
              image: '../../images/warn.png',
              duration: 2000
            })
          }       
       
        that.setData({
          loading: false
        })
      },
      error: function (object, error) {
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