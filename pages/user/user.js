// pages/user/user.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sessionAccount:null,
    sessionRole:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;
    wx.getStorage({
      key: 'account',
      success(res) {
        console.log(res.data)
        _this.setData({
          sessionAccount: JSON.parse(res.data)
        })
        
      },
      fail(res) {
        wx.navigateTo({
          url: '../login/login'
        })
      }
    })
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
  },
  //登陆退出
  loginout: function () {
    var _this = this;
    console.log(_this.data)
    wx.showModal({
      title: '登陆退出',
      content: '确认登陆退出吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: app.globalData.baseUrl + '/account/loginout',
            data: {
              accountId: _this.data.sessionAccount.accountId,
            },
            // header: {
            //     'content-type': 'application/json'
            // },
            success: function (res) {
              console.log(res.data)
              var data = res.data
              //登录
              wx.showToast({
                title: '退出成功',
                icon: 'success',
                duration: 2000
              })
              wx.clearStorage()
              setTimeout(function () {
                wx.navigateTo({
                  url: '../index/index'
                })
              }, 500)

            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')

        }
      }
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