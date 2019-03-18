const T = {
  LINE: "line",
  COLUMN: "column",
  STACKEDCOLUMN: "stackedbar",
  BAR: "bar",
  STACKEDBAR: "stackedbar",
  Pie: "pie",
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
          ["Matcha Latte", 43.3, 85.8, 93.7],
          ["Milk Tea", 83.1, 73.4, 55.1],
          ["Cheese Cocoa", 86.4, 65.2, 82.5],
          ["Walnut Brownie", 72.4, 53.9, 39.1]
        ]
      },
      xAxis: { type: "category" },
      yAxis: {},
      series: [{ type: "line" }, { type: "line" }, { type: "line" }]
    }
  },
  {
    type: T.COLUMN,
    name: "柱形图",
    icon: "icon-fsux_zhuzhuangtu1",
    option: {
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ["product", "2015", "2016", "2017"],
          ["Matcha Latte", 43.3, 85.8, 93.7],
          ["Milk Tea", 83.1, 73.4, 55.1],
          ["Cheese Cocoa", 86.4, 65.2, 82.5],
          ["Walnut Brownie", 72.4, 53.9, 39.1]
        ]
      },
      xAxis: { type: "category" },
      yAxis: {},
      series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }]
    }
  }
];

export default charts;
export { T };
