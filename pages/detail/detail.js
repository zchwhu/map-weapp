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
    locationInfo.name = data['名称'];
    locationInfo.position = data['地址'];
    locationInfo.phonenum = data['电话'];
    locationInfo.introduction = data['描述'];
    locationInfo.latitude = data['纬度'];
    locationInfo.longitude = data['经度'];
    this.setData({
      location: locationInfo
    })
  },
  previewImg: function (e) {
    wx.previewImage({
      current: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1489831567103&di=d7e642d220caf424b80ea47a6ef0b65d&imgtype=0&src=http%3A%2F%2Fimg6.ph.126.net%2FOqLHvkuVpoF6m0nYqWPhqQ%3D%3D%2F2527082340925283346.jpg', // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1489831567103&di=d7e642d220caf424b80ea47a6ef0b65d&imgtype=0&src=http%3A%2F%2Fimg6.ph.126.net%2FOqLHvkuVpoF6m0nYqWPhqQ%3D%3D%2F2527082340925283346.jpg'],
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
  callTel: function (event) {
    var phonenum = event.currentTarget.dataset.phonenum;
    wx.makePhoneCall({
      phoneNumber: phonenum 
    })
  },

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