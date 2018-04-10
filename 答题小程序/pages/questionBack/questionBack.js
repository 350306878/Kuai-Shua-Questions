
var Bmob = require('../../utils/bmob.js');
var that;
Page({
    data: {
        image_width: getApp().screenWidth / 4 - 10,
        loading: false,
        images: [],
        urlArr: [],
        reasonList: ["出现Bug", "使用不便", "增加功能", "题目错误", "其它问题"],
        id: null,
        choseReason: ''
    },

    onLoad: function () {
        that = this;
    },

    bindSubmit: function (e) {
        // 判断是否正在上传图片
        // if (that.data.loading) {
        // 	return;
        // }
        var reason = that.data.choseReason;
        var content = e.detail.value.content;
        if (!reason) {
            wx.showToast({
                title: '请选择反馈原因',
                icon: 'loading',
                duration: 2000
            });
        }
        else if (!content) {
            wx.showToast({
                title: '请填写具体说明',
                icon: 'loading',
                duration: 2000
            });
        }
        else {
            //创建类和实例
            var Feedback = Bmob.Object.extend("feedBack");
            var feedback = new Feedback();
            feedback.set("content", content);
            feedback.set("reason", reason);
            feedback.set("images", that.data.urlArr);
            feedback.set("user", Bmob.User.current());
            //添加数据，第一个入口参数是null
            feedback.save(null, {
                success: function (result) {
                    // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
                    // console.log("日记创建成功, objectId:"+result.id);

                    wx.showModal({
                        title: '反馈成功',
                        content: '已经收到您的反馈，近期会及时回复您，请您注意查看，谢谢您让我们变得更好。',
                        showCancel: false,
                        confirmText: '我知道啦',
                        confirmColor: '#1bd0bd',
                        success: function (res) {
                            if (res.confirm) {
                                wx.navigateBack();
                            }
                        }
                    })
                },
                error: function (result, error) {
                    // 添加失败
                    console.log('提交失败');

                }
            });
        }
    },

    choseReason: function (e) {
        var index = e.currentTarget.dataset.index;  //获取自定义的ID值  
        this.setData({
            id: index,
            choseReason: that.data.reasonList[index]
        });
        console.log(that.data.id);
    },

    upImg: function () {
        var that = this;
        wx.chooseImage({
            count: 9, // 默认9
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                wx.showNavigationBarLoading();
                that.setData({
                    loading: false
                });
                var urlArr = that.data.urlArr;
                var tempFilePaths = res.tempFilePaths;
                var images = that.data.images;
                that.setData({
                    images: images.concat(tempFilePaths)
                });
                var imgLength = tempFilePaths.length;
                if (imgLength > 0) {
                    var newDate = new Date();
                    var newDateStr = newDate.toLocaleDateString();
                    var j = 0;
                    //如果想顺序变更，可以for (var i = imgLength; i > 0; i--)
                    for (var i = 0; i < imgLength; i++) {
                        var tempFilePath = [tempFilePaths[i]];
                        var extension = /\.([^.]*)$/.exec(tempFilePath[0]);
                        if (extension) {
                            extension = extension[1].toLowerCase();
                        }
                        var name = newDateStr + "." + extension; //上传的图片的别名      
                        var file = new Bmob.File(name, tempFilePath);
                        file.save().then(function(res) {
                                wx.hideNavigationBarLoading()
                                var url = res.url();
                                console.log("第" + i + "张Url" + url);
                                urlArr.push({ url });
                                j++;
                                console.log(j, imgLength);
                                that.setData({
                                    urlArr: urlArr,
                                    loading: true
                                });
                            },
                            function(error) {
                                console.log(error);
                            });
                    }
                }
            }
        });
        console.log(that.data.urlArr);
    },


    delete: function (e) {
        // 获取本地显示的图片数组
        var index = e.currentTarget.dataset.index;
        var images = that.data.images;
        var urlArr = that.data.urlArr;
        urlArr.splice(index, 1);
        images.splice(index, 1);
        that.setData({
            images: images,
            urlArr: urlArr
        });
        console.log(that.data.urlArr)
    }
})