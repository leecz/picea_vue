export default {
  line: {
    fixed_column: false,
    data_type: "sheet",
    orthogonal_coordinates: true,
    data_desc: "第一列为X轴标签，之后一列为一组数据，可以有多组数据"
  },
  bar: {
    fixed_column: false,
    data_type: "sheet",
    orthogonal_coordinates: true,
    data_desc:
      "柱形图第一列为X轴标签，条形图第一列为Y轴标签，之后一列为一组数据，可以有多组数据"
  },
  pie: {
    fixed_column: true,
    data_type: "sheet",
    orthogonal_coordinates: false,
    data_desc: "一行为一组数据，可以有多行数据，增加列无效"
  },
  scatter: {
    fixed_column: true,
    data_type: "sheet",
    orthogonal_coordinates: true,
    data_desc:
      "第一列为X轴数据，第二列为Y轴数据，气泡图有第三列数据，控制气泡大小"
  },
  mixed: {
    fixed_column: false,
    data_type: "sheet",
    orthogonal_coordinates: true,
    data_desc: "第一列为X轴标签，之后一列为一组数据，可以有多组数据"
  },
  sankey: {
    fixed_column: false,
    multi_series: false,
    orthogonal_coordinates: false,
    data_type: "json",
    data_desc: "根据json结构填写数据"
  },
  graph: {
    fixed_column: false,
    multi_series: false,
    orthogonal_coordinates: false,
    data_type: "json",
    data_desc: "根据json结构填写数据"
  },
  radar: {
    fixed_column: true,
    multi_series: false,
    orthogonal_coordinates: false,
    data_type: "json",
    data_desc: "根据json结构填写数据"
  },
  liquidFill: {
    fixed_column: false,
    orthogonal_coordinates: false,
    data_type: "json",
    data_desc: "根据json结构填写数据"
  }
};
