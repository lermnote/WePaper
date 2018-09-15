// pages/paper/paper.js
const app = getApp();
import { urlRequest } from '../../utils/util.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    vertical: false,
    interval: 3000,
    duration: 500,
    windowWidth: 0,
    windowHeight: 0,
    allPaper: [], //报纸信息
    chooseDate: new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getDate()
  },
  paperPage: function (e) {
    let that = this
    let allImgSrc = new Array;
    for (let item of e) {
      wx.request({
        url: item.url,
        data: {},
        method: 'GET',
        success: function (res) {
          let html = res.data;
          let imgReg = /<img[^>]+src=(.*)\s+border=0[^>]+USEMAP=#PagePicMap*>/i;//版面 img 正则
          let imgMatch = html.match(imgReg);
          let img = imgMatch[1].replace('../../..', app.globalData.url);
          allImgSrc.push(img)//图片 Src 数组
          // resolve(img)
          that.setData({
            allPaper: allImgSrc,
          });
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    if (app.globalData.systemInfo) {
      var systemInfo = app.globalData.systemInfo; //获取设备窗口宽高
      that.setData({
        windowWidth: systemInfo.windowWidth,
        windowHeight: systemInfo.windowHeight
      });
    } else {
      //重新请求系统信息
    }
    /**
     * 显示”载入中”，直至调用 wx.hideLoading
     */
    wx.showLoading({
      title: "载入中",
      success: function () { }
    });

    urlRequest(that.data.chooseDate)
      .then(that.paperPage, function () {
        console.log('报纸图片输出错误');
      })
      .then(
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
      )
  }
})