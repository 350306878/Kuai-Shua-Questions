var that;

Page({

    data: {
        singleQuestionList: [],
        loading: true
    },

    onLoad: function () {
        that = this;
        // var noMulti;
        var getSingleQuestionList = getApp().globalData.singleChoiceAnswerNow;
        for (var i = 0; i < 20; i++) {
            getSingleQuestionList[i].attributes.number = i + 1;
        }
        that.setData({
            singleQuestionList: getSingleQuestionList,
            loading: false
        });
    },

    onShow: function () {
    },

    continueAnswer: function () {
        wx.navigateBack();
    },

    assignment: function () {
        wx.reLaunch({
            url: '../result/result'
        });
    }
})