// pages/problem/problem.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sessionRole:null,
    problemList:[],
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    title:'',
    content: '',
    studentCourseId:null,
    getProblemList:null,
  },
  titleInput: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  contentInput: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'role',
      success(res) {
        console.log(res.data)
        _this.setData({
          sessionRole: JSON.parse(res.data)
        })

      },
      fail(res) {

      }
    })  
    var _this=this;
    console.log(options)
    var studentCourseId = null;
    _this.setData({
      studentCourseId: studentCourseId
    })
    var data={}
    if (studentCourseId){
      studentCourseId = options.studentCourseId
      _this.setData({
        studentCourseId: studentCourseId
      })
      data={
        studentCourseId: studentCourseId,
        }
    }
    console.log(studentCourseId)
    this.getProblemList=function(){
      wx.request({
        url: app.globalData.baseUrl + '/problem/list',
        data: data,
        // header: {
        //     'content-type': 'application/json'
        // },
        success: function (res) {
          console.log(res.data)
          var data = res.data
          if (data.code == 200) {
            _this.setData({
              problemList: data.data
            })
          } else {

          }


        }
      });
    }
    this.getProblemList();
  },
  problemSubmit: function () {
    var _this=this;
    console.log(this)

    if (!this.data.title || this.data.title.length < 2) {
      wx.showLoading({
        title: '标题缺少',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
      return;
    }
    if (!this.data.content || this.data.content.length < 2) {
      wx.showLoading({
        title: '内容缺少',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
      return;
    }

    wx.request({
      url: app.globalData.baseUrl + '/problem/add',
      data: {
        title: this.data.title,
        content: this.data.content,
        studentCourseId: this.data.studentCourseId,
      },
      // header: {
      //     'content-type': 'application/json'
      // },
      success: function (res) {
        console.log(res.data)
        var data = res.data
        if (data.code == 200) {
          //添加成功
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
          _this.setData({
            title:'',
            content: '',
            problemList: _this.data.problemList.concat(data.data)
          })
        } else {
          wx.showLoading({
            title: '添加失败',
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)

        }


      }
    });
  },
  problemSelect: function (item){
    console.log(item)
    wx.navigateTo({
      url: '../answer/answer?problemId=' + item.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})