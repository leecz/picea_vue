export default {
  line: {
    fixed_column: false,
    data_type: "sheet",
    orthogonal_coordinates: true
  },
  bar: {
    fixed_column: false,
    data_type: "sheet",
    orthogonal_coordinates: true
  },
  pie: {
    fixed_column: true,
    data_type: "sheet",
    orthogonal_coordinates: false
  },
  scatter: {
    fixed_column: true,
    data_type: "sheet",
    orthogonal_coordinates: true
  },
  mixed: {
    fixed_column: false,
    data_type: "sheet",
    orthogonal_coordinates: true
  },
  sankey: {
    fixed_column: false,
    multi_series: false,
    orthogonal_coordinates: false,
    data_type: "json"
  },
  graph: {
    fixed_column: false,
    multi_series: false,
    orthogonal_coordinates: false,
    data_type: "json"
  },
  radar: {
    fixed_column: true,
    multi_series: false,
    orthogonal_coordinates: false,
    data_type: "json"
  },
  liquidFill: {
    fixed_column: false,
    orthogonal_coordinates: false,
    data_type: "json"
  }
};
