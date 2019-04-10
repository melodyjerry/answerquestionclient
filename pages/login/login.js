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
  adminNameInput: function (e){
    this.setData({
      adminName: e.detail.value
    })
  },
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  loginSubmit:function(){
    console.log(this)

    if (!this.data.adminName||this.data.adminName.length<2) {
      wx.showLoading({
        title: '请检查账户',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
      return;
    }
    if (!this.data.password || this.data.password.length < 6 || this.data.password.length > 20) {
      wx.showLoading({
        title: '请检查密码',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
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
        var data = res.data
        if(data.code==200){
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
        }else{
          wx.showLoading({
            title: '账户或密码错误',
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)

        }
        

      }
    });
  }

})