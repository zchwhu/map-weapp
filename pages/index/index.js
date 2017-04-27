//index.js
//获取应用实例
var app = getApp();
Page({
    data: {
        defaultLongitude:114.31, //默认的武汉市经度
        defaultLatitude:30.52, //默认的武汉市纬度
        currentIndex: 1, //类别索引值
        types: [], //类别数据
        markers: [], //标记数据
        controls: [{
            id: 1,
            iconPath: '../../images/women.png',
            position: {
                left: 10,
                top: 450 - 50,
                width: 50,
                height: 50
            },
            clickable: true
        }]
    },

    onLoad: function(event){
        var that = this;
        //获取地图上下文环境，供之后移动到当前位置使用
        this.mapCtx = wx.createMapContext('herpinkMap');

        //页面载入时，获取用户当前位置，如果成功，则将地图的中心设置为用户当前位置，如果失败，则提示用户打开定位
        wx.getLocation({
            type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
            success: function(res){
                // success
                var latitude = res.latitude;
                var longitude = res.longitude;
                that.setData({
                    defaultLongitude: longitude,
                    defaultLatitude: latitude
                })
            },
            fail: function() {
                // fail
                wx.showModal({
                    title: 'Herpink提示您',
                    content: '您未开启手机定位服务，可能会影响您部分功能的正常使用',
                    confirmColor: '#f69'
                })
            },
            complete: function() {
                // complete
            }
        })

        // 请求类别数据
        wx.request({
            url: 'http://202.114.70.53:8082/HerPinkMap/Anon/getCates',
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res){
                // success
                var type = res.data[0]; //数组的第一个元素是类别
                var firstTypePos = res.data[1]; //数组的第二个元素是第一个类别下的地点信息
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

            var subUrl = 'HerPinkMap'+data[key][1];
            temp.icon = app.globalData.baseUrl + subUrl;
            types.push(temp);
        }
        this.setData({
            types: types,
            currentIndex:types[0].id
        })
    },

    //首次加载时获取默认的第一个类别的标记
    getDefaultMarkers: function(data){
        var firstPos = [];
        var iconPath = '../../images/location.png';
        for(var key in data){
            var temp = {
                width: 40,
                height: 40,
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
        for(var key in positionData){
            var temp = {
                width: 25,
                height: 25
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
        var that = this;
        wx.getLocation({
            type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
            success: function(res){
                that.mapCtx.moveToLocation();
            },
            fail: function() {
                wx.showModal({
                    title: 'Herpink提示您',
                    content: '无法获取您的当前位置，请检查是否开启了定位服务',
                    cancelText: '',
                    confirmColor: '#f69'
                })
            },
            complete: function() {
                // complete
            }
        })
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
