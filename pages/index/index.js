//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    currentIndex: 0,//类别索引值
    markers: [{
      iconPath: "/images/movie.png",
      id: 0,
      latitude: 30.541093,
      longitude: 114.360734,
      width: 20,
      height: 20
    },{
      iconPath: "/images/movie.png",
      id: 2,
      latitude: 30.5215084396,
      longitude: 114.354399389,
      width: 20,
      height: 20
    },{
      iconPath: "/images/movie.png",
      id: 3,
      latitude: 30.529348,
      longitude: 114.358991,
      width: 20,
      height: 20
    },{
      iconPath: "/images/movie.png",
      id: 4,
      latitude: 30.530568,
      longitude: 114.359168,
      width: 20,
      height: 20
    },{
      iconPath: "/images/movie.png",
      id: 5,
      latitude: 30.530601,
      longitude: 114.360450,
      width: 20,
      height: 20
    }],
    ktv: 
      [{
      iconPath: "/images/ktv.png",
      id: 0,
      latitude: 30.541093,
      longitude: 114.360734,
      width: 20,
      height: 20
    },{
      iconPath: "/images/ktv.png",
      id: 2,
      latitude: 30.5215084396,
      longitude: 114.354399389,
      width: 20,
      height: 20
    },{
      iconPath: "/images/ktv.png",
      id: 3,
      latitude: 30.529348,
      longitude: 114.358991,
      width: 20,
      height: 20
    },{
      iconPath: "/images/ktv.png",
      id: 4,
      latitude: 30.530568,
      longitude: 114.359168,
      width: 20,
      height: 20
    },{
      iconPath: "/images/ktv.png",
      id: 5,
      latitude: 30.530601,
      longitude: 114.360450,
      width: 20,
      height: 20
    }]
  },
  markertap(e) {
    // console.log(e.latitude);
    // wx.openLocation({
    //   latitude: 53.324520, // 纬度，范围为-90~90，负数表示南纬
    //   longitude: 23.21229, // 经度，范围为-180~180，负数表示西经
    //   scale: 14, // 缩放比例
    //   // name: 'name', // 位置名
    //   // address: 'address', // 地址的详细说明
    //   success: function(res){
    //     // success
    //   },
    //   fail: function() {
    //     // fail
    //   },
    //   complete: function() {
    //     // complete
    //   }
    // })
    wx.navigateTo({
      url: '../detail/detail',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  controltap(e) {
    console.log(e.markerLatitude);
  },

  //切换类别
  switchCategory: function(event){
    var that = this;
    var index = event.currentTarget.dataset.index;
    this.setData({
      currentIndex: index,
      markers: that.data.ktv 
    });
  }
})
