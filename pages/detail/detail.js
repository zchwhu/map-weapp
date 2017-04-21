// pages/detail/detail.js
var app = getApp();
Page({
  data: {
    location:{}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var locaId = options.id;
    var baseUrl = app.globalData.baseUrl;
    var that = this;
    wx.request({
      url: baseUrl+'HerPinkMap/Anon/locaDetail?locaId='+locaId,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res.data);
        var locaData = res.data;
        that.processLocaData(locaData);
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  processLocaData: function(data){
    var locationInfo = {};
    var baseUrl = app.globalData.baseUrl+'HerPinkMap';
    locationInfo.imgSrc = baseUrl+data.locaPic;
    locationInfo.name = data.locaName;
    locationInfo.position = data.locaAddress;
    locationInfo.phonenum = data.locaPhone;
    locationInfo.introduction = data.locaDes;
    locationInfo.latitude = data.locaLatitude;
    locationInfo.longitude = data.locaLongitude;
    this.setData({
      location: locationInfo
    })
  },

  //图片预览
  previewImg: function (e) {
    var imgSrc = e.currentTarget.dataset.src;
    wx.previewImage({
      current: imgSrc, // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: [imgSrc],
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  //拨打电话
  callTel: function (event) {
    var phonenum = event.currentTarget.dataset.phonenum;
    wx.makePhoneCall({
      phoneNumber: phonenum 
    })
  },

  //打开内置地图导航
  showPos: function(event){
    var locaLati = event.currentTarget.dataset.lati;
    console.log(locaLati);
    var locaLong = event.currentTarget.dataset.long;
    wx.openLocation({
      latitude: locaLati,
      longitude: locaLong,
      scale: 28
    })
  }
})