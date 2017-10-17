// pages/detail/detail.js
var app = getApp();
Page({
  data: {
    location:{} // 存储地点信息
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var locaId = options.id;
    var baseUrl = app.globalData.baseUrl;
    var detailSuffix = app.globalData.detailSuffix;
    var that = this;

    // 请求地点信息
    wx.request({
      url: baseUrl + detailSuffix + locaId,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        var locaData = res.data;
        console.log(locaData);
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

  //处理地点信息
  processLocaData: function(data){
    var locationInfo = {};
    var baseUrl = app.globalData.baseUrl;
    var stars = []; //存储地点推荐星数

    // 如果地点不含有图片，则将链接设为空
    if(data.locaPic!==null){
      locationInfo.imgSrc = baseUrl+data.locaPic; //地点图片链接
    }else{
      locationInfo.imgSrc = '';
    }
    locationInfo.name = data.locaName; //地点名称
    locationInfo.position = data.locaAddress; // 地点位置
    locationInfo.phonenum = data.locaPhone; // 地点地理位置
    locationInfo.introduction = data.locaDes; // 地点介绍
    locationInfo.latitude = data.locaLatitude; // 地点经度
    locationInfo.longitude = data.locaLongitude; // 地点纬度

    // 注意这里的的评分是一个字符串，需要先转化为数字
    // 如果不能转化为数字，则不进行处理
    var score = parseInt(data.locaScore);
    if(!isNaN(score)){
      var i = 0;
      while(i<5){
        if(i<score){
          stars.push(1);
          }else{
          stars.push(0);
          }
          i++;
        }  
      }
      locationInfo.stars = stars; // 地点星级
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
    //注意这里的经纬度信息，需要转化为数值
    var locaLati = parseFloat(event.currentTarget.dataset.lati);
    var locaLong = parseFloat(event.currentTarget.dataset.long);
    var name = event.currentTarget.dataset.name;
    wx.openLocation({
      latitude: locaLati,
      longitude: locaLong,
      name:name,
      scale: 18
    })
  }
})