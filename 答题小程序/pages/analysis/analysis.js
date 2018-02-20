var that;
var Bmob = require('../../utils/bmob.js');
Page({

  data: {
    singleQuestionList:[],
    multiQuestionList:[],
    choseType:'',
    nowQuestion:[],
    correctAnswer:'',
    userAnswer:'',
    loading:true
    
  },  

  onLoad: function (options) {
    that = this;
    var index = options.index;
    var choseType = options.choseType;
    console.log(index);
    console.log(choseType);
    var choseQuestionBank = getApp().globalData.choseQuestionBank;
    var currentUser = Bmob.User.current();
    var currentUserId = currentUser.id;
    var History = Bmob.Object.extend("history");
    var queryHistory = new Bmob.Query(History);
    queryHistory.equalTo("choseQuestionBank", choseQuestionBank);
    queryHistory.equalTo("user", currentUserId);
    queryHistory.find({
      success: function (results) {
        var singleQuestionList = results[0].attributes.singleQuestionList;
        var multiQuestionList = results[0].attributes.multiQuestionList;
        that.setData({
          singleQuestionList: singleQuestionList,
          multiQuestionList: multiQuestionList,
          choseType: choseType
        });
        if (choseType == 'single') {
          var nowQuestion = that.data.singleQuestionList[index];
          var correctAnswer = results[0].attributes.singleQuestionList[index].answer[0];
          var userAnswer = results[0].attributes.singleQuestionList[index].userChose[0];
          that.setData({
            nowQuestion: nowQuestion,
            correctAnswer: correctAnswer,
            userAnswer: userAnswer,
            loading: false
          });
        }
        else if (choseType == 'multi') {
          var nowQuestion = that.data.multiQuestionList[index]
          var correctAnswerList = results[0].attributes.multiQuestionList[index].answer;
          var correctAnswer = correctAnswerList.toString()
          var userAnswerList = results[0].attributes.multiQuestionList[index].userChose;
          var userAnswer = userAnswerList.toString()
          that.setData({
            nowQuestion: nowQuestion,
            correctAnswer: correctAnswer,
            userAnswer: userAnswer,
            loading:false
          });
        }
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
  },


  frontQuestion:function(){
    if (that.data.choseType == 'single') {
      that.frontsingleQuestion();
    }
    else if (that.data.choseType == 'multi' && that.data.nowQuestion.number != 1) {
      that.frontMultiQuestion();
    }
    else if (that.data.choseType == 'multi' && that.data.nowQuestion.number == 1){
      var questionList = that.data.singleQuestionList;
      that.setData({
        nowQuestion: questionList[19],
        choseType: 'single'
      })
      that.frontsingleQuestion();
    }
  },

  frontsingleQuestion:function(){
    var questionList = that.data.singleQuestionList;
    var frontQuestionNumber = that.data.nowQuestion.number - 2;
    var correctAnswer = questionList[frontQuestionNumber].answer[0];
    var userAnswer = questionList[frontQuestionNumber].userChose[0];
    that.setData({
      nowQuestion: questionList[frontQuestionNumber],
      correctAnswer: correctAnswer,
      userAnswer: userAnswer,
    })
    console.log(frontQuestionNumber)
  },

  frontMultiQuestion:function(){
    var questionList = that.data.multiQuestionList;
    var frontQuestionNumber = that.data.nowQuestion.number - 2;
    var correctAnswerList = questionList[frontQuestionNumber].answer;
    var correctAnswer = correctAnswerList.toString()
    var userAnswerList = questionList[frontQuestionNumber].userChose;
    var userAnswer = userAnswerList.toString()
    that.setData({
      nowQuestion: questionList[frontQuestionNumber],
      correctAnswer: correctAnswer,
      userAnswer: userAnswer,
    })
    console.log(frontQuestionNumber)
  },


  afterQuestion: function () {
    if (that.data.choseType == 'single' && that.data.nowQuestion.number != 20) {
      that.aftersingleQuestion();
    }
    else if (that.data.choseType == 'single' && that.data.nowQuestion.number == 20){
      var questionList = that.data.multiQuestionList;
      that.setData({
        nowQuestion: questionList[0],
        choseType: 'multi'
      })
      that.afterMultiQuestion();
    }
    else if (that.data.choseType == 'multi') {
      that.afterMultiQuestion();
    }
  },

  aftersingleQuestion:function(){
    var questionList = that.data.singleQuestionList;
    var afterQuestionNumber = that.data.nowQuestion.number;
    var correctAnswer = questionList[afterQuestionNumber].answer[0];
    var userAnswer = questionList[afterQuestionNumber].userChose[0];
    that.setData({
      nowQuestion: questionList[afterQuestionNumber],
      correctAnswer: correctAnswer,
      userAnswer: userAnswer,
    })
    console.log(afterQuestionNumber)
  },

  afterMultiQuestion:function(){
    var questionList = that.data.multiQuestionList;
    var afterQuestionNumber = that.data.nowQuestion.number;
    var correctAnswerList = questionList[afterQuestionNumber].answer;
    var correctAnswer = correctAnswerList.toString()
    var userAnswerList = questionList[afterQuestionNumber].userChose;
    var userAnswer = userAnswerList.toString()
    that.setData({
      nowQuestion: questionList[afterQuestionNumber],
      correctAnswer: correctAnswer,
      userAnswer: userAnswer,
    })
    console.log(afterQuestionNumber)
  },



  answerCard: function () {
    wx.navigateBack(); 
  }



  



 
})