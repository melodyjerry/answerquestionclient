// pages/datum/datum.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sessionAccount:null,
    sessionRole:null,
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    datumList: [],
    title:'',
    link:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;

    wx.getStorage({
      key: 'account',
      success(res) {
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
    //获取学院
    function getDatumList() {
      wx.request({
        url: app.globalData.baseUrl + '/datum/list',
        data: {
          pageSize: 9999,
        },
        // header: {
        //     'content-type': 'application/json'
        // },
        success: function (res) {
          console.log(res.data)
          var data = res.data
          if (data.code == 200) {
            _this.setData({
              datumList: data.data
            })
          }

        }
      });
    }
    getDatumList()

  },
  datumSelect: function (item) {
    console.log(item.target.id)

  }, 
  //上传
  datumUpload: function() {
    var _this=this;
    if (!this.data.title || this.data.title.length < 2) {
      wx.showToast({
        title: '名称最少两位',
        duration: 1000
      })
      return;
    }
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: app.globalData.baseUrl + '/tool/file/add', // 仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'editorUpload',
          formData: {
            user: 'test'
          },
          success(res) {
            const data = res.data
            console.log(res.data)
            if (res.statusCode==200){
              console.log(data)
              //添加
              wx.request({
                url: app.globalData.baseUrl + '/datum/add',
                data: {
                  title: _this.data.title,
                  link: data.replace(/"/g,""),
                },
                // header: {
                //     'content-type': 'application/json'
                // },
                success: function (res) {
                  console.log(res.data)
                  var data = res.data
                  if (data.code == 200) {
                    _this.setData({
                      datumList: _this.data.datumList.concat(data.data)
                    })
                  }

                }
              });
            }
          }
        })
      }
    })

  },
  //下载
  datumDownload: function (item){
    console.log(item)
    wx.downloadFile({
      url: app.globalData.baseUrl + '/datum/load?datumId='+item, // 仅为示例，并非真实的资源
      success(res) {
        console.log(res)
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          wx.playVoice({
            filePath: res.tempFilePath
          })
        }
      }
    })
  },
  titleInput:function(e){
      this.setData({
        title: e.detail.value
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