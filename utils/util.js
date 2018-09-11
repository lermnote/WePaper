const app = getApp()
const apiUrl = app.globalData.url + '/html' //接口地址

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//获取当日年月日的数组
const todayDateArray = date => {
  let chooseDate = new Date(date)
  let today = new Date;
  let year = chooseDate.getFullYear();
  let month = chooseDate.getMonth() + 1;
  let day = chooseDate.getDate();
  return [year, month, day].map(formatNumber);
}

const urlRequest = date => {
  return new Promise((resolve, reject) => {
    let firstSection = 'node_16.htm';
    let todayArray = todayDateArray(date);
    let y_m = todayArray.slice(0, 2).join("-");
    let firstUrl = [apiUrl, y_m, todayArray[2], firstSection].join('/'); //第一版url
    let allUrl = new Array;
    wx.request({
      url: firstUrl,
      data: {},
      method: 'GET',
      success: (res) => {
        let html = res.data;
        let allUrlReg = /<a[^>]+pageLink[^>]+href=([^>]*)[^>]*>([\s\S]*?)<\/a>/gi; //查询所有版面链接
        let urlReg = /<a[^>]+pageLink[^>]+href=([^>]*)[^>]*>([\s\S]*?)<\/a>/i; //查询当前链接内容
        let allUrlMatch = html.match(allUrlReg); //匹配当前连接
        for (let item of allUrlMatch) {
          let urlMatch = item.match(urlReg);
          let url = [apiUrl, y_m, todayArray[2], urlMatch[1].replace('./', '')].join('/');
          let title = urlMatch[2]
          allUrl.push({
            'title': title,
            'url': url
          });
        }
        resolve(allUrl);
      }
    })
  })
}
module.exports = {
  formatTime: formatTime,
  urlRequest: urlRequest,
  todayDateArray: todayDateArray,
}