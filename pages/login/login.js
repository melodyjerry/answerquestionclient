//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    adminName:'',
    password:'',
  },
  onLoad: function (){
  var _this=this;

  },
  adminNameLogin: function (e){
    this.setData({
      adminName: e.detail.value
    })
  },
  passwordLogin: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  loginSubmit:function(){
    console.log(this)
    if (!this.data.adminName||this.data.adminName.length<2) {
      wx.showToast({
        title: '请检查账户',
        icon: 'info',
        duration: 1000
      })
      return;
    }
    if (!this.data.password || this.data.password.length < 6 || this.data.password.length > 20) {
      wx.showToast({
        title: '请检查密码',
        icon: 'warn',
        duration: 1000
      })
      return;
    }

    wx.request({
      url: app.globalData.baseUrl+'/account/login',
      data: {
        adminName: this.data.adminName,
        password: this.data.password,
      },
      // header: {
      //     'content-type': 'application/json'
      // },
      success: function (res) {
         console.log(res.data)
        //登录
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000
        })
        wx.setStorage({
          key: 'account',
          data: JSON.stringify(data.data[0])
        })
        wx.setStorage({
          key: 'role',
          data: JSON.stringify(data.data[0].role)
        })
        setTimeout(function () {
          wx.navigateTo({
            url: '../index/index'
          })
        }, 500)

      }
    });
  }

})