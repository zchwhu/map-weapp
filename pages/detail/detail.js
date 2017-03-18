// pages/detail/detail.js
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
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
  callTel: function (e) {
    wx.makePhoneCall({
      phoneNumber: '1340000' 
    })
  },

  showPos: function(e){
    wx.openLocation({
      latitude: 30.529348,
      longitude: 114.358991,
      scale: 28
    })
  }
})