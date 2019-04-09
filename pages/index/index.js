//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    sessionRole:null,
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    academyList:[],
    problemList: [],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var _this=this;
    //获取学院
     function getAcademyList() {
      wx.request({
        url: app.globalData.baseUrl + '/academy/list',
        data: {
          pageSize: 9999,
        },
        // header: {
        //     'content-type': 'application/json'
        // },
        success: function (res) {
          console.log(res.data)
          var data = res.data
          _this.setData({
            academyList: data.data
          })

        }
      });
    }

    //获取问题
    function getProblemList() {
      wx.request({
        url: app.globalData.baseUrl + '/problem/list',
        data: {
          pageSize: 9999,
        },
        // header: {
        //     'content-type': 'application/json'
        // },
        success: function (res) {
          console.log(res.data)
          var data = res.data
          _this.setData({
            problemList: data.data
          })

        }
      });
    }

    wx.getStorage({
      key: 'account',
      success(res) {
        console.log(res.data)
        getAcademyList()
        getProblemList()
      },
      fail(res){
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
  academySelect:function(item){
    console.log(item.target.id)

  },
  problemSelect: function (item) {
    console.log(item.target.id)

  }
 
})
