//app.js
App({
    globalData: {
        baseUrl: 'https://www.herpink.cn/HerPinkMap',
        typeSuffix: '/Anon/getCates',
        locationSuffix: '/Anon/getLocas?cateId=',
        detailSuffix: '/Anon/locaDetail?locaId='
    },
    iconMap: {
        "亲子": '/images/qinzi.png',
        "潮装": '/images/chaozhuang.png',
        "家居": '/images/jiaju.png',
        "健康": '/images/jiankang.png',
        "美丽顾问": '/images/meiliguwen.png',
        "美妆": '/images/meizhuang.png'
    }
})