//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    defaultLongitude: 114.31, //默认的武汉市经度
    defaultLatitude: 30.52, //默认的武汉市纬度
    currentIndex: 1, //类别索引值
    types: [], //类别数据
    markers: [], //标记数据
    controls: [] //地图控件
  },

  onLoad: function (event) {
    var that = this;
    //获取地图上下文环境，供之后移动到当前位置使用
    this.mapCtx = wx.createMapContext('herpinkMap');

    //页面载入时，获取用户当前位置，如果成功，则将地图的中心设置为用户当前位置，如果失败，则提示用户打开定位
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        // success
        var latitude = res.latitude;
        var longitude = res.longitude;
        that.setData({
          defaultLongitude: longitude,
          defaultLatitude: latitude
        })
      },
      fail: function () {
        // fail
        wx.showModal({
          title: 'Herpink提示您',
          content: '您未开启手机定位服务，可能会影响您部分功能的正常使用',
          confirmColor: '#f69'
        })
      },
      complete: function () {
        // complete
      }
    })

    //获取系统信息,用于地图控件定位
    wx.getSystemInfo({
      success: function (res) {
        // success
        var windowWidth = res.windowWidth;
        var windowHeight = res.windowHeight;
        that.setData({
          controls: [{
            id: 1,
            iconPath: '../../images/women.png',
            position: {
              left: 10,
              top: windowHeight - 110,
              width: 50,
              height: 50
            },
            clickable: true
          }]
        })
      }
    })
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    // 请求类别数据
    wx.request({
      url: app.globalData.baseUrl + app.globalData.typeSuffix,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        wx.hideLoading();
        var type = res.data[0]; //数组的第一个元素是类别
        var firstTypePos = res.data[1]; //数组的第二个元素是第一个类别下的地点信息
        that.processTypeData(type);
        that.getDefaultMarkers(firstTypePos);
      },
      fail: function () {
        // fail
      },
      complete: function (res) {
        // complete
        
      }
    })
  },

  // 处理类型数据
  processTypeData: function (data) {
    var types = [];
    for (var key in data) {
      var temp = {};
      temp.id = key;
      temp.name = data[key][0];

      var subUrl = 'HerPinkMap' + data[key][1];
      temp.icon = app.globalData.baseUrl + subUrl;
      types.push(temp);
    }
    this.setData({
      types: types,
      currentIndex: types[0].id
    })
  },

  //首次加载时获取默认的第一个类别的标记
  getDefaultMarkers: function (data) {
    var that = this;
    var firstPos = [];
    var iconPath = app.iconMap[that.data.types[0].name] || '/images/location.png';
    for (var key in data) {
      var temp = {
        width: 40,
        height: 40,
        iconPath: iconPath
      };
      temp.id = key;
      temp.latitude = data[key][0];
      temp.longitude = data[key][1];
      temp.callout = {
        content: data[key][2],
        display: 'ALWAYS',
        fontSize: 14,
        borderRadius: 4,
        bgColor: '#f69',
        padding: 5,
        color: '#fff'
      }
      firstPos.push(temp);
    }
    this.setData({
      markers: firstPos
    })
  },

  processCategoryData: function (data,typeName) {
    var that = this;
    var categoryData = data[0];
    var positionData = data[1];
    var positions = [];
    for (var key in positionData) {
      var temp = {
        width: 40,
        height: 40
      };
      temp.id = key;
      temp.latitude = positionData[key][0];
      temp.longitude = positionData[key][1];
      temp.iconPath = app.iconMap[typeName] || '/images/location.png';
      temp.callout = {
        content: positionData[key][2],
        display: 'ALWAYS',
        fontSize: 14,
        borderRadius: 4,
        bgColor: '#f69',
        padding: 5,
        color: '#fff'
      }
      positions.push(temp);
    }
    that.data.markers.length = 0;
    that.setData({
      markers: positions
    })
  },

  markertap(e) {
    var posId = e.markerId;
    wx.navigateTo({
      url: '../detail/detail?id=' + posId,
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

  callouttap(e) {
    this.markertap(e);
  },

  controltap(e) {
    var that = this;
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        that.mapCtx.moveToLocation();
      },
      fail: function () {
        wx.showModal({
          title: 'Herpink提示您',
          content: '无法获取您的当前位置，请检查是否开启了定位服务',
          cancelText: '',
          confirmColor: '#f69'
        })
      },
      complete: function () {
        // complete
      }
    })
  },

  //切换类别
  switchCategory: function (event) {
    var that = this;
    var typeid = event.currentTarget.dataset.typeid;
    var index = event.currentTarget.dataset.index;
    var typeName = event.currentTarget.dataset.typename;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: 'https://www.herpink.cn/HerPinkMap/Anon/getLocas?cateId=' + typeid,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        var data = res.data;
        that.processCategoryData(data,typeName);
        wx.hideLoading();
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
    this.setData({
      currentIndex: typeid
    });
  }
})
