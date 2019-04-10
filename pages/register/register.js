// pages/register/register.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    adminName: '',
    realname:'',
    password: '',
    password2: '',
    roleId:1001
  },
  // adminNameInput: function (e) {
  //   this.setData({
  //     adminName: e.detail.value
  //   })
  // },
  realnameInput: function (e) {
    this.setData({
      realname: e.detail.value
    })
  },
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  password2Input: function (e) {
    this.setData({
      password2: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var roleName=options.roleName;
    console.log(options)
    if (roleName=='教师'){
      this.setData({
        roleId:1001
      })
    }else{
      this.setData({
        roleId: 1002
      })
    }
  },
  registerSubmit: function () {
    console.log(this)

    // if (!this.data.adminName || this.data.adminName.length < 2) {
    //   wx.showLoading({
    //     title: '请检查账户',
    //   })
    //   setTimeout(function () {
    //     wx.hideLoading()
    //   }, 2000)
    //   return;
    // }
    if (!this.data.password || this.data.password.length < 6 || this.data.password.length > 20) {
      wx.showLoading({
        title: '请检查密码',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
      return;
    }
    if (!this.data.password2 || this.data.password!=this.data.password2) {
      wx.showLoading({
        title: '请检查验证密码',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
      return;
    }

    wx.request({
      url: app.globalData.baseUrl + '/account/add',
      data: {
        //adminName: this.data.adminName,
        realname: this.data.realname,
        password: this.data.password,
        roleId:this.data.roleId
      },
      // header: {
      //     'content-type': 'application/json'
      // },
      success: function (res) {
        console.log(res.data)
        var data = res.data
        if (data.code == 200) {   
          
          //注册
          wx.showModal({
            title: '注册成功',
            content: '分配账户：'+data.data[0].sid,
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.clearStorage()
                setTimeout(function () {
                  wx.redirectTo({
                    url: '../login/login',
                    
                  })
                }, 500)
              } else if (res.cancel) {
                console.log('用户点击取消')

              }
            }
          })

        } else {
          wx.showLoading({
            title: '账户或密码错误',
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)

        }


      }
    });
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