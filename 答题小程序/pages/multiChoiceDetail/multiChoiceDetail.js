var that;
var Bmob = require('../../utils/bmob.js');
Page({

 
  data: {
    choseQuestionBank: '',
    currentUserId: null,
    questionList: [],
    nowQuestion: [],
    nowQuestionNumber: '',
    choseCharacter: [],
    score: 0,
    choseA: false,
    choseB: false,
    choseC: false,
    choseD: false

  },


  onLoad: function () {
    that = this;
    var choseQuestionBank = getApp().globalData.choseQuestionBank;
    var questionList = getApp().globalData.multiChoiceAnswerNow;
    that.setData({
      questionList: questionList,
      nowQuestion: questionList[0],
      nowQuestionNumber: 0
    });
    console.log(that.data.nowQuestion)
    console.log(getApp().globalData.multiChoiceAnswerNow)
  },


  onShow: function () {
  
  },

  choseA: function () {
    var questionList = that.data.questionList;
    var nowQuestionNumber = that.data.nowQuestionNumber;
    var answer = questionList[nowQuestionNumber].attributes.answer[0];
    var choseCharacter = that.data.choseCharacter;
    choseCharacter.push('A')
    that.setData({
      choseA:true,
    });
  },

  notChoseA: function () {
    var questionList = that.data.questionList;
    var nowQuestionNumber = that.data.nowQuestionNumber;
    var answer = questionList[nowQuestionNumber].attributes.answer[0];
    var choseCharacter = that.data.choseCharacter;
    that.findCharacter('A', choseCharacter);
    that.setData({
      choseA: false,
    });
  },

  choseB: function () {
    var questionList = that.data.questionList;
    var nowQuestionNumber = that.data.nowQuestionNumber;
    var answer = questionList[nowQuestionNumber].attributes.answer[0];
    var choseCharacter = that.data.choseCharacter;
    choseCharacter.push('B');
    that.setData({
      choseB: true,
    });
  },

  notChoseB: function () {
    var questionList = that.data.questionList;
    var nowQuestionNumber = that.data.nowQuestionNumber;
    var answer = questionList[nowQuestionNumber].attributes.answer[0];
    var choseCharacter = that.data.choseCharacter;
    that.findCharacter('B', choseCharacter);
    that.setData({
      choseB: false,
    });
  },

  choseC: function () {
    var questionList = that.data.questionList;
    var nowQuestionNumber = that.data.nowQuestionNumber;
    var answer = questionList[nowQuestionNumber].attributes.answer[0];
    var choseCharacter = that.data.choseCharacter;
    choseCharacter.push('C');
    that.setData({
      choseC: true,
    });
  },

  notChoseC: function () {
    var questionList = that.data.questionList;
    var nowQuestionNumber = that.data.nowQuestionNumber;
    var answer = questionList[nowQuestionNumber].attributes.answer[0];
    var choseCharacter = that.data.choseCharacter;
    that.findCharacter('C', choseCharacter);
    that.setData({
      choseC: false,
    });
  },

  choseD: function () {
    var questionList = that.data.questionList;
    var nowQuestionNumber = that.data.nowQuestionNumber;
    var answer = questionList[nowQuestionNumber].attributes.answer[0];
    var choseCharacter = that.data.choseCharacter;
    choseCharacter.push('D');
    that.setData({
      choseD: true,
    });
  },

  notChoseD: function () {
    var questionList = that.data.questionList;
    var nowQuestionNumber = that.data.nowQuestionNumber;
    var answer = questionList[nowQuestionNumber].attributes.answer[0];
    var choseCharacter = that.data.choseCharacter;
    that.findCharacter('D', choseCharacter);
    that.setData({
      choseD: false,
    });
  },



  findCharacter: function (characher, choseList) {
    for (var i = 0; i < choseList.length; i++) {
      if (choseList[i] == characher) {
        choseList.splice(i, 1);
       break;
       }
    }
  },

  // frontQuestion: function () {
  //   var questionList = that.data.questionList;
  //   var frontQuestionNumber = that.data.nowQuestionNumber - 1;
  //   that.setData({
  //     nowQuestion: questionList[frontQuestionNumber],
  //     nowQuestionNumber: frontQuestionNumber,
  //   })
  //   console.log(that.data.questionList)
  // },

  afterQuestion: function () {
    var nowQuestionNumber = that.data.nowQuestionNumber
    var questionList = that.data.questionList;
    questionList[nowQuestionNumber].attributes.userChose = that.data.choseCharacter;
    var afterQuestionNumber = nowQuestionNumber + 1;
    var answerResult = that.contrastAnswer(questionList[nowQuestionNumber].attributes.userChose, questionList[nowQuestionNumber].attributes.answer)
    questionList[nowQuestionNumber].attributes.answerResult = answerResult;
    that.setData({
      nowQuestion: questionList[afterQuestionNumber],
      nowQuestionNumber: afterQuestionNumber,
      questionList: questionList,
      choseA: false,
      choseB: false,
      choseC: false,
      choseD: false,
      choseCharacter:[]
    }) 
    

    console.log(questionList[nowQuestionNumber].attributes.userChose)
    console.log(questionList[nowQuestionNumber].attributes.answer)
    console.log(nowQuestionNumber)
    console.log(that.data.questionList)
  },

  answerCard: function () {
    getApp().globalData.multiChoiceAnswerNow = that.data.questionList
    wx.navigateTo({
      url: '../answerCard/answerCard'
    });
  },


  contrastAnswer: function (array1,array2){
    var answerResult;
    var correctNumber=0;
    var errorChose=new Array();
    if (array1.length==0){
      answerResult = 'blank'
    }
    if (array1.length != 0 && array1.length != array2.length){
      answerResult='error'
    }
    else if (array1.length == array2.length){
      for (var i = 0; i < array1.length;i++){
        for (var j = 0; j < array2.length; j++){
          if (array1[i] == array2[j]){
            correctNumber = correctNumber+1;
            console.log(correctNumber+"分数")
          }
        }
      }
      if (array1.length == array2.length && array2.length==correctNumber){
        answerResult = 'correct'
        getApp().globalData.score = getApp().globalData.score+2;
      }
      else{
        answerResult = 'error'
      }
      console.log(correctNumber)
    }
   
    console.log(getApp().globalData.score+"66666")
    return answerResult;
  },

  submit:function(){

    var nowQuestionNumber = that.data.nowQuestionNumber
    var questionList = that.data.questionList;
    questionList[nowQuestionNumber].attributes.userChose = that.data.choseCharacter;
    var answerResult = that.contrastAnswer(questionList[nowQuestionNumber].attributes.userChose, questionList[nowQuestionNumber].attributes.answer)
    questionList[nowQuestionNumber].attributes.answerResult = answerResult;
    that.setData({
     
      questionList: questionList,
      choseA: false,
      choseB: false,
      choseC: false,
      choseD: false,
      choseCharacter: []
    })
    wx.redirectTo({
      url: '../result/result'
    });
  }




  


})