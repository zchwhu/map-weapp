// pages/welcome/welcome.js
Page({
  enter: function(event){
    wx.navigateTo({
      url: '../index/index',
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
  }
})