var that;

Page({

  data: {
    singleQuestionList:[],
    multiQuestionList: [],
    // noMulti:null
    loading: true

  }, 
 

  onLoad: function (){
    that = this;
    // var noMulti;
    var getSingleQuestionList = getApp().globalData.singleChoiceAnswerNow; 
    var getMultiQuestionList = getApp().globalData.multiChoiceAnswerNow;  
    for (var i = 0; i < 20; i++) {
      getSingleQuestionList[i].attributes.number = i + 1;
    }
    // if (getMultiQuestionList.length==0){
    //   noMulti=true
    // }
    // else if (getMultiQuestionList.length != 0){
    //   for (var j = 0; j < 20; j++) {
    //     getMultiQuestionList[j].attributes.number = j + 1;
    //   }
    //   noMulti=false;
    // }
    
    // that.setData({
    //   singleQuestionList: getSingleQuestionList,
    //   multiQuestionList: getMultiQuestionList,
    //   noMulti: noMulti
    // });
    for (var i = 0; i < 20; i++) {
      getMultiQuestionList[i].attributes.number = i + 1;
    }

    that.setData({
      singleQuestionList: getSingleQuestionList,
      multiQuestionList: getMultiQuestionList,
      loading: false
    });
    console.log(getApp().globalData.multiChoiceAnswerNow)
    console.log(that.data.multiQuestionList)
  },

 
  onShow: function () {
  },

  continueAnswer:function(){
    wx.navigateBack(); 
  },

  assignment:function(){
    wx.reLaunch({
      url: '../result/result'
    });
  }



 
})