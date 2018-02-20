var that;
var Bmob = require('../../utils/bmob.js');
Page({

  
  data: {
    historyQuestionBank:[],
    // singleQuestionList:[],
    // multiQuestionList:[],
    // score:null

  },

  
  onLoad: function (options) {
    that=this;
    var historyQuestionBank=new Array();
    var currentUser = Bmob.User.current();
    var currentUserId = currentUser.id;
    var History = Bmob.Object.extend("history");
    var queryHistory = new Bmob.Query(History);
    queryHistory.equalTo("user", currentUserId);
    queryHistory.find({
      success: function (results) {
        console.log("共查询到 " + results.length + " 条记录");
        for (var i = 0; i < results.length; i++) {
          historyQuestionBank[i] = results[i];
        }
        console.log(historyQuestionBank);
        that.setData({
          historyQuestionBank: historyQuestionBank,
        });
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
  },

  showDetail:function(e){
    // wx.showModal({
    //   title: '暂未开放',
    //   showCancel: false,
    //   content: '测试期间,此功能暂未开放',
    //   success: function (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     }
    //   }
    // })
    var index = e.currentTarget.dataset.index;
    var objectId = that.data.historyQuestionBank[index].id;
    var choseQuestionBank = that.data.historyQuestionBank[index].choseQuestionBank;
    var History = Bmob.Object.extend("history");
    var queryHistory = new Bmob.Query(History);
    queryHistory.get(objectId, {
      success: function (result) {
        console.log(result)
        // that.setData({
        //   singleQuestionList: result.attributes.singleQuestionList,
        //   multiQuestionList: result.attributes.multiQuestionList,
        //   score: result.attributes.score,
        // });
        getApp().globalData.singleChoiceAnswerNow = result.attributes.singleQuestionList;
        getApp().globalData.multiChoiceAnswerNow = result.attributes.multiQuestionList;
        getApp().globalData.score = result.attributes.score;
        getApp().globalData.choseQuestionBank = result.attributes.choseQuestionBank;
        wx.navigateTo({
          url: '../historyResult/historyResult'
        });
      },
      error: function (object, error) {
      }
    });
    console.log(getApp().globalData.singleChoiceAnswerNow)
   
  }
  

 
})