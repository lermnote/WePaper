// components/calender/calender.js
Component({
  data: {
    showModal: true,
    week: ["日", "一", "二", "三", "四", "五", "六"],
    dayCount: [],
  },
  created: function () { },
  attached: function () {
    let that = this
    let date = new Date()
    that.setData({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    });

    let dayTotal = new Date(that.data.year, that.data.month, 0).getDate();//每月天数
    let dayCount = [];
    let Index = 0;
    let dayN = 1;
    for (let i = 0; i < dayTotal; i++) {
      dayCount.push(dayN++);
    }
    that.setData({
      dayCount: dayCount,
    })
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth() + 1;
    let currentDay = date.getDate();
    let index = 0
    if (that.data.year == currentYear) {
      if (that.data.month == currentMonth) {
        index = dayCount.indexOf(currentDay);
      }
    }

    that.setData({
      weekday: new Date(that.data.year + "/" + that.data.month + that.data.day).getDay(),
      monthFirstDay: new Date(that.data.year + "/" + that.data.month + "/1").getDay(),//每月1日
      dayList: dayCount,//日期列表
      tapThis: index,//点击索引
      chooseDate: that.data.year + "/" + that.data.month + "/" + that.data.day,
      showDate: that.data.year + " 年 " + that.data.month + " 月 " + that.data.day + " 日",
    })
    let weekend = that.data.monthFirstDay + dayTotal
    console.log(weekend)
  },
  methods: {
    //获取下一个月份
    add: function () {
      let that = this
      that.triggerEvent("addone")
      that.setData({
        dayCount: []
      })
      if (that.data.month == 12) {
        that.setData({
          month: 1,
          year: that.data.year + 1
        })
      } else {
        that.setData({
          month: that.data.month + 1
        })
      }
      let dayTotal = new Date(that.data.year, that.data.month, 0).getDate();//每月天数

      let dayCount = [];
      let index = 0;
      let dayN = 1;
      for (let i = 0; i < dayTotal; i++) {
        dayCount.push(dayN++);
      }
      that.setData({
        tapThis: null,
        weekday: new Date(that.data.year + "/" + that.data.month + that.data.day).getDay(),
        monthFirstDay: new Date(that.data.year + "/" + that.data.month + "/1").getDay(),//每月1日
        dayCount: dayCount,
        showDate: that.data.year + " 年 " + that.data.month + " 月 ",
      })
    },
    //获取上一个月份
    reduce: function () {
      let that = this
      that.triggerEvent("reduceone")
      that.setData({
        dayCount: []
      })
      if (that.data.month == 1) {
        that.setData({
          month: 12,
          year: that.data.year - 1
        })
      } else {
        that.setData({
          month: that.data.month - 1
        })
      }
      let dayTotal = new Date(that.data.year, that.data.month, 0).getDate();//每月天数
      let dayCount = [];
      let index = 0;
      let dayN = 1;
      for (let i = 0; i < dayTotal; i++) {
        dayCount.push(dayN++);
      }
      that.setData({
        tapThis: null,
        weekday: new Date(that.data.year + "/" + that.data.month + that.data.day).getDay(),
        monthFirstDay: new Date(that.data.year + "/" + that.data.month + "/1").getDay(),//每月1日
        dayCount: dayCount,
        showDate: that.data.year + " 年 " + that.data.month + " 月 ",
      })

    },
    preventTouchMove: function () { },// 弹出框蒙层截断touchmove事件 

    chooseDate: function (e) {
      var that = this;
      var index = e.currentTarget.dataset.index;
      var val = e.currentTarget.dataset.value;
        that.setData({
          day:val,
          showModal: true,
          tapThis: index,
          chooseDate: that.data.year + "/" + that.data.month + "/" + val,
          showDate: that.data.year + " 年 " + that.data.month + " 月 " + val + " 日",

        })
      this.triggerEvent('onchangedate', that.data.chooseDate)
    },
    /** 
 * 隐藏模态对话框 
 */
    hideModal: function () {
      var that = this;
      that.setData({
        showModal: true,
      })
    },
    showModalBtn: function () {
      var that = this;
      that.setData({
        showModal: false
      })
    },
  }
})
