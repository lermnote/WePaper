// pages/post/post.js
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
var todayDateArray = require('../../utils/util.js').todayDateArray;
Page({
  data: {},
  onLoad: function (options) {
    let that = this;
    wx.showLoading({
      title: "载入中",
      success: function () { }
    });
    console.log(options)
    let todayArray = todayDateArray(options.date);
    that.setData({
      title: options.title,
      date: todayArray.join('-')
    });
    wx.request({
      url: options.url,
      data: {},
      method: 'GET',
      success: function (res) {
        let html = res.data;
        let postReg = /<founder-content>([\s\S]*?)<\/founder-content>/i; //post content
        let postMatch = html.match(postReg);
        WxParse.wxParse('article', 'html', postMatch[1], that, 5);
        let imgReg = /<img\s+src="([^"]*)brief\.jpg">/gi; //post image 
        let imgMatch = html.match(imgReg);
        let subStr = /..\/..\/../i;
        let imgArray = new Array;
        if (imgMatch) {
          for (let i = 0; i < imgMatch.length; i++) {
            let result = imgMatch[i].replace(subStr, app.globalData.url);
            imgArray.push(result);
            WxParse.wxParse('image' + i, 'html', result, that, 5)
            if (i === imgMatch.length - 1) {
              WxParse.wxParseTemArray("imgArray", 'image', imgMatch.length, that)
            }
          }
        }
      }
    })
  },
  onReady: function () {
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
  }
})