// pages/paper/paper.js
var app = getApp();
var todayDateArray = require('../../utils/util.js').todayDateArray
const urlRequest = require('../../utils/util.js').urlRequest
const apiUrl = app.globalData.url + '/html' //接口地址
Page({
  data: {
    showData: [],
    chooseDate: new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getDate()
  },
  postlink: function (e) {
    let that = this
    let allPostLink = new Array;
    that.setData({
      pageInfo: e
    });
    let todayArray = todayDateArray(that.data.chooseDate);
    let y_m = todayArray.slice(0, 2).join("-");
    let allReg = /<a\s+href=[^>]*>[^>]*>[^>]*<\/div><\/a>/gi; //正则表达式-匹配a标签
    let aHrefReg = /<a\s+href=([^>]*)>[^>]*>([^>]*)<\/div><\/a>/i; //正则表达式-匹配标题
    for (let item of e) {

      wx.request({
        url: item.url,
        data: {},
        method: 'GET',
        success: function (res) {
          let html = res.data;
          let postLink = new Array;
          let aHrefMatch = html.match(allReg);
          for (let value of aHrefMatch) {
            let aHrefRegMatch = value.match(aHrefReg);
            let title = aHrefRegMatch[2];
            let url = [apiUrl, y_m, todayArray[2], aHrefRegMatch[1]].join('/');
            postLink.push({
              'title': title,
              'url': url
            });
          }
          allPostLink.push(postLink);
          that.setData({
            showData: allPostLink,
          })
        }
      })
    }
  },
  chooseDate: function (e) {
    let that = this;
    let calendar = e.detail
    that.setData({
      chooseDate: calendar,
    })
    that.onLoad()
  },
  onLoad: function () {
    let that = this;
    wx.showLoading({
      title: "载入中",
      success: function () { }
    })
    urlRequest(that.data.chooseDate)
      .then(that.postlink)
      .then(
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
      )
  }
})