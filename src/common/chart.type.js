const T = {
  LINE: "line",
  BAR: "bar",
  PIE: "pie",
  SCATTER: "scatter",
  BUBBLE: "bubble"
};

const charts = [
  {
    type: T.LINE,
    name: "折线图",
    icon: "icon-fsux_zhexiantu",
    option: {
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ["product", "2015", "2016", "2017"],
          ["拿铁", 43.3, 85.8, 93.7],
          ["奶茶", 83.1, 73.4, 55.1],
          ["可可", 86.4, 65.2, 82.5],
          ["六个核桃", 72.4, 53.9, 39.1]
        ]
      },
      xAxis: { type: "category" },
      yAxis: {},
      series: [{ type: "line" }, { type: "line" }, { type: "line" }]
    }
  },
  {
    type: T.LINE,
    name: "面积图",
    icon: "icon-fsux_mianji",
    option: {
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ["product", "拿铁", "奶茶", "六个核桃"],
          ["2015", 53.3, 65.8, 73.7],
          ["2016", 73.1, 73.4, 55.1],
          ["2017", 86.4, 65.2, 82.5],
          ["2018", 69.1, 63.9, 72.4]
        ]
      },
      xAxis: { type: "category" },
      yAxis: {},
      series: [
        { type: "line", areaStyle: {} },
        { type: "line", areaStyle: {} },
        { type: "line", areaStyle: {} }
      ]
    }
  },
  {
    type: T.LINE,
    name: "堆叠面积图",
    icon: "icon-fsux_duijimianjitu",
    option: {
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ["product", "拿铁", "奶茶", "六个核桃"],
          ["2015", 53.3, 65.8, 73.7],
          ["2016", 73.1, 73.4, 55.1],
          ["2017", 86.4, 65.2, 82.5],
          ["2018", 69.1, 63.9, 72.4]
        ]
      },
      xAxis: { type: "category" },
      yAxis: {},
      series: [
        { type: "line", areaStyle: {}, stack: "stack" },
        { type: "line", areaStyle: {}, stack: "stack" },
        { type: "line", areaStyle: {}, stack: "stack" }
      ]
    }
  },
  {
    type: T.BAR,
    name: "柱形图",
    icon: "icon-fsux_zhuzhuangtu1",
    option: {
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ["product", "2015", "2016", "2017"],
          ["拿铁", 43.3, 85.8, 93.7],
          ["奶茶", 83.1, 73.4, 55.1],
          ["可可", 86.4, 65.2, 82.5],
          ["六个核桃", 72.4, 53.9, 39.1]
        ]
      },
      xAxis: { type: "category" },
      yAxis: {},
      series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }]
    }
  },
  {
    type: T.BAR,
    name: "堆叠柱形图",
    icon: "icon-fsux_tubiao_duijizhuzhuangtu",
    option: {
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ["product", "2015", "2016", "2017"],
          ["拿铁", 43.3, 85.8, 93.7],
          ["奶茶", 83.1, 73.4, 55.1],
          ["可可", 86.4, 65.2, 82.5],
          ["六个核桃", 72.4, 53.9, 39.1]
        ]
      },
      xAxis: { type: "category" },
      yAxis: {},
      series: [
        { type: "bar", stack: "stack" },
        { type: "bar", stack: "stack" },
        { type: "bar", stack: "stack" }
      ]
    }
  },
  {
    type: T.BAR,
    name: "条形图",
    icon: "icon-fsux_zhuzhuangtu",
    option: {
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ["product", "2015", "2016", "2017"],
          ["拿铁", 43.3, 85.8, 93.7],
          ["奶茶", 83.1, 73.4, 55.1],
          ["可可", 86.4, 65.2, 82.5],
          ["六个核桃", 72.4, 53.9, 39.1]
        ]
      },
      yAxis: { type: "category" },
      xAxis: { type: "value" },
      series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }]
    }
  },
  {
    type: T.BAR,
    name: "堆叠柱形图",
    icon: "icon-fsux_duijizhuzhuangtu1",
    option: {
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ["product", "2015", "2016", "2017"],
          ["拿铁", 43.3, 85.8, 93.7],
          ["奶茶", 83.1, 73.4, 55.1],
          ["可可", 86.4, 65.2, 82.5],
          ["六个核桃", 72.4, 53.9, 39.1]
        ]
      },
      yAxis: { type: "category" },
      xAxis: { type: "value" },
      series: [
        { type: "bar", stack: "stack" },
        { type: "bar", stack: "stack" },
        { type: "bar", stack: "stack" }
      ]
    }
  },
  {
    type: T.PIE,
    name: "饼图",
    icon: "icon-fsux_bingtu1",
    option: {
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ["product", "2015"],
          ["拿铁", 43.3],
          ["奶茶", 83.1],
          ["可可", 86.4],
          ["六个核桃", 72.4]
        ]
      },
      series: [{ type: "pie" }]
    }
  },
  {
    type: T.PIE,
    name: "环图",
    icon: "icon-fsux_bingtu",
    option: {
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ["product", "2015"],
          ["拿铁", 43.3],
          ["奶茶", 83.1],
          ["可可", 86.4],
          ["六个核桃", 72.4]
        ]
      },
      series: [{ type: "pie", radius: ["50%", "70%"] }]
    }
  },
  {
    type: T.PIE,
    name: "玫瑰图",
    icon: "icon-fsux_nandingmeiguitu",
    option: {
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ["product", "2015"],
          ["拿铁", 43.3],
          ["奶茶", 83.1],
          ["可可", 86.4],
          ["六个核桃", 72.4]
        ]
      },
      series: [{ type: "pie", roseType: "radius" }]
    }
  },
  {
    type: T.SCATTER,
    name: "散点图",
    icon: "icon-fsux_sandiantu",
    option: {
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          [178.0, 89.6],
          [180.3, 82.8],
          [180.3, 76.4],
          [164.5, 63.2],
          [173.0, 60.9],
          [183.5, 74.8],
          [175.5, 70.0],
          [188.0, 72.4],
          [189.2, 84.1],
          [172.8, 69.1],
          [170.0, 59.5],
          [182.0, 67.2],
          [170.0, 61.3],
          [177.8, 68.6],
          [184.2, 80.1]
        ]
      },
      xAxis: {},
      yAxis: {},
      series: [{ type: "scatter" }]
    }
  },
  {
    type: T.SCATTER,
    name: "气泡图",
    icon: "icon-fsux_qipaotu",
    option: {
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          [43.3, 85.8, 93.7],
          [83.1, 73.4, 55.1],
          [86.4, 65.2, 82.5],
          [72.4, 53.9, 99]
        ]
      },
      xAxis: {},
      yAxis: {},
      visualMap: {
        show: false,
        inRange: {
          symbolSize: [10, 120]
        }
      },
      series: [{ type: "scatter" }]
    }
  }
];

export default charts;
export { T };
