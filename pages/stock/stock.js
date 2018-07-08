var wxCharts = require('wxchart.js');

Page({
  data: {},

  onLoad: function (options) {
    wx.request({
      url: 'http://192.168.0.100:9999/',
      success: function (res) {
        console.log("https ------")
        console.log(res)
      }

    })
    //建立连接
    wx.connectSocket({
      url: "ws://192.168.0.100:9999",
    })

    //连接成功
    wx.onSocketOpen(function () {
      console.log("连接成功 发送数据---")
      wx.sendSocketMessage({
        data: 'stock',
      })
    })

    //接收数据
    wx.onSocketMessage(function (data) {
      console.log("接收数据-----------")
      var objData = JSON.parse(data.data)
      console.log(data)
      new wxCharts({
        canvasId: 'lineCanvas',//指定canvas的id
        animation: false,
        type: 'line',//类型是线形图
        categories: ['2012', '2013', '2014', '2015', '2016', '2017'],

        series: [{
          name: '交易量',
          data: objData,//websocket接收到的数据
          format: function (val) {
            if (typeof val == "string") {
              val = parseFloat(val);
            }
            return val.toFixed(2) + '万元';
          }
        },
        ],
        yAxis: {
          title: '交易金额 (万元)',
          format: function (val) {
            return val.toFixed(2);
          },
          min: 0
        },
        width: 320,
        height: 200
      });


      setTimeout(function () { wx.sendSocketMessage({ data: 'stock' }) }, 2000)


    })

    //连接失败
    wx.onSocketError(function () {
      console.log('websocket连接失败！');
    })
  },
  onReady: function () {
    // 页面渲染完成
    console.log("页面渲染完成")
    setTimeout(function () { wx.sendSocketMessage({ data: 'stock' }) })
  },
})