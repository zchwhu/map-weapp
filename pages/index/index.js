//index.js
//获取应用实例
var app = getApp();
Page({
  onLoad: function(event){
    var that = this;
    wx.request({
      url: 'http://202.114.70.53:8082/HerPinkMap/Anon/getCates',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        var type = res.data[0];
        var firstTypePos = res.data[1];
        console.log(res.data[0]);
        that.processTypeData(type);
        that.getDefaultMarkers(firstTypePos);
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  // 处理类型数据
  processTypeData: function(data){
    var types = [];
    for(var key in data){
      var temp = {};
      temp.id = key;
      temp.name = data[key][0];

      var subUrl = data[key][1].substring(data[key][1].indexOf('HerPinkMap'));
      temp.icon = app.globalData.baseUrl + subUrl;
      types.push(temp);
    }
    this.setData({
      types: types,
      currentIndex:types[0].id
    })
  },

  getDefaultMarkers: function(data){
    var firstPos = [];
    var iconPath = '../../images/movie.png'; 
    for(var key in data){
      var temp = {
        width: 25,
        height: 25,
        iconPath: iconPath
      };
      temp.id = key;
      temp.latitude = data[key][0];
      temp.longitude = data[key][1];
      firstPos.push(temp);
    }
    this.setData({
      markers: firstPos
    })
  },

  processCategoryData: function(data){
    var categoryData = data[0];
    var positionData = data[1];
    var positions = [];
    var iconPath = '../../images/ktv.png'; 
    for(var key in positionData){
      var temp = {
        width: 25,
        height: 25,
        iconPath: iconPath
      };
      temp.id = key;
      temp.latitude = positionData[key][0];
      temp.longitude = positionData[key][1];
      positions.push(temp);
    }
    console.log(positions);
    this.setData({
      markers: positions
    })
  },

  data: {
    currentIndex: 1,//类别索引值
    types: [],
    markers: []
  },
  markertap(e) {
    var posId = e.markerId;
    wx.navigateTo({
      url: '../detail/detail?id='+posId,
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
    var typeid = event.currentTarget.dataset.typeid;
    var index = event.currentTarget.dataset.index;
    wx.request({
      url: 'http://202.114.70.53:8082/HerPinkMap/Anon/getLocas?cateId='+typeid,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res);
        var data = res.data;
        that.processCategoryData(data);
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    console.log(index);
    this.setData({
      currentIndex: typeid
    });
  }
})
