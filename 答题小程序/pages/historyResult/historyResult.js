var that;
var Bmob = require('../../utils/bmob.js');
Page({

 
  data: {
    score:0,
    choseQuestionBank:'',
    singleQuestionList: [],
    multiQuestionList: [],
    loading:true,
    defeatNumber:0,
    averageScore:0,
    correctRate:0
  },


  onLoad: function (options) {
    that=this;

    var choseQuestionBank = getApp().globalData.choseQuestionBank;
    that.setData({
      choseQuestionBank: choseQuestionBank
    });
    var currentUser = Bmob.User.current();
    var currentUserId = currentUser.id;
    var getSingleQuestionList = getApp().globalData.singleChoiceAnswerNow;
    var getMultiQuestionList = getApp().globalData.multiChoiceAnswerNow;
    for (var i = 0; i < 20; i++) {
      getSingleQuestionList[i].number = i + 1;
    }
    for (var j = 0; j < 20; j++) {
      getMultiQuestionList[j].number = j + 1;
    }
   
    var score = getApp().globalData.score;
   
    that.getCorrectRate();
    that.getDefeatNumber();
    that.getAverageScore();
    that.setData({
      score: score,
      singleQuestionList: getSingleQuestionList,
      multiQuestionList: getMultiQuestionList,
      loading:false
    });

    that.getCorrectRate();
    console.log(getSingleQuestionList);
  },

  getDefeatNumber:function(){
    var choseQuestionBank = that.data.choseQuestionBank;
    var History = Bmob.Object.extend("history");
    var queryHistory = new Bmob.Query(History);
    var defeatNumber=0;
    if (choseQuestionBank == '大学计算机期末考试题库') {
      queryHistory.equalTo("choseQuestionBank", "大学计算机期末考试题库");
      queryHistory.find({
        success: function (results) {
          for (var i = 0; i < results.length; i++) {
            var score = results[i].attributes.score;
            if(that.data.score>score){
              defeatNumber++;
            }
          }
          that.setData({
            defeatNumber: defeatNumber,
          });
        },
        error: function (error) {
          console.log("查询失败: " + error.code + " " + error.message);
        }
      });
    }
    else if (choseQuestionBank == '计算机二级office题库') {
      queryHistory.equalTo("choseQuestionBank", "计算机二级office题库");
      queryHistory.find({
        success: function (results) {
          for (var i = 0; i < results.length; i++) {
            var score = results[i].attributes.score;
            if (that.data.score > score) {
              defeatNumber++;
            }
          }
          that.setData({
            defeatNumber: defeatNumber,
          });
        },
        error: function (error) {
          console.log("查询失败: " + error.code + " " + error.message);
        }
      });
    }
    else if (choseQuestionBank == '毛概期末考试题库') {
      queryHistory.equalTo("choseQuestionBank", "毛概期末考试题库");
      queryHistory.find({
        success: function (results) {
          for (var i = 0; i < results.length; i++) {
            var score = results[i].attributes.score;
            if (that.data.score > score) {
              defeatNumber++;
            }
          }
          that.setData({
            defeatNumber: defeatNumber,
          });
        },
        error: function (error) {
          console.log("查询失败: " + error.code + " " + error.message);
        }
      });
    }
    else if (choseQuestionBank == '中国近代史期末考试题库') {
      queryHistory.equalTo("choseQuestionBank", "中国近代史期末考试题库");
      queryHistory.find({
        success: function (results) {
          for (var i = 0; i < results.length; i++) {
            var score = results[i].attributes.score;
            if (that.data.score > score) {
              defeatNumber++;
            }
          }
          that.setData({
            defeatNumber: defeatNumber,
          });
        },
        error: function (error) {
          console.log("查询失败: " + error.code + " " + error.message);
        }
      });
    }
    else if (choseQuestionBank == '马克思原理期末考试题库') {
      queryHistory.equalTo("choseQuestionBank", "马克思原理期末考试题库");
      queryHistory.find({
        success: function (results) {
          for (var i = 0; i < results.length; i++) {
            var score = results[i].attributes.score;
            if (that.data.score > score) {
              defeatNumber++;
            }
          }
          that.setData({
            defeatNumber: defeatNumber,
          });
        },
        error: function (error) {
          console.log("查询失败: " + error.code + " " + error.message);
        }
      });
    }
    else if (choseQuestionBank == '形式与政策') {
      queryHistory.equalTo("choseQuestionBank", "形式与政策");
      queryHistory.find({
        success: function (results) {
          for (var i = 0; i < results.length; i++) {
            var score = results[i].attributes.score;
            if (that.data.score > score) {
              defeatNumber++;
            }
          }
          that.setData({
            defeatNumber: defeatNumber,
          });
        },
        error: function (error) {
          console.log("查询失败: " + error.code + " " + error.message);
        }
      });
    }
  },

  
  getAverageScore:function(){
    var choseQuestionBank = that.data.choseQuestionBank;
    var QBAttributes = Bmob.Object.extend("QBAttributes");
    var queryQBAttributes = new Bmob.Query(QBAttributes);
    if (choseQuestionBank == '大学计算机期末考试题库'){
      queryQBAttributes.get("6o5I3334", {
        success: function (result) {
          var averageScore = result.get("averageScore");
          var newAverageScore = averageScore.toFixed(1);
          that.setData({
            averageScore: newAverageScore,
          });
        },
        error: function (object, error) {
          // 查询失败
        }
      });
    }
    else if (choseQuestionBank == '计算机二级office题库') {
      queryQBAttributes.get("cVH1OOOX", {
        success: function (result) {
          var averageScore = result.get("averageScore");
          var newAverageScore = averageScore.toFixed(1);
          that.setData({
            averageScore: newAverageScore,
          });
        },
        error: function (object, error) {
          // 查询失败
        }
      });
    }
    else if (choseQuestionBank == '毛概期末考试题库') {
      queryQBAttributes.get("pQrWhhhm", {
        success: function (result) {
          var averageScore = result.get("averageScore");
          var newAverageScore = averageScore.toFixed(1);
          that.setData({
            averageScore: newAverageScore,
          });
        },
        error: function (object, error) {
          // 查询失败
        }
      });
    }
    else if (choseQuestionBank == '中国近代史期末考试题库') {
      queryQBAttributes.get("h07m333C", {
        success: function (result) {
          var averageScore = result.get("averageScore");
          var newAverageScore = averageScore.toFixed(1);
          that.setData({
            averageScore: newAverageScore,
          });
        },
        error: function (object, error) {
          // 查询失败
        }
      });
    }
    else if (choseQuestionBank == '马克思原理期末考试题库') {
      queryQBAttributes.get("ZwT6AAAa", {
        success: function (result) {
          var averageScore = result.get("averageScore");
          var newAverageScore = averageScore.toFixed(1);
          that.setData({
            averageScore: newAverageScore,
          });
        },
        error: function (object, error) {
          // 查询失败
        }
      });
    }
    else if (choseQuestionBank == '形式与政策') {
      queryQBAttributes.get("6o5I3334", {
        success: function (result) {
          var averageScore = result.get("averageScore");
          var newAverageScore = averageScore.toFixed(1);
          that.setData({
            averageScore: newAverageScore,
          });
        },
        error: function (object, error) {
          // 查询失败
        }
      });
    }
  },

  getCorrectRate:function(){
    var correctRate=that.data.score/60*100;
    var newCorrectRate = correctRate.toFixed(1);
    console.log(that.data.score)
    that.setData({
      correctRate: newCorrectRate,
    });
  },
 

 
  showDetail: function (e) {
    var index = e.currentTarget.dataset.index;
    var choseType = e.currentTarget.dataset.chosetype;
    if (choseType =='single'){
      wx.navigateTo({
        url: '../analysis/analysis?choseType=single&index=' + index
      });
    }
    else if (choseType == 'multi')
    wx.navigateTo({
      url: '../analysis/analysis?choseType=multi&index=' + index
    });
  },


  allAnalysis:function(){
    var index = 0;
    wx.navigateTo({
      url: '../analysis/analysis?choseType=single&index=' + index
    });
  },

  returnMainPage:function(){
    wx.switchTab({
      url: '../choiceMain/choiceMain'
    })
  }


 
})