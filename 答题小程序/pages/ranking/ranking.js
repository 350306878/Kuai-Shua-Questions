var that;
var Bmob = require('../../utils/bmob.js');
Page({

 
  data: {
    QBList: ['大学计算机期末考试题库', '计算机二级office题库', '毛概期末考试题库', '中国近代史期末考试题库', '马克思原理期末考试题库', '形式与政策'],
    choseQB: '大学计算机期末考试题库',
    id:0,
    ranking_list:[],
    loading: true,
    page_index: 0,
    has_more: true,
    listBlock:0,
    like:false
  },


   
  onLoad: function (options) {
    that=this;
    var listBlock = that.data.listBlock;
    var page_size = 20;
    var choseQB = that.data.choseQB;
    var History = Bmob.Object.extend("history");
    var queryHistory = new Bmob.Query(History);
    var currentUser = Bmob.User.current();
    var currentUserId = currentUser.id;
    queryHistory.equalTo("choseQuestionBank", choseQB);
    queryHistory.descending('score');
    queryHistory.skip(that.data.page_index * page_size);
    queryHistory.limit(page_size);
    queryHistory.find({
      success: function (results) {
        var resultList = that.data.ranking_list;
        // for (var i = 0; i < resultList.length - 1; i++) {
        //   for (var j = 0; j < resultList.length - 1 - i; j++) {
        //     if (resultList[j].attributes.score < resultList[j + 1].attributes.score) {
        //       var tmp = resultList[j];
        //       resultList[j] = resultList[j + 1];
        //       resultList[j + 1] = tmp;
        //       }
        //     }
        //   }
        for (var j = listBlock * 20; j < listBlock * 20 + results.length; j++) {
          results[j].attributes.number = j + 1;
          results[j].attributes.hadLike = that.contains(results[j].attributes.likeList, currentUserId)
    
        }
        listBlock++;
        that.setData({
          ranking_list: resultList.concat(results),
          loading: false,
          listBlock: listBlock
        })
        if (results.length < page_size) {
          that.setData({
            has_more: false
          });
        }
        console.log(that.data.ranking_list)
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
  },

  loadRanking:function(){
    var page_size = 20;
    var listBlock = that.data.listBlock;
    var choseQB = that.data.choseQB;
    var History = Bmob.Object.extend("history");
    var queryHistory = new Bmob.Query(History);
    var currentUser = Bmob.User.current();
    var currentUserId = currentUser.id; 
    queryHistory.equalTo("choseQuestionBank", choseQB);
    queryHistory.descending('score');
    queryHistory.skip(that.data.page_index * page_size);
    queryHistory.limit(page_size);
    queryHistory.find({
      success: function (results) {
        console.log(results)
        var resultList = that.data.ranking_list;
        // for (var i = 0; i < resultList.length - 1; i++) {
        //   for (var j = 0; j < resultList.length - 1 - i; j++) {
        //     if (resultList[j].attributes.score < resultList[j + 1].attributes.score) {
        //       var tmp = resultList[j];
        //       resultList[j] = resultList[j + 1];
        //       resultList[j + 1] = tmp;
        //     }
        //   }
        // }
        for (var j = listBlock * 20,i=0; j < listBlock * 20 + results.length; j++,i++) {
          results[i].attributes.number = j + 1;
          results[i].attributes.hadLike = that.contains(results[i].attributes.likeList, currentUserId)
        }
        listBlock++;
        that.setData({
          ranking_list: resultList.concat(results),
          loading:false,
          listBlock: listBlock
        })
        if (results.length < page_size) {
          that.setData({
            has_more: false
          });
        }
        console.log(that.data.ranking_list)
        console.log(that.data.listBlock)
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
  },

  // clickItem:function(e){
  //   var index = e.currentTarget.dataset.index;
  //   console.log(index)
  //   var objectId = that.data.ranking_list[index].id;
  //   that.like(objectId);
  // },

  like: function (e){
    var index = e.currentTarget.dataset.index;
    var objectId = that.data.ranking_list[index].id;
    var currentUser = Bmob.User.current();
    var currentUserId = currentUser.id;
    var History = Bmob.Object.extend("history");
    var queryHistory = new Bmob.Query(History);
    queryHistory.get(objectId, {
      success: function (result) {
        var likeList = result.attributes.likeList;
        var hadLike = that.contains(likeList, currentUserId)
        if (hadLike){
          return
        }
        else{
          likeList.push(currentUserId)
          var likeNumber = likeList.length;
          result.set('likeList', likeList);
          result.set('likeNumber', likeNumber);
          result.save();
          var addLikeNumber = that.data.ranking_list;
          addLikeNumber[index].attributes.likeNumber++;
          addLikeNumber[index].attributes.hadLike=true;
          that.setData({
            ranking_list: addLikeNumber
          });
        }
      },
      error: function (object, error) {

      }
    });
  },

  

  choseQB: function (e) {
    var index = e.currentTarget.dataset.index;  //获取自定义的ID值  
    that.setData({
      id: index,
      choseQB: that.data.QBList[index],
      loading: true,
      listBlock:0,
      ranking_list:[],
      page_index: 0,
      has_more: true
    })
    that.loadRanking();
  },

  onReachBottom: function () {
    if (!that.data.has_more) {
      return;
    }
    var page_index = that.data.page_index;
    that.setData({
      page_index: ++page_index
    });
    that.loadRanking();
  },

  
  contains:function(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) {
        return true;
      }
    }
    return false;
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