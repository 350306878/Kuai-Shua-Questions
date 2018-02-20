var Bmob = require('utils/bmob.js');
Bmob.initialize("", "");
 
App({
  onLaunch: function () {

    var user = new Bmob.User();//开始注册用户

    var newOpenid = wx.getStorageSync('openid')
    if (!newOpenid) {
      wx.login({
        success: function (res) {
          user.loginWithWeapp(res.code).then(function (user) {
            var openid = user.get("authData").weapp.openid;
            console.log(user, 'user', user.id, res);

            if (user.get("nickName")) {
              // 第二次访问
              console.log(user.get("nickName"), 'res.get("nickName")');

              wx.setStorageSync('openid', openid)
            } else {
              var User = Bmob.Object.extend("_User");
              var queryUser = new Bmob.Query(User);
              queryUser.get(user.id, {
                success: function (result) {
                  result.set("register", false);
                  result.save();

                },
                error: function (result, error) {
      
                }
              });
              

              //保存用户其他信息
              wx.getUserInfo({
                success: function (result) {

                  var userInfo = result.userInfo;
                  var nickName = userInfo.nickName;
                  var userPic = userInfo.avatarUrl;
                  console.log()
                  var u = Bmob.Object.extend("_User");
                  var query = new Bmob.Query(u);
                  // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
                  query.get(user.id, {
                    success: function (result) {
                      // 自动绑定之前的账号

                      result.set('nickName', nickName);
                      result.set("userPic", userPic);
                      result.set("openid", openid);
                      result.save();

                    }
                  });

                }
              });


            }

          }, function (err) {
            console.log(err, 'errr');
          });

        }
      });
    }



  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {

          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: { 
    userInfo: null,
    singleChoiceAnswerNow:[],
    multiChoiceAnswerNow: [],
    choseQuestionBank:'',
    score:0

  }
})